import logging
import os

from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
from tenacity import retry, wait_exponential, stop_after_attempt, retry_if_exception_type, before_sleep_log

from app.config import settings
from langchain_google_genai._common import GoogleGenerativeAIError

load_dotenv()
logger = logging.getLogger(__name__)

class EmbeddingService:

    def __init__(self):
        self.embeddings = GoogleGenerativeAIEmbeddings(
            google_api_key=os.getenv('GOOGLE_API_KEY'),
            model=settings.EMBEDDING_MODEL,
        )

    @retry(
        retry=retry_if_exception_type(GoogleGenerativeAIError),
        wait=wait_exponential(multiplier=2),
        stop=stop_after_attempt(settings.EMBED_MAX_RETRIES),
        before_sleep=before_sleep_log(logger, logging.WARNING),
        reraise=True)
    def embed_documents(self, texts: list[str]):
        return self.embeddings.embed_documents(texts)

    def embed_query(self, query: str):
        return self.embeddings.embed_query(query)

    def dimensions(self) -> int:
        return len(self.embed_query("dimension_test"))