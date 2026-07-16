import uuid

from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams
from qdrant_client.models import PointStruct, FieldCondition, MatchValue, Filter
from app.config import settings


class VectorStoreService:

    COLLECTION_NAME = "repository_chunks"

    def __init__(self):
        self.client = QdrantClient(
            url=settings.QDRANT_URL,
        )

    def create_collection(self, vector_size: int):
        collections = self.client.get_collections()

        if any(
                c.name == self.COLLECTION_NAME
                for c in collections.collections
        ):
            return

        self.client.create_collection(
            collection_name=self.COLLECTION_NAME,
            vectors_config=VectorParams(
                size=vector_size,
                distance=Distance.COSINE,
            ),
        )

    def upsert_chunks(self, repository_id: int, chunks: list, vectors: list[list[float]]):
        points = []

        for index, (chunk, vector) in enumerate(zip(chunks, vectors)):
            point_id = str(
                uuid.uuid5(
                    uuid.NAMESPACE_DNS,
                    f"{repository_id}:{chunk.metadata['path']}:{index}"
                )
            )

            point = PointStruct(
                id=point_id,
                vector=vector,
                payload={
                    "repository_id": repository_id,
                    "path": chunk.metadata["path"],
                    "filename": chunk.metadata["filename"],
                    "extension": chunk.metadata["extension"],
                    "language": chunk.metadata["language"],
                    "hash": chunk.metadata["hash"],
                    "chunk_index": index,
                    "content": chunk.page_content,
                },
            )

            points.append(point)

        if not points:
            return

        self.client.upsert(
            collection_name=self.COLLECTION_NAME,
            points=points,
        )

    def search(
            self,
            query_vector: list[float],
            repository_id: int,
            limit: int = 10,
    ):
        return self.client.query_points(
            collection_name=self.COLLECTION_NAME,
            query=query_vector,
            query_filter=Filter(
                must=[
                    FieldCondition(
                        key="repository_id",
                        match=MatchValue(value=repository_id),
                    )
                ]
            ),
            limit=limit,
        ).points

    def delete_repository(self, repository_id: int):
        self.client.delete(
            collection_name=self.COLLECTION_NAME,
            points_selector=Filter(
                must=[
                    FieldCondition(
                        key="repository_id",
                        match=MatchValue(value=repository_id),
                    )
                ]
            ),
        )