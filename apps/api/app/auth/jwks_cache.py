import time

import httpx

from app.config import settings

_jwks = None
_expires_at = 0

CACHE_TTL = 60 * 60  # 1 hour


async def get_jwks():
    global _jwks, _expires_at

    now = time.time()

    if _jwks is not None and now < _expires_at:
        return _jwks

    async with httpx.AsyncClient() as client:
        response = await client.get(settings.CLERK_JWT_JWKS_URL)
        response.raise_for_status()

    _jwks = response.json()
    _expires_at = now + CACHE_TTL

    return _jwks
