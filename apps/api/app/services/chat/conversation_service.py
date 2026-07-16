from sqlalchemy.orm import Session

from app.database.models import Conversation, Repositories


class ConversationService:
    @staticmethod
    def get_conversations(
        db: Session,
        github_repository_id: str,
        user_id: str
    ) -> list[Conversation]:
        
        repository = db.query(Repositories).filter(
            Repositories.github_repo_id == github_repository_id,
            Repositories.user_id == user_id,
        ).first()

        if repository is None:
            return []

        conversations = (
            db.query(Conversation)
            .filter(Conversation.repository_id == repository.id)
            .order_by(Conversation.updated_at.desc())
            .all()
        )

        return conversations