from datetime import datetime, UTC
from enum import Enum as _Enum

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, Enum, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase, relationship, Mapped, mapped_column


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC),
        nullable=False,
    )


class AnalysisStatus(str, _Enum):
    pending = "pending"
    cloning = "cloning"
    scanning = "scanning"
    syncing = "syncing"
    completed = "completed"
    failed = "failed"

class MessageRole(str, _Enum):
    user = "user"
    assistant = "assistant"
    system = "system"


class MessageStatus(str, _Enum):
    pending = "pending"
    streaming = "streaming"
    completed = "completed"
    failed = "failed"

class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    clerk_id = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    is_active = Column(Boolean, default=True)

    avatar_url = Column(
        String,
        nullable=True
    )

    first_name = Column(String)
    last_name = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    repositories = relationship(
        "Repositories",
        back_populates="user"
    )
    github_connection = relationship(
        "GithubConnection",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )


class GithubConnection(Base):
    __tablename__ = "github_connections"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        String,
        ForeignKey("users.clerk_id"),
        unique=True,
        nullable=False
    )

    github_id = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )

    username = Column(
        String,
        nullable=False
    )

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

    user = relationship(
        "User",
        back_populates="github_connection"
    )


class Repositories(Base):
    __tablename__ = "repositories"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "github_repo_id",
            name="unique_user_repository"
        ),
    )

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(String, ForeignKey("users.clerk_id"), nullable=False)

    github_repo_id = Column(String, nullable=False)

    repo_name = Column(String, nullable=False)

    repo_description = Column(Text, nullable=True)

    owner = Column(String, nullable=False)

    private = Column(Boolean, default=False)

    default_branch = Column(String, nullable=False)

    repo_url = Column(String, nullable=False)

    clone_url = Column(String, nullable=True)

    language = Column(String, nullable=False)

    stars = Column(Integer, nullable=False)

    issues = Column(Integer, nullable=False)

    progress = Column(Integer, default=0, nullable=False)
    status = Column(Enum(AnalysisStatus), nullable=False, default=AnalysisStatus.pending)

    analyzed_at = Column(DateTime, default=datetime.utcnow)
    last_synced_at = Column(DateTime, default=datetime.utcnow)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    user = relationship(
        "User",
        back_populates="repositories"
    )
    conversations = relationship(
        "Conversation",
        back_populates="repository",
        cascade="all, delete-orphan",
    )


class RepositoryFile(Base):
    __tablename__ = "repository_files"

    id = Column(Integer, primary_key=True)
    repository_id = Column(Integer, ForeignKey("repositories.id"), nullable=False)
    path = Column(String, nullable=False)
    filename = Column(String, nullable=False)
    extension = Column(String, nullable=False)
    language = Column(String, nullable=False)
    size = Column(Integer, nullable=False)
    hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

class Conversation(Base, TimestampMixin):
    __tablename__ = "conversations"

    id: Mapped[int] = mapped_column(primary_key=True)

    repository_id: Mapped[int] = mapped_column(
        ForeignKey("repositories.id", ondelete="CASCADE"),
        index=True,
        nullable=False
    )

    title: Mapped[str] = mapped_column(
        String(255),
        default="New Conversation",
    )

    repository = relationship(
        "Repositories",
        back_populates="conversations",
    )

    messages = relationship(
        "Message",
        back_populates="conversation",
        cascade="all, delete-orphan",
    )

class Message(Base, TimestampMixin):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(primary_key=True)

    conversation_id: Mapped[int] = mapped_column(
        ForeignKey("conversations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    role: Mapped[MessageRole] = mapped_column(
        Enum(MessageRole),
        nullable=False,
    )

    status: Mapped[MessageStatus] = mapped_column(
        Enum(MessageStatus),
        default=MessageStatus.completed,
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    token_count: Mapped[int] = mapped_column(
        default=0,
    )

    conversation = relationship(
        "Conversation",
        back_populates="messages",
    )