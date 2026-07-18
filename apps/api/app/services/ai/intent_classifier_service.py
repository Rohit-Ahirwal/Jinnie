
from google import genai

from app.config import settings
from app.database.models import ChatIntent



class IntentClassifierService:

    SYSTEM_PROMPT = f"""
        You are an intent classifier for a software engineering AI.
        
        Classify the user's request into EXACTLY ONE of these intents.
        
        {", ".join(intent.value for intent in ChatIntent)}
        
        Rules:
        
        - Return ONLY the intent.
        - No explanation.
        - No punctuation.
        - No markdown.
        - No extra text.
        
        Examples
        
        Question:
        Explain how authentication works.
        
        Intent:
        EXPLAIN
        
        Question:
        Find the bug causing login to fail.
        
        Intent:
        DEBUG
        
        Question:
        Generate a Redis middleware.
        
        Intent:
        GENERATE
        
        Question:
        Review this repository.
        
        Intent:
        REVIEW
        
        Question:
        Refactor this service.
        
        Intent:
        REFACTOR
        
        Question:
        How can I scale this to millions of users?
        
        Intent:
        ARCHITECTURE
        
        Question:
        How can I optimize this query?
        
        Intent:
        PERFORMANCE
        
        Question:
        Is this authentication secure?
        
        Intent:
        SECURITY
        
        Question:
        Write unit tests.
        
        Intent:
        TESTING
        
        Question:
        What does this repository do?
        
        Intent:
        GENERAL
    """

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GOOGLE_API_KEY
        )

    def classify(self, question: str) -> ChatIntent:
        try:

            response = self.client.models.generate_content(
                model=settings.GENERATION_MODEL,
                contents=question,
                config={
                    "system_instruction": self.SYSTEM_PROMPT,
                    "temperature": 0,
                    "max_output_tokens": 10,
                },
            )

            intent = response.text.strip().upper()

            return ChatIntent(intent)

        except Exception:
            return ChatIntent.GENERAL