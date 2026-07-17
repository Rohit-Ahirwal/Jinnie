from sqlalchemy.orm import Session

from app.database.models import RepositoryFile
from app.database.data_classes import RepositoryDiff, ScannedFile


class RepositoryDiffService:

    def compare(
        self,
        db: Session,
        repository_id: int,
        scanned_files,
    ) -> RepositoryDiff:

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
        unchanged_files = []

        seen_paths = set()

        for scanned_file in scanned_files:
            seen_paths.add(scanned_file.relative_path)

            db_file = existing_map.get(scanned_file.relative_path)

            if db_file is None:
                new_files.append(scanned_file)

                continue

            if db_file.hash != scanned_file.hash:
                modified_files.append(scanned_file)

                continue

            unchanged_files.append(db_file)


        deleted_files = []

        for db_file in existing_files:

            if db_file.path not in seen_paths:
                deleted_files.append(db_file)

        return RepositoryDiff(
            new_files=new_files,
            modified_files=modified_files,
            deleted_files=deleted_files,
            unchanged_files=unchanged_files,
        )