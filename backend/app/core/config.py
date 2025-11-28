import os 
from typing import Optional
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Applications settings and configuration."""
    
    # Project Configuration
    PROJECT_NAME: str = "DreamLens API"
    PROJECT_DESCRIPTION: str = "Backend for Home Credit's DreamLens AI Feature"
    VERSION: str = "1.0.0"

    # CORS Configuration
    ALLOWED_ORIGINS: list = ["*"]

    # API Keys Configuration
    SUPABASE_URL: Optional[str] = os.getenv("SUPABASE_URL")
    SUPABASE_KEY: Optional[str] = os.getenv("SUPABASE_KEY")
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY")


# Global settings instance
settings = Settings()