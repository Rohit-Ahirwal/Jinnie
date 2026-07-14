from sqlalchemy.orm import Session
from database.models import User
from services.clerk_service import get_clerk_user


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
        return {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "github_connected": user.github_connection is not None,
            "connection": {
                "username": user.github_connection.username,
            } if user.github_connection else None,
            "repositories": user.repositories,
        }


    clerk_user = get_clerk_user(clerk_id)


    user = User(
        clerk_id=clerk_user["clerk_id"],
        email=clerk_user["email"],
        first_name=clerk_user["first_name"],
        last_name=clerk_user["last_name"],
        avatar_url=clerk_user["avatar_url"],
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
        "connection": None,
        "repositories": user.repositories,
    }