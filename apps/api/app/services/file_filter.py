IGNORE_DIRS = {
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "coverage"
}


IGNORE_FILES = {
    ".env",
    "package-lock.json",
    "yarn.lock"
}


ALLOWED_EXTENSIONS = {
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".java",
    ".cpp",
    ".go",
    ".rs",
    ".md",
    ".json"
}


def should_analyze(path: str):

    parts = path.split("/")

    for part in parts:
        if part in IGNORE_DIRS:
            return False


    filename = parts[-1]


    if filename in IGNORE_FILES:
        return False


    extension = "." + filename.split(".")[-1]

    return extension in ALLOWED_EXTENSIONS