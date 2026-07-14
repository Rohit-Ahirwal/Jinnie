from fastapi import FastAPI
from sqlalchemy.util.preloaded import import_prefix
from starlette.middleware.cors import CORSMiddleware

from database.models import Base
from database.connection import engine
from routes import users, github
from dotenv import load_dotenv

load_dotenv()

Base.metadata.create_all(bind=engine)

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