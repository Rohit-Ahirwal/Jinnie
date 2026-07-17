from langchain_core.documents import Document
from sqlalchemy.orm import Session

from app.services.ai.chunking_service import ChunkingSevice
from app.services.ai.embedding_service import EmbeddingService
from app.services.ai.vector_store_service import VectorStoreService
from app.config import settings
from app.services.repository_status_service import RepositoryStatusService
from app.database.models import AnalysisStatus
from app.database.data_classes import ScannedFile
from app.database.models import Repositories


class IndexRepositoryService:

    def __init__(self):
        self.repository: Repositories|None = None
        self.db = None
        self.repository_id = None
        self.current_file = None
        self.resume_mode = False
        self.next_chunk_index = 0
        self.batch: list[Document] = []
        self.chunking = ChunkingSevice()
        self.embedding = EmbeddingService()
        self.vector_store = VectorStoreService()
        self.batch_size = settings.BATCH_SIZE

    def start(self, repository_id: int, repository: Repositories, db: Session, reindex: bool):
        self.batch = []
        self.db = db
        self.repository_id = repository_id
        self.repository = repository

        self.vector_store.create_collection(
            self.embedding.dimensions()
        )

        if reindex:
            self.vector_store.delete_repository(repository_id)

        self.resume_mode = self.repository.index_current_file is not None



    def index_file(self, scanned_file: ScannedFile):

        resume_chunk = self.repository.index_next_chunk

        # ---------- Resume ----------

        if self.resume_mode:

            if scanned_file.relative_path != self.repository.index_current_file:
                return

            self.resume_mode = False

        # ----------------------------

        self.current_file = scanned_file.relative_path

        document = self.chunking.create_document(scanned_file)

        chunks = self.chunking.split(document)

        if resume_chunk > 0:

            chunks = chunks[resume_chunk:]

        start_index = resume_chunk

        for index, chunk in enumerate(chunks, start=start_index):
            self.batch.append(chunk)

            self.next_chunk_index = index + 1

            if len(self.batch) >= self.batch_size:
                self.flush()

        # Flush Remaining of files
        self.flush()


    def flush(self):
        if not self.batch:
            return

        # Embedding & Vector Upload

        vectors = self.embedding.embed_documents(
            [chunk.page_content for chunk in self.batch],
        )

        self.vector_store.upsert_chunks(
            repository_id=self.repository_id,
            vectors=vectors,
            chunks=self.batch,
        )

        processed_chunk_count = len(self.batch)

        self.repository.index_processed_chunks += processed_chunk_count
        self.repository.index_processed_batches += 1

        self.repository.index_current_file = self.current_file
        self.repository.index_next_chunk = self.next_chunk_index

        self.db.commit()

        if self.repository.index_total_chunks > 0:
            progress = 60 + int(
                (
                        self.repository.index_processed_chunks
                        / self.repository.index_total_chunks
                ) * 35
            )
        else:
            progress = 95

        RepositoryStatusService.update(
            db=self.db,
            repository=self.repository,
            status=AnalysisStatus.syncing,
            progress=progress,
        )

        self.batch.clear()

    def finish(self):
        self.flush()
        self.repository.index_current_file = None
        self.repository.index_next_chunk = 0
        self.db.commit()