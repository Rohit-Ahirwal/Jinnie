import time
from collections import deque

from app.config import settings


class RateLimiterService:

    def __init__(self):
        self.requests = deque()

    def acquire(self, tokens: int):
        while True:
            now = time.time()

            # Remove requests older than 60 seconds
            while self.requests and now - self.requests[0][0] >= 60:
                self.requests.popleft()

            current_rpm = len(self.requests)
            current_tpm = sum(token_count for _, token_count in self.requests)

            rpm_available = current_rpm < settings.EMBED_MAX_RPM
            tpm_available = (current_tpm + tokens) <= settings.EMBED_MAX_TPM

            if rpm_available and tpm_available:
                self.requests.append((now, tokens))
                return

            sleep_for = 60 - (now - self.requests[0][0])

            if sleep_for > 0:
                time.sleep(sleep_for)

rate_limiter = RateLimiterService()