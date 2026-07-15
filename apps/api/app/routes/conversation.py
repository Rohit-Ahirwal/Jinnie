from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.conversation import ConversationResponse
from app.services.chat.conversation_service import ConversationService
from app.database.session import get_db

router = APIRouter(prefix="/conversations", tags=["Conversation"])


@router.get(
    "/repository/{repository_id}",
    response_model=ConversationResponse,
)
def get_repository_conversation(
    repository_id: int,
    db: Session = Depends(get_db),
):
    return ConversationService.get_or_create(
        db=db,
        repository_id=repository_id,
    )