from pathlib import Path

from app.celery_app import celery_app
from app.database.models import Repositories
from app.services.workspace_service import WorkspaceService
from app.database.connection import SessionLocal


def get_file_metadata(path: str):
    p = Path(path)

    return {
        "path": path,
        "filename": p.name,
        "extension": p.suffix,
    }


MAX_FILE_SIZE = 500_000


@celery_app.task(name="analyze_repository")
def analyze_repository(repository_id):
    db = SessionLocal()

    try:
        repository = (
            db.query(Repositories)
            .filter(Repositories.id == repository_id)
            .first()
        )

        if repository is None:
            raise Exception("Repository not found")

        workspace = WorkspaceService()

        repo_path = workspace.clone_repository(
            repository_id=repository.id,
            clone_url=repository.clone_url
        )
        

    finally:
        db.close()
