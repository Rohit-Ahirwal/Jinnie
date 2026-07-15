from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.database.models import Conversation, MessageRole
from app.schemas.message import (
    CreateMessageRequest,
    MessageResponse,
)
from app.services.chat.message_service import MessageService

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
    response_model=MessageResponse,
)
def create_message(
    conversation_id: int,
    body: CreateMessageRequest,
    db: Session = Depends(get_db),
):
    conversation = (
        db.query(Conversation)
        .filter(
            Conversation.id == conversation_id
        ).first()
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return MessageService.create(
        db=db,
        conversation=conversation,
        role=MessageRole.user,
        content=body.content,
    )