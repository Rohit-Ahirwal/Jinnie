from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.database.models import Conversation, MessageRole
from app.schemas.message import (
    CreateMessageRequest,
    MessageResponse,
)
from app.services.chat.message_service import MessageService
from app.services.chat.chat_service import ChatService
from app.schemas.chat import ChatResponse

router = APIRouter(
    prefix="/messages",
    tags=["Messages"],
)


@router.get(
    "/conversation/{conversation_id}",
    response_model=list[MessageResponse],
)
def get_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
):
    return MessageService.list(
        db,
        conversation_id,
    )


@router.post(
    "/conversation/{conversation_id}",
    response_model=ChatResponse,
)
def create_message(
    conversation_id: int,
    body: CreateMessageRequest,
    db: Session = Depends(get_db),
):
    chat = ChatService(db)
    return chat.ask(
        conversation_id=conversation_id,
        question=body.content
    )