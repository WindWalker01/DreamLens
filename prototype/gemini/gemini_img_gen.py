from google import genai
from google.genai import types
from PIL import Image
import os
from dotenv import load_dotenv
from pathlib import Path

# Load .env from backend directory (where it's typically located)
env_path = Path(__file__).parent.parent.parent / "backend" / ".env"
load_dotenv(env_path)

# Also try loading from current directory
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables. Please set it in your .env file.")

client = genai.Client(api_key=api_key)

prompt = (
    "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme"
)

response = client.models.generate_content(
    model="models/imagen-4.0-fast-generate-001",
    contents=[prompt],
)

for part in response.parts:
    if part.text is not None:
        print(part.text)
    elif part.inline_data is not None:
        image = part.as_image()
        image.save("generated_image.png")
        image.show()



