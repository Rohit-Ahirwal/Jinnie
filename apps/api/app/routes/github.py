from fastapi import APIRouter, Depends
from app.tasks.repository import analyze_repository

from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.database.models import Repositories
from app.database.session import get_db
from app.schemas.repositories import RepositoryCreate, RepositoryResponse
from app.services.github import get_or_create_github_user, get_user_repo, get_github_connection
from app.services.github import get_repository

router = APIRouter()

@router.get("/callback")
async def github_callback(state: str, code: str, db: Session = Depends(get_db)):
    github_user= await get_or_create_github_user(state, code, db)
    return github_user

@router.get("/repository")
async def github_repos(search: str | None = None, user=Depends(get_current_user), db: Session = Depends(get_db)):
    github_user = get_github_connection(user["sub"], db)
    repos = await get_user_repo(github_user.access_token, search)
    return repos

@router.post("/repository")
async def github_repos(data: RepositoryCreate, user=Depends(get_current_user), db: Session = Depends(get_db)):
    existing = db.query(Repositories).filter(
        Repositories.github_repo_id == data.github_repo_id,
        Repositories.user_id == user["sub"]
    ).first()

    if existing:
        return existing

    repo = Repositories(
        user_id=user["sub"],
        **data.model_dump()
    )

    db.add(repo)
    db.commit()
    db.refresh(repo)

    analyze_repository.delay(repo.id)

    return repo

@router.get(
    "/repositories/{github_repo_id}",
    response_model=RepositoryResponse
)
def github_repo(github_repo_id: str, user=Depends(get_current_user), db: Session = Depends(get_db)):
    return get_repository(github_repo_id, db, user["sub"])