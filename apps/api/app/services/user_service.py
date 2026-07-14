from sqlalchemy.orm import Session
from database.models import User
from services.clerk_service import get_clerk_user
from services.github import get_github_connection


def get_or_create_user(
    db: Session,
    clerk_id: str
):

    user = (
        db.query(User)
        .filter(User.clerk_id == clerk_id)
        .first()
    )


    if user:
        github_connection = get_github_connection(clerk_id, db)
        if github_connection:
            return {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "github_connected": True,
                "connection": {
                    "username": github_connection.username,
                }
            }
        return {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "github_connected": False,
        }

    clerk_user = get_clerk_user(clerk_id)


    user = User(
        clerk_id=clerk_user['clerk_id'],
        email=clerk_user['email'],
        first_name=clerk_user['first_name'],
        last_name=clerk_user['last_name'],
        avatar_url=clerk_user['avatar_url'],
    )


    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "github_connected": False,
    }
