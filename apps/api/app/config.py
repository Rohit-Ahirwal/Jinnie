from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    CLERK_JWT_ISSUER: str
    CLERK_JWT_JWKS_URL: str
    CLERK_SECRET_KEY: str
    GITHUB_CLIENT_ID: str
    GITHUB_CLIENT_SECRET: str
    GITHUB_REDIRECT_URI: str
    DATABASE_URL: str
    GOOGLE_API_KEY: str
    REDIS_URL: str
    QDRANT_URL: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()