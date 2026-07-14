from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.routes import users, github
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Jinnie API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    users.router,
    prefix="/users"
)

app.include_router(
    github.router,
    prefix="/github"
)

@app.get("/")
def root():
    return {
        "message": "Jinnie API is running"
    }