from fastapi import APIRouter, Depends
from auth.dependencies import get_current_user
from database.session import get_db
from sqlalchemy.orm import Session

from services.github import get_github_connection
from services.user_service import get_or_create_user

router = APIRouter()


@router.get("/me")
def get_me(
    clerk_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = get_or_create_user(
        db=db,
        clerk_id=clerk_user["sub"]
    )

    return user