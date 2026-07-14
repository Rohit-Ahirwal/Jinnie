from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

from .clerk import verify_token


security = HTTPBearer()


async def get_current_user(
    credentials=Depends(security)
):

    token = credentials.credentials


    try:

        user = await verify_token(
            token
        )

        return user


    except Exception:

        raise HTTPException(
            status_code=401,
            detail="Invalid authentication"
        )