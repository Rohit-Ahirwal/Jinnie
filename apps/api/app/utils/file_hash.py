from hashlib import sha256
from pathlib import Path


def calculate_file_hash(path: Path) -> str:
    hasher = sha256()

    with path.open("rb") as file:
        while chunk := file.read(8192):
            hasher.update(chunk)

    return hasher.hexdigest()