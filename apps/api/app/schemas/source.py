from pydantic import BaseModel


class SourceResponse(BaseModel):
    path: str
    filename: str
    language: str
    score: float
    chunk_index: int