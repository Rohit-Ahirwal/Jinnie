from sqlalchemy.orm import Session
from app.database.models import Message, MessageRole, Conversation, MessageStatus


class MessageService:
    @staticmethod
    def list(
        db: Session,
        conversation_id: int,
    ) -> list[Message]:
        return (
            db.query(Message)
            .filter(
                Message.conversation_id == conversation_id
            )
            .order_by(Message.created_at.asc())
            .all()
        )

    @staticmethod
    def create(
        db: Session,
        conversation: Conversation,
        role: MessageRole,
        content: str,
        token_count: int = 0,
        status: MessageStatus = MessageStatus.completed,
    ) -> Message:

        message = Message(
            conversation_id=conversation.id,
            role=role,
            content=content,
            status=status,
            token_count=token_count
        )

        db.add(message)
        db.commit()
        db.refresh(message)

        return message