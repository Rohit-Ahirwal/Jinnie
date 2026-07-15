import os

from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
from tenacity import retry, wait_exponential, stop_after_attempt

load_dotenv()


class EmbeddingService:

    def __init__(self):
        self.embeddings = GoogleGenerativeAIEmbeddings(
            google_api_key=os.getenv('GOOGLE_API_KEY'),
            model="gemini-embedding-2",
        )

    @retry(wait=wait_exponential(multiplier=2), stop=stop_after_attempt(5))
    def embed_documents(self, texts: list[str]):
        return self.embeddings.embed_documents(texts)

    def embed_query(self, query: str):
        return self.embeddings.embed_query(query)

    def dimensions(self) -> int:
        return len(self.embed_query("dimension_test"))