from app.services.ai.chunking_service import ChunkingSevice
from app.services.ai.embedding_service import EmbeddingService
from app.services.ai.vector_store_service import VectorStoreService


class IndexRepositoryService:

    def index(self, repository_id: int, scanned_files: list):
        BATCH_SIZE = 20
        chunking = ChunkingSevice()
        embedding = EmbeddingService()
        vector_store = VectorStoreService()

        vector_store.create_collection(
            embedding.dimensions()
        )

        all_chunks = []

        for scanned_file in scanned_files:
            document = chunking.create_document(scanned_file)

            chunks = chunking.split(document)

            all_chunks.extend(chunks)

            if not chunks:
                continue

        if not all_chunks:
            return

        for i in range(0, len(all_chunks), BATCH_SIZE):
            batch = all_chunks[i:i + BATCH_SIZE]

            vectors = embedding.embed_documents(
                [chunk.page_content for chunk in batch]
            )

            vector_store.upsert_chunks(
                repository_id=repository_id,
                chunks=batch,
                vectors=vectors,
            )