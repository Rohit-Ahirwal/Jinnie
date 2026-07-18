import logging
import os

from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
from tenacity import retry, wait_exponential, stop_after_attempt, retry_if_exception_type, before_sleep_log

from app.config import settings
from langchain_google_genai._common import GoogleGenerativeAIError

from app.services.ai.rate_limiter_service import rate_limiter

load_dotenv()
logger = logging.getLogger(__name__)

class EmbeddingService:

    def __init__(self):
        self.rate_limiter = rate_limiter

        self.embeddings = GoogleGenerativeAIEmbeddings(
            google_api_key=os.getenv('GOOGLE_API_KEY'),
            model=settings.EMBEDDING_MODEL,
        )

    def _estimate_tokens(self, texts: list[str]) -> int:
        total_characters = sum(len(text) for text in texts)
        return max(1, total_characters // 4)

    @retry(
        retry=retry_if_exception_type(GoogleGenerativeAIError),
        wait=wait_exponential(multiplier=2),
        stop=stop_after_attempt(settings.EMBED_MAX_RETRIES),
        before_sleep=before_sleep_log(logger, logging.WARNING),
        reraise=True)
    def embed_documents(self, texts: list[str]):
        estimated_tokens = self._estimate_tokens(texts)

        self.rate_limiter.acquire(estimated_tokens)

        return self.embeddings.embed_documents(texts)

    def embed_query(self, query: str):
        return self.embeddings.embed_query(query)

    def dimensions(self) -> int:
        return len(self.embed_query("dimension_test"))