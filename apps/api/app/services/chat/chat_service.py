from sqlalchemy.orm import Session

from app.services.ai.gemini_service import GeminiService
from app.services.ai.retrieval_service import RetrievalService
from app.services.chat.message_service import MessageService
from app.services.chat.conversation_service import ConversationService
from app.database.models import MessageRole, Conversation
from app.services.ai.prompt_service import PromptService
from app.schemas.chat import ChatResponse


class ChatService:
    def __init__(self, db: Session):
        self.db = db

        self.retrival = RetrievalService()
        self.conversation = ConversationService()
        self.message = MessageService()
        self.prompt = PromptService()
        self.gemini = GeminiService()

    def ask(
            self,
            conversation_id: int,
            question: str,
    ):
        # 1. Get Conversation
        conversation = (
            self.db.query(Conversation)
            .filter(
                Conversation.id == conversation_id
            )
            .first()
        )

        if conversation is None:
            raise ValueError("Conversation not found")

        # 2. Save User Message
        self.message.create(
            db=self.db,
            conversation=conversation,
            role=MessageRole.user,
            content=question
        )

        # 3. Load Conversation History
        history = self.message.list(
            db=self.db,
            conversation_id=conversation_id,
        )

        # 4. Retrieve Repository Context
        context = self.retrival.retrieve(
            repository_id=conversation.repository_id,
            question=question,
        )

        sources = []

        seen = set()

        for chunk in context:
            key = chunk["path"]

            if key in seen:
                continue

            seen.add(key)

            sources.append(
                {
                    "path": chunk["path"],
                    "filename": chunk["filename"],
                    "language": chunk["language"],
                    "score": chunk["score"],
                    "chunk_index": chunk["chunk_index"],
                }
            )

        # 5. Create Prompt
        prompt = self.prompt.build(
            question=question,
            history=history,
            context=context,
        )

        # 6. Ask Gemini
        response = self.gemini.generate(prompt)

        # 7. Save Response
        assistant_message = self.message.create(
            db=self.db,
            conversation=conversation,
            role=MessageRole.assistant,
            content=response.content,
            token_count=response.token_count,
        )

        return ChatResponse(
            conversation_id=conversation_id,
            message=assistant_message,
            sources=sources,
        )