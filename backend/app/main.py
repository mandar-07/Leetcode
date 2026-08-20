from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.models.user import User
from app.api.auth import router as auth_router
from app.models.problem import Problem
from app.api.problems import router as problems_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="LeetCode Clone API")
app.include_router(problems_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "Backend is running 🚀"
    }