from app.database.connection import SessionLocal
from app.database.models import AnalysisStatus
from app.database.models import Repositories
from app.services.ai.index_repository_service import IndexRepositoryService
from app.services.repository_scanner import RepositoryScanner
from app.services.repository_status_service import RepositoryStatusService
from app.services.workspace_service import WorkspaceService
from app.services.repository_diff_service import RepositoryDiffService
from app.services.repository_metadata_service import RepositoryMetadataService
from app.services.ai.vector_store_service import VectorStoreService
from app.services.ai.chunking_service import ChunkingSevice


class RepositorySyncService:
    def sync(self, repository_id: int):
        db = SessionLocal()
        indexer = IndexRepositoryService()
        vector_store = VectorStoreService()
        chunking = ChunkingSevice()

        # 1. Load Repo
        repository = db.query(Repositories).filter(Repositories.id == repository_id).first()

        try:
            # 2. Clone Repo
            RepositoryStatusService.update(db=db, repository=repository, status=AnalysisStatus.cloning, progress=10)

            workspace = WorkspaceService()
            clone_url = repository.clone_url.replace("{github_token}", repository.user.github_connection.access_token)
            repo_path = workspace.clone_repository(repository_id, clone_url)

            # 3. Scan Repo
            RepositoryStatusService.update(db=db, repository=repository, status=AnalysisStatus.scanning, progress=30)

            scanner = RepositoryScanner()

            scanned_files = scanner.scan(repo_path)

            diff = RepositoryDiffService().compare(
                db=db,
                repository_id=repository_id,
                scanned_files=scanned_files,
            )

            # Delete vectors for modified files
            for file in diff.modified_files:
                vector_store.delete_file(
                    repository_id=repository_id,
                    relative_path=file.relative_path,
                )

            # Delete vectors for deleted files
            for file in diff.deleted_files:
                vector_store.delete_file(
                    repository_id=repository_id,
                    relative_path=file.path,
                )

            files_to_index = [
                *diff.new_files,
                *diff.modified_files,
            ]

            resume = repository.index_current_file is not None

            if not resume:

                total_chunks = 0

                for file in files_to_index:
                    total_chunks += chunking.count_chunks(file)

                repository.index_total_chunks = total_chunks
                repository.index_processed_chunks = 0

                db.commit()

            indexer.start(
                repository_id=repository_id,
                repository=repository,
                db=db,
                reindex=False,
            )

            for file in files_to_index:

                if resume:
                    if file.relative_path != repository.index_current_file:
                        continue

                    resume = False

                indexer.index_file(file)

            indexer.finish()

            RepositoryStatusService.update(
                db=db,
                repository=repository,
                status=AnalysisStatus.completed,
                progress=100,
            )

            metadata = RepositoryMetadataService()

            metadata.add_new_files(
                db=db,
                repository_id=repository_id,
                files=diff.new_files,
            )

            metadata.update_modified_files(
                db=db,
                repository_id=repository_id,
                files=diff.modified_files,
            )

            metadata.delete_files(
                db=db,
                files=diff.deleted_files,
            )

        except Exception:
            RepositoryStatusService.update(
                db=db,
                repository=repository,
                status=AnalysisStatus.failed,
                progress=repository.progress,
            )
            raise
        finally:
            db.close()
