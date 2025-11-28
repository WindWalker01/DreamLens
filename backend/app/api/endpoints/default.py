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
            "chatbot_send": "/chat/send",
            "chatbot_imagine": "/chat/imagine",
            "generate_image": "/test/generate-image",
            "cat_image": "/test/cat",
            "generate_cat": "/test/generate-cat",
            "test_keywords": "/test/prompt-builder",
            "hello": "/hello/{name}"
        },
        "timestamp": now,
    }


@router.get("/hello/{name}")
async def say_hello(name: str):
    """
    Simple hello world endpoint.
    """
    return {"message": f"Hello {name}"}
