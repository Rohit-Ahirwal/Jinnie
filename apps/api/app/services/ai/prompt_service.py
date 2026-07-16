from app.database.models import Message


class PromptService:

    def build(
            self,
            question: str,
            context: list[dict],
            history: list[Message],
    ) -> str:
        context_text = "\n\n".join(
            f"""File: {chunk["path"]}

        {chunk["content"]}"""
            for chunk in context
        )

        history_text = "\n".join(
            f"{message.role.value}: {message.content}"
            for message in history
        )

        return f"""
        You are Jinnie, an AI software engineering assistant.
        
        You answer questions ONLY using the provided repository context.
        
        If the answer cannot be found in the context, say that you don't have enough information instead of making something up.
        
        ------------------------
        Repository Context
        ------------------------
        
        {context_text}
        
        ------------------------
        Conversation History
        ------------------------
        
        {history_text}
        
        ------------------------
        User Question
        ------------------------
        
        {question}
        """
