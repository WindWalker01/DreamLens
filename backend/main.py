from fastapi import FastAPI, HTTPException
from models import ChatMessage, ChatResponse
from services.gemini_service import generate_content

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
