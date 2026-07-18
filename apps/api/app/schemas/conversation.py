from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ConversationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    repository_id: int
    title: str
    created_at: datetime
    updated_at: datetime

class CreateConversation(BaseModel):
    title: str