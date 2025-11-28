import base64
import os
import httpx
from fastapi import APIRouter
from fastapi.responses import FileResponse
from app.models.chat import DescriptionRequest
from app.utils.prompt_builder import imagine_prompt_builder

router = APIRouter()


@router.get("/cat")
async def get_cat_image():
    """
    Return a static cat image.
    """
    return FileResponse("app/static/tests/cat.png")


@router.get("/generate-cat")
async def generate_cat_image():
    """
    Generate a cat image, save it to static folder, and return it.
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://image.pollinations.ai/prompt/a%20cute%20cat?model=flux&nologo=true"
        )
        
        # Save to static folder
        os.makedirs("app/static/cache", exist_ok=True)
        filepath = "app/static/cache/generated_cat.jpg"
        with open(filepath, "wb") as f:
            f.write(response.content)
        
        return FileResponse(filepath)


@router.post("/generate-image")
async def generate_image(prompt: str):
    """
    Generate an image from a prompt using Pollination AI and return the image.
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://image.pollinations.ai/prompt/{prompt}?model=flux&nologo=true"
        )
        
        os.makedirs("app/static/cache", exist_ok=True)
        filepath = "app/static/cache/generated_image.jpg"
        with open(filepath, "wb") as f:
            f.write(response.content)
        
        return FileResponse(filepath)


@router.post("/prompt-builder")
async def keywords_from_description(description: DescriptionRequest):
    """
    Test endpoint to generate keywords from a description using Gemini.
    """
    return imagine_prompt_builder(description.prompt)
