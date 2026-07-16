from dataclasses import dataclass

from app.database.models import RepositoryFile


@dataclass(slots=True)
class ScannedFile:
    path: str
    relative_path: str
    filename: str
    extension: str
    language: str
    size: int
    hash: str
    content: str

@dataclass(slots=True)
class SyncResult:
    new_files: list[ScannedFile]
    modified_files: list[ScannedFile]
    deleted_files: list[RepositoryFile]
    unchanged_files: list[RepositoryFile]

@dataclass
class RetrievedChunk:
    content: str
    path: str
    filename: str
    language: str
    score: float

@dataclass
class AIResponse:
    content: str
    token_count: int