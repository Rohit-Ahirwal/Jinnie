from app.services.ai.embedding_service import EmbeddingService
from app.services.ai.vector_store_service import VectorStoreService


class RetrievalService:
    def __init__(self):
        self.embedding = EmbeddingService()
        self.vector_store = VectorStoreService()

    def retrieve(
        self,
        repository_id: int,
        question: str,
        limit: int = 10,
    ):
        vector = self.embedding.embed_query(question)

        results = self.vector_store.search(
            query_vector=vector,
            repository_id=repository_id,
            limit=limit,
        )

        chunks = []

        for result in results:
            if result.score >= 0.45:
                payload = result.payload

                chunks.append(
                    {
                        "content": payload["content"],
                        "path": payload["path"],
                        "filename": payload["filename"],
                        "language": payload["language"],
                        "chunk_index": payload["chunk_index"],
                        "score": result.score,
                    }
                )

        return chunks