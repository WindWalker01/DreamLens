from pydantic import BaseModel
from typing import Optional


class ChatMessage(BaseModel):
    message: str
    model: Optional[str] = "gemini-2.0-flash"


class ChatResponse(BaseModel):
    response: str
    model: str

