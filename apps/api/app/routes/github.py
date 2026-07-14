from fastapi import APIRouter, Depends
import httpx
import os

from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from database.session import get_db
from services.github import get_or_create_github_user, get_user_repo, get_github_connection

router = APIRouter()

@router.get("/callback")
async def github_callback(state: str, code: str, db: Session = Depends(get_db)):
    github_user= await get_or_create_github_user(state, code, db)
    return github_user

@router.get("/repos")
async def github_repos(search: str | None = None, user=Depends(get_current_user), db: Session = Depends(get_db)):
    github_user = get_github_connection(user["sub"], db)
    repos = await get_user_repo(github_user.access_token, search)
    return repos