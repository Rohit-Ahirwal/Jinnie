from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.database.models import RepositoryFile

import re


class KeywordExtractor:

    STOP_WORDS = {
        "how",
        "what",
        "where",
        "why",
        "when",
        "does",
        "is",
        "are",
        "the",
        "a",
        "an",
        "to",
        "of",
        "for",
        "in",
        "on",
        "with",
        "and",
        "used",
    }

    def extract(self, question: str) -> list[str]:

        words = re.findall(r"[A-Za-z_][A-Za-z0-9_]*", question)

        return [
            word
            for word in words
            if word.lower() not in self.STOP_WORDS
            and len(word) > 2
        ]

class RepositorySearchService:

    def keyword_search(
        self,
        db: Session,
        repository_id: int,
        keywords: list[str],
        limit: int = 20,
    ) -> list[RepositoryFile]:

        query = (
            db.query(RepositoryFile)
            .filter(
                RepositoryFile.repository_id == repository_id
            )
        )

        conditions = []

        for keyword in keywords:
            conditions.extend([
                RepositoryFile.filename.ilike(f"%{keyword}%"),
                RepositoryFile.path.ilike(f"%{keyword}%"),
                RepositoryFile.language.ilike(f"%{keyword}%"),
            ])

        if conditions:
            query = query.filter(or_(*conditions))

        return query.limit(limit).all()