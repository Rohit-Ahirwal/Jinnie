from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.database.models import MessageRole, MessageStatus


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    role: MessageRole
    status: MessageStatus
    content: str
    token_count: int
    created_at: datetime


class CreateMessageRequest(BaseModel):
    content: str