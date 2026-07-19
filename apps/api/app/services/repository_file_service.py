from pathlib import Path

from fastapi import HTTPException

from app.services.workspace_service import WorkspaceService
from app.schemas.repository_file import RepositoryFileResponse

LANGUAGE_MAP = {
    ".py": "python",
    ".ts": "typescript",
    ".tsx": "typescript",
    ".js": "javascript",
    ".jsx": "javascript",
    ".json": "json",
    ".md": "markdown",
    ".yml": "yaml",
    ".yaml": "yaml",
}

class RepositoryFileService:

    def __init__(self):
        self.workspace = WorkspaceService()

    def read(
        self,
        repository_id: int,
        relative_path: str,
    ) -> RepositoryFileResponse:

        root = self.workspace.get_repository_path(repository_id).resolve()

        file = (root / relative_path).resolve()

        # Prevent ../../ attacks
        if not str(file).startswith(str(root)):
            raise HTTPException(403, "Invalid path")

        if not file.exists():
            raise HTTPException(404, "File not found")

        if not file.is_file():
            raise HTTPException(400, "Path is not a file")

        content = file.read_text(
            encoding="utf-8",
            errors="replace",
        )

        language = LANGUAGE_MAP.get(file.suffix.lower(), "text")

        return RepositoryFileResponse(
            name=file.name,
            path=relative_path,
            language=language,
            size=file.stat().st_size,
            content=content,
        )