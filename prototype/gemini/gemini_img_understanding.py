import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

my_file = client.files.upload(file="images/gaming.png")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[my_file, "List down all 5 major components/parts of products in this image."],
)

print(response.text)