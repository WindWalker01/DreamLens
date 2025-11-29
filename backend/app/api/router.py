from fastapi import APIRouter
from app.api.endpoints import default
from app.api.endpoints import chat
from app.api.endpoints import test


api_router = APIRouter()

api_router.include_router(default.router, tags=["Default"])
api_router.include_router(chat.router, prefix="/chat", tags=["Chat"])
api_router.include_router(test.router, prefix="/test", tags=["Test"])

