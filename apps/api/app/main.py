from fastapi import FastAPI

app = FastAPI(
    title="Jinnie API"
)


@app.get("/")
def root():
    return {
        "message": "Jinnie API is running"
    }