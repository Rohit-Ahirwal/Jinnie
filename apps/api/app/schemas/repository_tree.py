from pydantic import BaseModel


class RepositoryTreeNode(BaseModel):
    name: str
    path: str
    type: str  # "file" | "folder"
    children: list["RepositoryTreeNode"] = []


RepositoryTreeNode.model_rebuild()