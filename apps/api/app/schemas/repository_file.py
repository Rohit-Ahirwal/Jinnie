from pydantic import BaseModel


class RepositoryFileResponse(BaseModel):
    path: str
    name: str
    language: str
    content: str
    size: int