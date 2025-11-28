import os 
from typing import Optional
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Applications settings and configuration."""
    
    # Project Configuration
    PROJECT_NAME: str = "DREAMLENS API"
    PROJECT_DESCRIPTION: str = "Backend for Home Credit's DreamLens AI Feature"
    VERSION: str = "1.0.0"

    # CORS Configuration
    ALLOWED_ORIGINS: list = ["*"]

    # API Keys Configuration
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY")


# Global instance
settings = Settings()