import os
from google import genai
from dotenv import load_dotenv
load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

response = client.models.generate_content(
    model="gemini-2.0-flash-lite",
    contents=[
        "Write a short poem about the beauty of nature."
    ],
)

print(response.text)