from pathlib import Path
import subprocess


class WorkspaceService:

    WORKSPACE_ROOT = Path("workspace/repositories")

    def __init__(self):
        self.WORKSPACE_ROOT.mkdir(
            parents=True,
            exist_ok=True,
        )

    def get_repository_path(self, repository_id: int) -> Path:
        return self.WORKSPACE_ROOT / str(repository_id)

    def clone_repository(self, repository_id: int, clone_url: str):
        repo_path = self.get_repository_path(repository_id)

        if repo_path.exists():
            return repo_path

        subprocess.run(
            [
                "git",
                "clone",
                "--depth",
                "1",
                clone_url,
                str(repo_path),
            ],
            check=True,
        )

        return repo_path