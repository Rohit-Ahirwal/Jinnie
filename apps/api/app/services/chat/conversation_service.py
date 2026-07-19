from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import now

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

    @staticmethod
    def create_conversation(
            db: Session,
            github_repository_id: str,
            user_id: str,
            title: str,
    ) -> Conversation:

        repository = db.query(Repositories).filter(
            Repositories.github_repo_id == github_repository_id,
            Repositories.user_id == user_id,
        ).first()

        conversation = Conversation(
            repository_id=repository.id,
            created_at=now(),
            title=title,
        )
        db.add(conversation)
        db.commit()
        db.refresh(conversation)

        return conversation

    @staticmethod
    def delete_conversation(
            db: Session,
            conversation_id: int
    ):
        conversation = (
            db.query(Conversation)
            .filter(Conversation.id == conversation_id)
            .first()
        )

        if conversation is None:
            raise HTTPException(status_code=404, detail="Conversation not found")

        db.delete(conversation)
        db.commit()

        return {
            "success": True,
            "message": "Conversation successfully deleted",
        }