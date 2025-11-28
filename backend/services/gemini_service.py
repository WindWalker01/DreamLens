from google import genai
from dotenv import load_dotenv
from models import ChatMessage, ChatResponse

# Load environment variables from .env file
load_dotenv()

# Initialize Gemini client (gets API key from GEMINI_API_KEY environment variable)
client = genai.Client()


def generate_content(chat_message: ChatMessage) -> ChatResponse:
    """
    Generate content using Gemini API
    
    Args:
        chat_message: ChatMessage model containing message and model name
        
    Returns:
        ChatResponse model containing the AI response and model used
        
    Raises:
        Exception: If there's an error communicating with Gemini API
    """
    # Generate response using the new SDK format
    response = client.models.generate_content(
        model=chat_message.model,
        contents=chat_message.message
    )
    
    return ChatResponse(
        response=response.text,
        model=chat_message.model
    )

