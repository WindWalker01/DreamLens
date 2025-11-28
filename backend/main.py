from fastapi import FastAPI, HTTPException
from models import ChatMessage, ChatResponse
from services.gemini_service import generate_content
from services.pollination_service import generate_image

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


@app.get("/chatbot/image/{prompt}")
async def generate_image_from_pollination(prompt: str):
    """
        Send a prompt to Pollination and returns the image link response from supabase
    """
    try:
        return generate_image(prompt)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error communicating with Pollination: {str(e)}"
        )