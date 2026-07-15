import time

import math

from sqlalchemy.orm import Session

from app.services.ai.chunking_service import ChunkingSevice
from app.services.ai.embedding_service import EmbeddingService
from app.services.ai.vector_store_service import VectorStoreService
from app.config import settings
from app.services.repository_status_service import RepositoryStatusService
from app.database.models import AnalysisStatus


class IndexRepositoryService:

    def index(self, repository_id: int, repository, scanned_files: list, db: Session):
        BATCH_SIZE = settings.EMBED_BATCH_SIZE
        chunking = ChunkingSevice()
        embedding = EmbeddingService()
        vector_store = VectorStoreService()

        vector_store.create_collection(
            embedding.dimensions()
        )

        vector_store.delete_repository(repository_id)

        all_chunks = []

        for scanned_file in scanned_files:
            document = chunking.create_document(scanned_file)

            chunks = chunking.split(document)

            all_chunks.extend(chunks)

            if not chunks:
                continue

        if not all_chunks:
            return

        total_batches = math.ceil(
            len(all_chunks) / BATCH_SIZE
        )

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

            current_batch = (i // BATCH_SIZE) + 1

            progress = 60 + int(
                (current_batch / total_batches) * 35
            )

            RepositoryStatusService.update(
                db=db,
                repository=repository,
                status=AnalysisStatus.syncing,
                progress=progress,
            )

            time.sleep(settings.EMBED_DELAY_SECONDS)