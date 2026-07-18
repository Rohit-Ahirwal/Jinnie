from sqlalchemy.orm import Session

from app.services.ai.embedding_service import EmbeddingService
from app.services.ai.vector_store_service import VectorStoreService
from app.services.ai.query_rewrite_service import QueryRewriteService
from app.services.repository_search_service import KeywordExtractor, RepositorySearchService
from app.config import settings


class RetrievalService:
    def __init__(self):
        self.embedding = EmbeddingService()
        self.vector_store = VectorStoreService()
        self.rewrite = QueryRewriteService()
        self.keyword_extractor = KeywordExtractor()
        self.repository_search = RepositorySearchService()

    def retrieve(
        self,
        db: Session,
        repository_id: int,
        question: str,
        limit: int = 10,
    ):
        search_query = self.rewrite.rewrite(question)

        vector = self.embedding.embed_query(search_query)

        vector_results = self.vector_store.search(
            query_vector=vector,
            repository_id=repository_id,
            limit=limit,
        )

        keywords = self.keyword_extractor.extract(search_query)

        files = self.repository_search.keyword_search(
            db=db,
            repository_id=repository_id,
            keywords=keywords,
        )

        keyword_results = []

        seen_paths = set()

        for file in files:
            if file.path in seen_paths:
                continue

            seen_paths.add(file.path)

            keyword_results.extend(
                self.vector_store.search_by_file(
                    repository_id=repository_id,
                    relative_path=file.path,
                    limit=settings.KEYWORD_CHUNK_LIMIT
                )
            )

        all_results = [
            *vector_results,
            *keyword_results
        ]

        seen = set()
        chunks = []

        for result in all_results:
            payload = result.payload
            key = (
                payload["path"],
                payload["chunk_index"]
            )

            if key in seen:
                continue

            seen.add(key)

            score = getattr(result, "score", None)

            if score is not None and score < settings.VECTOR_SCORE_THRESHOLD:
                continue

            chunks.append(
                {
                    "content": payload["content"],
                    "path": payload["path"],
                    "filename": payload["filename"],
                    "language": payload["language"],
                    "chunk_index": payload["chunk_index"],
                    "score": score,
                }
            )

        chunks.sort(
            key=lambda x: (
                x["score"] is None,
                -(x["score"] or 1),
            )
        )

        return chunks[:settings.MAX_CONTEXT_CHUNKS]