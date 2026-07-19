from fastapi import HTTPException

from jose import jwt, JWTError

from app.config import settings
from app.auth.jwks_cache import get_jwks


async def verify_token(token: str):

    jwks = await get_jwks()


    try:

        header = jwt.get_unverified_header(token)

        key = next(
            (
                k
                for k in jwks["keys"]
                if k["kid"] == header["kid"]
            ),
            None,
        )

        if key is None:
            raise HTTPException(
                status_code=401,
                detail="Unknown signing key",
            )


        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            issuer=settings.CLERK_JWT_ISSUER,
            audience=settings.CLERK_JWT_AUDIENCE,

        )


        return payload


    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token"
        )