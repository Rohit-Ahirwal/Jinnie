from sqlalchemy.orm import Session

from app.database.data_classes import ScannedFile
from app.database.models import RepositoryFile


class RepositoryMetadataService:

    def add_new_files(
            self,
            db: Session,
            repository_id: int,
            files: list[ScannedFile]
    ):

        new_records = []

        for file in files:
            new_records.append(
                RepositoryFile(
                    repository_id=repository_id,
                    path=file.relative_path,
                    filename=file.filename,
                    extension=file.extension,
                    language=file.language,
                    size=file.size,
                    hash=file.hash,
                )
            )

        db.add_all(new_records)
        db.commit()

    def update_modified_files(
            self,
            db: Session,
            repository_id: int,
            files: list[ScannedFile]
    ):

        existing = (
            db.query(RepositoryFile)
            .filter(RepositoryFile.repository_id == repository_id)
            .all()
        )

        existing_map = {
            f.path: f
            for f in existing
        }

        for file in files:
            db_file = existing_map[file.relative_path]

            db_file.hash = file.hash
            db_file.size = file.size
            db_file.language = file.language
            db_file.extension = file.extension

        db.commit()

    def delete_files(
            self,
            db: Session,
            files: list[RepositoryFile],
    ):
        for file in files:
            db.delete(file)

        db.commit()
