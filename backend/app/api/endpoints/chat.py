from fastapi import APIRouter, HTTPException
from app.models import ChatMessage, ChatResponse
from app.models.chat import ImageRequest, ImageResponse
from app.services.gemini_service import generate_content
from app.services.pollination_service import generate_image

router = APIRouter()

@router.post("/send", response_model=ChatResponse)
async def send_message(chat_message: ChatMessage):
    """
    Send a message to Gemini API and receive a response
    """
    try:
        return generate_content(chat_message)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error communicating with Gemini API: {str(e)}"
        )


@router.post("/imagine", response_model=ImageResponse)
async def generate_image_from_pollination(request: ImageRequest):
    """
    Send a prompt to Pollination and returns the image link response from supabase.
    """
    try:
        image_url = generate_image(request.prompt)
        if image_url == "error":
            raise HTTPException(status_code=500, detail="Failed to generate image from Pollination")
        return ImageResponse(image=image_url)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error communicating with Pollination: {str(e)}"
        )
