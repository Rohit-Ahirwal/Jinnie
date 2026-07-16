from typing import Iterator

from langchain_core.messages import AIMessage
from langchain_google_genai import ChatGoogleGenerativeAI

from app.config import settings
from app.database.data_classes import AIResponse
from app.database.data_classes import StreamEvent


class GeminiService:
    def __init__(self):
        self.model = ChatGoogleGenerativeAI(
            model=settings.CHAT_MODEL,
            google_api_key=settings.GOOGLE_API_KEY,
            temperature=0
        )

    def generate(self, prompt: str):
        response: AIMessage = self.model.invoke(prompt)

        if isinstance(response.content, str):
            content = response.content

        elif isinstance(response.content, list):
            content = "".join(
                part["text"]
                for part in response.content
                if isinstance(part, dict)
                and part.get("type") == "text"
            )

        else:
            raise ValueError("Unsupported Gemini response format")

        usage = response.usage_metadata or {}

        token_count = (
                usage.get("total_token_count")
                or usage.get("total_tokens")
                or (
                        usage.get("prompt_token_count", 0)
                        + usage.get("candidates_token_count", 0)
                )
                or (
                        usage.get("input_tokens", 0)
                        + usage.get("output_tokens", 0)
                )
        )

        return AIResponse(
            content=content,
            token_count=token_count,
        )

    def stream(self, prompt: str) -> Iterator[str]:
        for chunk in self.model.stream(prompt):

            if not chunk.content:
                continue

            for part in chunk.content:

                if not isinstance(part, dict):
                    continue

                if part.get("type") != "text":
                    continue

                text = part.get("text")

                if text:
                    yield StreamEvent(
                        type="token",
                        content=text,
                    )
