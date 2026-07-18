from app.database.models import Message
from app.database.models import ChatIntent
from app.prompts.explain_prompt import EXPLAIN_PROMPT
from app.prompts.architecture_prompt import ARCHITECTURE_PROMPT
from app.prompts.debug_prompt import DEBUG_PROMPT
from app.prompts.generate_prompt import GENERATE_PROMPT
from app.prompts.performance_prompt import PERFORMANCE_PROMPT
from app.prompts.refactor_prompt import REFACTOR_PROMPT
from app.prompts.review_prompt import REVIEW_PROMPT
from app.prompts.security_prompt import SECURITY_PROMPT
from app.prompts.testing_prompt import TESTING_PROMPT
from app.prompts.base_prompt import BASE_PROMPT, RESPONSE_FORMAT

PROMPTS = {
    ChatIntent.EXPLAIN: EXPLAIN_PROMPT,
    ChatIntent.DEBUG: DEBUG_PROMPT,
    ChatIntent.ARCHITECTURE: ARCHITECTURE_PROMPT,
    ChatIntent.GENERATE: GENERATE_PROMPT,
    ChatIntent.REVIEW: REVIEW_PROMPT,
    ChatIntent.REFACTOR: REFACTOR_PROMPT,
    ChatIntent.PERFORMANCE: PERFORMANCE_PROMPT,
    ChatIntent.SECURITY: SECURITY_PROMPT,
    ChatIntent.TESTING: TESTING_PROMPT,
    ChatIntent.GENERAL: "",
}

class PromptService:

    def build(
            self,
            intent,
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

        intent_prompt = PROMPTS.get(intent, "")

        return f"""
        {BASE_PROMPT}
        
        {RESPONSE_FORMAT}
        
        {intent_prompt}

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
