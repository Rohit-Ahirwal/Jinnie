class RepositoryStatusService:

    @staticmethod
    def update(
        db,
        repository,
        *,
        status,
        progress=None,
        error=None,
    ):
        repository.status = status

        if progress is not None:
            repository.progress = progress

        repository.error = error

        db.commit()