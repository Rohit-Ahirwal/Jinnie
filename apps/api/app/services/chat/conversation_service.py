from sqlalchemy.orm import Session

from app.database.models import Conversation, Repositories


class ConversationService:
    @staticmethod
    def get_or_create(
        db: Session,
        github_repository_id: str,
        user_id: str
    ) -> Conversation:
        repository = db.query(Repositories).filter(
            Repositories.github_repo_id == github_repository_id,
            Repositories.user_id == user_id,
        ).first()

        print(repository)
        print(github_repository_id)
        print(user_id)

        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.repository_id == repository.id
            )
            .first()
        )

        if conversation:
            return conversation

        repository = (
            db.query(Repositories)
            .filter(
                Repositories.id == repository_id
            )
            .first()
        )

        if repository is None:
            raise ValueError("Repository not found")

        conversation = Conversation(
            repository_id=repository.id,
            title="New Conversation",
        )

        db.add(conversation)
        db.commit()
        db.refresh(conversation)

        return conversation