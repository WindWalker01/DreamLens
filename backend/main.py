from fastapi import FastAPI, HTTPException, Body
from models import ChatMessage, ChatResponse
from models.chat import ImageRequest, ImageResponse, DescriptionRequest
from services.gemini_service import generate_content
from services.pollination_service import generate_image

from services.gemini_service import create_keywords_from_description

from core.prompt_builder import imagine_prompt_builder

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.post("/chatbot/send", response_model=ChatResponse)
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


@app.post("/chatbot/imagine", response_model=ImageResponse)
async def generate_image_from_pollination(request: ImageRequest):
    """
        Send a prompt to Pollination and returns the image link response from supabase
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

@app.post("/test")
async def keywords_from_description(description: DescriptionRequest):
    return imagine_prompt_builder(description.prompt)
    # return description.prompt