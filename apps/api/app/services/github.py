import httpx
import os

from sqlalchemy.orm import Session
# from datetime import datetime, timedelta

from database.models import GithubConnection

GITHUB_API = "https://api.github.com"

async def exchangeCode(code: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://github.com/login/oauth/access_token",
            headers={
                "Accept": "application/json"
            },
            data={
                "client_id": os.getenv("GITHUB_CLIENT_ID"),
                "client_secret": os.getenv("GITHUB_CLIENT_SECRET"),
                "code": code,
                "redirect_uri": os.getenv("GITHUB_REDIRECT_URI")
            }
        )

        return response.json()

async def get_github_user(access_token: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://api.github.com/user",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/json"
            }
        )

        return response.json()

async def get_or_create_github_user(clerk_id: str, code: str, db: Session):
    # 1. Exchange Code
    token_data = await exchangeCode(code)
    access_token = token_data["access_token"]
    # expires_at = datetime.utcnow() + timedelta(
    #     seconds=token_data["expires_in"]
    # )

    # 2. Github Profile
    github_user = await get_github_user(access_token)

    # 3. Check existing user
    existing = (db.query(GithubConnection).filter(GithubConnection.user_id == clerk_id).first())

    if existing:
        existing.github_id = str(github_user["id"])
        existing.username = github_user["login"]
        existing.access_token = access_token
    else:
        connection = GithubConnection(
            user_id=clerk_id,
            access_token=access_token,
            github_id=str(github_user["id"]),
            username=github_user["login"],
            email=github_user["email"],
            # refresh_token=token_data.get("refresh_token"),
            # token_expires_at=expires_at,
        )

        db.add(connection)

    db.commit()

    return {
        "message": "Github connected successfully",
        "username": github_user["login"],
    }

def get_github_connection(user_id: str, db: Session):
    connection = db.query(GithubConnection).filter(GithubConnection.user_id == user_id).first()
    return connection

async def get_user_repo(access_token: str, search=None):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/vnd.github+json"
    }

    async with httpx.AsyncClient() as client:
        if search:
            url = f"{GITHUB_API}/search/repositories"

            params = {
                "q": f"{search} user:@me",
                "sort": "updated"
            }

        else:

            url = f"{GITHUB_API}/user/repos"

            params = {
                "sort": "updated",
                "per_page": 10
            }

        response = await client.get(
            url,
            headers=headers,
            params=params
        )

        response.raise_for_status()

        data = response.json()

        if search:
            return data["items"]

        return data
