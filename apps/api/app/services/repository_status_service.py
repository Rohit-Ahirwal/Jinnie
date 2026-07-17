class RepositoryStatusService:

    @staticmethod
    def update(
        db,
        repository,
        *,
        status=None,
        progress=None,
        error=None,
        total_chunks=None,
        processed_chunks=None,
        total_batches=None,
        processed_batches=None,
    ):
        if status is not None:
            repository.status = status

        if progress is not None:
            repository.progress = progress

        if total_chunks is not None:
            repository.index_total_chunks = total_chunks

        if processed_chunks is not None:
            repository.index_processed_chunks = processed_chunks

        if total_batches is not None:
            repository.index_total_batches = total_batches

        if processed_batches is not None:
            repository.index_processed_batches = processed_batches

        if error is not None:
            repository.error = error

        db.commit()