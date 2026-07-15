from pathlib import Path
from typing import List

from app.utils.file_hash import calculate_file_hash
from app.database.data_classes import ScannedFile

LANGUAGE_MAP = {
    ".py": "python",
    ".ts": "typescript",
    ".tsx": "typescriptreact",
    ".js": "javascript",
    ".jsx": "javascriptreact",
    ".java": "java",
    ".go": "go",
    ".rs": "rust",
    ".cpp": "cpp",
    ".c": "c",
    ".cs": "csharp",
    ".php": "php",
    ".rb": "ruby",
    ".md": "markdown",
    ".json": "json",
    ".yaml": "yaml",
    ".yml": "yaml",
}

IGNORE_DIRS = {
    ".git",
    "node_modules",
    ".next",
    "dist",
    "build",
    "coverage",
    ".venv",
    "venv",
    "__pycache__",
    ".idea",
    ".vscode",
}

IGNORE_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".svg",
    ".ico",
    ".mp4",
    ".mov",
    ".zip",
    ".tar",
    ".gz",
    ".exe",
    ".dll",
    ".so",
    ".pdf",
}

MAX_FILE_SIZE = 1024 * 1024

class RepositoryScanner:

    def scan(self, workspace_path: Path) -> List[ScannedFile]:
        files = []

        for path in workspace_path.rglob("*"):

            if any(part in IGNORE_DIRS for part in path.parts):
                continue

            if not path.is_file():
                continue

            if path.suffix.lower() in IGNORE_EXTENSIONS:
                continue

            language = LANGUAGE_MAP.get(path.suffix.lower(), "text")

            try:
                content = path.read_text(
                    encoding="utf-8"
                )
            except UnicodeDecodeError:
                continue

            files.append(
                ScannedFile(
                    path=str(path),
                    relative_path=str(path.relative_to(workspace_path)),
                    filename=path.name,
                    extension=path.suffix,
                    language=language,
                    size=path.stat().st_size,
                    hash=calculate_file_hash(path),
                    content=content,
                )
            )

        return files