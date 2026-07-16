from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.conversation import ConversationResponse
from app.services.chat.conversation_service import ConversationService
from app.database.session import get_db
from app.services.ai.retrieval_service import RetrievalService
from app.services.ai.gemini_service import GeminiService

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

@router.get("/test-retrieval/{repository_id}")
def test(repository_id: int):
    service = GeminiService()

    response = service.generate(
        "Reply with exactly: Hello Jinnie"
    )

    print(response.content)
    return "Hello Jinnie"