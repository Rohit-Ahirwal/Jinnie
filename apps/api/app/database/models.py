from datetime import datetime
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, Enum
from enum import Enum as _Enum

class AnalysisStatus(str, _Enum):
    pending = "pending"
    analyzing = "analyzing"
    completed = "completed"
    failed = "failed"

class Base(DeclarativeBase):
    pass

class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True
    )

    clerk_id = Column(
        String,
        unique=True
    )

    email = Column(
        String,
        unique=True
    )

    is_active = Column(Boolean, default=True)

    avatar_url = Column(
        String,
        unique=True,
        nullable=True
    )

    first_name = Column(String)
    last_name = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)

class GithubConnection(Base):
    __tablename__ = "github_connections"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        String,
        ForeignKey("users.clerk_id"),
        unique=True
    )

    github_id = Column(
        String,
        unique=True
    )

    username = Column(String, nullable=False)

    email = Column(
        String,
        nullable=True
    )

    access_token = Column(
        String,
        nullable=False
    )

    refresh_token = Column(
        String,
        nullable=True
    )

    token_expires_at = Column(
        DateTime,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

class Repositories(Base):
    __tablename__ = "repositories"
    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(String, ForeignKey("users.clerk_id"), unique=True)

    github_repo_id = Column(String, unique=True, nullable=False)

    repo_name = Column(String, nullable=False)

    repo_description = Column(Text, nullable=True)

    owner = Column(String, nullable=False)

    private = Column(Boolean, default=False)

    default_branch = Column(String, nullable=False)

    repo_url = Column(String, nullable=False)

    language = Column(String, nullable=False)

    stars = Column(Integer, nullable=False)

    issues = Column(Integer, nullable=False)

    progress = Column(Integer, default=0, nullable=False)
    status = Column(Enum(AnalysisStatus), nullable=False, default=AnalysisStatus.pending)

    analyzed_at = Column(DateTime, default=datetime.utcnow)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)