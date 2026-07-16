from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.conversation import ConversationResponse
from app.services.chat.conversation_service import ConversationService
from app.database.session import get_db
from app.services.ai.gemini_service import GeminiService
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/conversations", tags=["Conversation"])


@router.get(
    "/repository/{github_repository_id}",
    response_model=ConversationResponse,
)
def get_repository_conversation(
    github_repository_id: str,
    user_id=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return ConversationService.get_or_create(
        db=db,
        github_repository_id=github_repository_id,
        user_id=user_id["sub"],
    )

@router.get("/test-retrieval/{repository_id}")
def test(repository_id: int):
    service = GeminiService()

    response = service.generate(
        "Reply with exactly: Hello Jinnie"
    )

    print(response.content)
    return "Hello Jinnie"