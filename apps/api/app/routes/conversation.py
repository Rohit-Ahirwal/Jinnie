from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.schemas.conversation import ConversationResponse
from app.services.ai.gemini_service import GeminiService
from app.services.chat.conversation_service import ConversationService
from app.schemas.conversation import CreateConversation

router = APIRouter(prefix="/conversations", tags=["Conversation"])


@router.get(
    "/repository/{github_repository_id}",
    response_model=list[ConversationResponse],
)
def get_repository_conversation(
        github_repository_id: str,
        user_id=Depends(get_current_user),
        db: Session = Depends(get_db),
):
    return ConversationService.get_conversations(
        db=db,
        github_repository_id=github_repository_id,
        user_id=user_id["sub"],
    )

@router.post(
    "/repository/{github_repository_id}",
    response_model=ConversationResponse,
)
def create_conversation(
        github_repository_id: str,
        body: CreateConversation,
        user_id=Depends(get_current_user),
        db: Session = Depends(get_db),
):
    return ConversationService.create_conversation(
        db=db,
        github_repository_id=github_repository_id,
        title=body.title,
        user_id=user_id["sub"],
    )


@router.get("/test-retrieval/{repository_id}")
def test(repository_id: int):
    service = GeminiService()

    for chunk in service.stream(
            "Write a detailed 1000-word article explaining how Python's asyncio event loop works with many code examples."
    ):
        print(repr(chunk))