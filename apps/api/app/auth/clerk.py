import os
import httpx

from jose import jwt, JWTError


CLERK_JWT_ISSUER = os.getenv(
    "CLERK_JWT_ISSUER"
)

CLERK_JWT_JWKS_URL = os.getenv(
    "CLERK_JWT_JWKS_URL"
)

async def verify_token(token: str):

    async with httpx.AsyncClient() as client:

        response = await client.get(
            CLERK_JWT_JWKS_URL
        )

        jwks = response.json()


    try:

        header = jwt.get_unverified_header(token)


        key = next(
            key for key in jwks["keys"]
            if key["kid"] == header["kid"]
        )


        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            issuer=CLERK_JWT_ISSUER
        )


        return payload


    except JWTError:

        raise Exception(
            "Invalid Clerk token"
        )