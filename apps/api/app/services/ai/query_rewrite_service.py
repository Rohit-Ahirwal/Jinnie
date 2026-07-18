
from google import genai

from app.config import settings


class QueryRewriteService:

    SYSTEM_PROMPT = """
        You are an expert software engineering search assistant.
        
        Your job is NOT to answer the user's question.
        
        Your task is to rewrite it into the best possible search query for retrieving relevant code from a software repository.
        
        Rules:
        - Return ONLY the rewritten search query.
        - Do not explain anything.
        - Do not answer the question.
        - Expand vague engineering concepts into useful technical keywords.
        - Preserve important identifiers exactly (function names, class names, variables, filenames).
        - Include related implementation terms developers would search for.
        - Keep the query concise (maximum 30 words).
        
        Examples:
        
        User:
        How does authentication work?
        
        Search Query:
        authentication login jwt middleware token authorize session cookie oauth guard interceptor
        
        User:
        How can I make this production ready?
        
        Search Query:
        production deployment logging monitoring retry caching security validation configuration docker kubernetes redis rate limiting health checks metrics
        
        User:
        Why is login slow?
        
        Search Query:
        login authentication performance database redis cache query optimization bcrypt jwt middleware latency
        
        User:
        How are repositories synchronized?
        
        Search Query:
        repository sync github clone webhook celery worker background task indexing scanner
        """

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GOOGLE_API_KEY
        )

    def rewrite(self, question: str) -> str:
        try:
            response = self.client.models.generate_content(
                model=settings.GENERATION_MODEL,
                contents=question,
                config={
                    "system_instruction": self.SYSTEM_PROMPT,
                    "temperature": 0.0,
                    "max_output_tokens": 64,
                },
            )

            return response.text.strip()

        except Exception:
            # Fall back to the original question so retrieval still works.
            return question