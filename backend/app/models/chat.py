from pydantic import BaseModel
from typing import Optional


class ChatMessage(BaseModel):
    message: str
    model: Optional[str] = "gemini-2.0-flash"


class ChatResponse(BaseModel):
    response: str
    model: str

class ImageRequest(BaseModel):
    prompt: str

class ImageResponse(BaseModel):
    image: str


class DescriptionRequest(BaseModel):
    prompt: str

class DescriptionResponse(BaseModel):
    response: str