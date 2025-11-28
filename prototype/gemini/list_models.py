from google import genai
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

print("Listing available image models...")
output_file = "available_image_models.txt"

try:
    with open(output_file, "w") as f:
        for model in client.models.list():
            methods = getattr(model, 'supported_generation_methods', []) or []
            
            if 'generateImages' in methods or 'image' in model.name.lower():
                output = f"Model Name: {model.name}\n"
                output += f"Display Name: {model.display_name}\n"
                output += f"Supported Methods: {methods}\n"
                output += "-" * 30 + "\n"
                
                print(output, end='')
                f.write(output)

    print(f"\nList saved to {output_file}")
except Exception as e:
    print(f"An error occurred while listing models: {e}")
