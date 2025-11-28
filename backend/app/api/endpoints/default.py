from datetime import datetime
from fastapi import APIRouter
from app.core.config import Settings

settings = Settings()
router = APIRouter()

@router.get("/")
async def root():
    """Root landing endpoint for API v1."""
    now = datetime.now().isoformat()
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "description": settings.PROJECT_DESCRIPTION,
        "documentation": "/docs",
        "endpoints": {
            "chatbot_send": "/api/chatbot/send",
            "chatbot_imagine": "/api/chatbot/imagine",
            "generate_image": "/api/generate-image",
            "cat_image": "/api/cat",
            "generate_cat": "/api/generate-cat",
            "test_keywords": "/api/test",
            "hello": "/api/hello/{name}"
        },
        "timestamp": now,
    }


@router.get("/hello/{name}")
async def say_hello(name: str):
    """
    Simple hello world endpoint.
    """
    return {"message": f"Hello {name}"}
