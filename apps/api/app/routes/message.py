from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.message import (
    CreateMessageRequest,
    MessageResponse,
)
from app.services.chat.message_service import MessageService
from app.services.chat.chat_service import ChatService
from app.schemas.chat import ChatResponse
from app.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/messages",
    tags=["Messages"],
    dependencies=[Depends(get_current_user)]
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

@router.post(
    "/conversation/{conversation_id}/stream",
    response_model=MessageResponse,
)
def create_message(
    conversation_id: int,
    body: CreateMessageRequest,
    db: Session = Depends(get_db),
):
    chat = ChatService(db)
    return StreamingResponse(
        chat.stream(conversation_id=conversation_id, question=body.content),
        media_type="text/event-stream",
    )