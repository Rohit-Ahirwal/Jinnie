from pydantic import BaseModel
from app.schemas.message import MessageResponse
from app.schemas.source import SourceResponse


class ChatRequest(BaseModel):
    content: str


class ChatResponse(BaseModel):
    conversation_id: int
    message: MessageResponse
    sources: list[SourceResponse]