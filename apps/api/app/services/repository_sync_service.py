from app.database.connection import SessionLocal
from app.database.models import RepositoryFile, Repositories
from app.services.repository_scanner import RepositoryScanner
from app.services.workspace_service import WorkspaceService
from app.database.models import AnalysisStatus
from app.services.repository_status_service import RepositoryStatusService
from app.services.ai.index_repository_service import IndexRepositoryService


class RepositorySyncService:
    def sync(self, repository_id: int):
        db = SessionLocal()
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

            RepositoryStatusService.update(db=db, repository=repository, status=AnalysisStatus.syncing, progress=60)

            # 4. Handling Chunking, Embedding, and Vector Store
            IndexRepositoryService().index(repository_id=repository.id, scanned_files=scanned_files, db=db, repository=repository)

            existing_files = (
                db.query(RepositoryFile)
                .filter(
                    RepositoryFile.repository_id == repository_id
                )
                .all()
            )

            existing_map = {
                file.path: file
                for file in existing_files
            }

            new_files = []
            modified_files = []
            deleted_files = []

            for scanned_file in scanned_files:
                db_file = existing_map.get(scanned_file.relative_path)

                if db_file is None:
                    new_files.append(
                        RepositoryFile(
                            repository_id=repository.id,
                            path=scanned_file.relative_path,
                            filename=scanned_file.filename,
                            extension=scanned_file.extension,
                            language=scanned_file.language,
                            size=scanned_file.size,
                            hash=scanned_file.hash,
                        ))
                    continue

                if db_file.hash != scanned_file.hash:
                    db_file.hash = scanned_file.hash
                    db_file.size = scanned_file.size
                    db_file.language = scanned_file.language
                    modified_files.append(db_file)

            db.add_all(new_files)
            db.commit()
            RepositoryStatusService.update(db=db, repository=repository, status=AnalysisStatus.completed, progress=100)
            
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