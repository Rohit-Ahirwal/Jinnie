from pydantic import BaseModel

class RepositoryCreate(BaseModel):
    github_repo_id: str
    repo_name: str
    repo_description: str | None = None
    owner: str
    private: bool
    default_branch: str
    repo_url: str
    clone_url: str
    language: str | None = None
    stars: int = 0
    issues: int = 0

class RepositoryResponse(BaseModel):
    id: int
    repo_name: str
    repo_url: str
    owner: str
    private: bool
    default_branch: str
    file_count: int
    language: str
    stars: int
    issues: int
    status: str
