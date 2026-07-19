from pathlib import Path

from app.services.workspace_service import WorkspaceService
from app.schemas.repository_tree import RepositoryTreeNode


class RepositoryTreeService:

    def __init__(self):
        self.workspace = WorkspaceService()

    def get_tree(
        self,
        repository_id: int,
    ) -> list[RepositoryTreeNode]:

        root = self.workspace.get_repository_path(repository_id)

        return self._build(root, root)

    def _build(
            self,
            root: Path,
            current: Path,
    ) -> list[RepositoryTreeNode]:

        nodes = []

        for item in sorted(
                current.iterdir(),
                key=lambda x: (x.is_file(), x.name.lower()),
        ):

            relative = item.relative_to(root).as_posix()

            if item.is_dir():

                nodes.append(
                    RepositoryTreeNode(
                        name=item.name,
                        path=relative,
                        type="folder",
                        children=self._build(root, item),
                    )
                )

            else:

                nodes.append(
                    RepositoryTreeNode(
                        name=item.name,
                        path=relative,
                        type="file",
                    )
                )

        return nodes