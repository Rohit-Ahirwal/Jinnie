from pathlib import Path

from app.celery_app import celery_app
from app.services.repository_sync_service import RepositorySyncService


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
    RepositorySyncService().sync(repository_id=repository_id)