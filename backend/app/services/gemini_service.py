import json
import re

from google import genai
from google.genai import types
from dotenv import load_dotenv
from app.models import ChatMessage, ChatResponse

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

def get_key_products_from_description(description: str, products: str):
    prompt = f"""
     Determine what product is the most suited from the description:
     ONLY OUTPUT THE PICKED PRODUCTS IN THE SAME FORMAT THAT I GAVE YOU
     DONT INCLUDE ```json ```. DO NOT FORMAT IT  ONLY OUTPUT THE RAW JSON ARRAY.  NO BACKTICKS NO EXPLANATIONS
     
     {description}
     
     PRODUCTS:
     {products}
     """


    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt
    )
    print("FILTERED PRODUCTS \n\n\n")
    print(response.text)
    return response.text


def create_keywords_from_description(description: str):
    prompt = f"""
Extract 5–10 aesthetic keywords from this user description:

\"\"\"{description}\"\"\"

Return ONLY a JSON array of strings.
STRICT FORMAT:
["keyword1", "keyword2", "keyword3"]

DO NOT add explanations, markdown, backticks, or code fences.
Only output the raw JSON array.
"""

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json"
        )
    )

    raw_text = response.text.strip()

    # --- Safety cleanup in case it still includes unwanted text ---
    # Remove markdown code block fences
    raw_text = raw_text.replace("```json", "").replace("```", "").strip()

    # Extract JSON array using regex (handles cases where text has extra words)
    match = re.search(r'\[[\s\S]*\]', raw_text)
    if not match:
        print(f"DEBUG: Gemini raw response: {raw_text}")
        try:
            return json.loads(raw_text)
        except json.JSONDecodeError:
            raise ValueError(f"Gemini did not return valid JSON. Raw response: {raw_text}")

    json_text = match.group(0)

    try:
        return json.loads(json_text)
    except json.JSONDecodeError:
        raise ValueError(f"Gemini returned invalid JSON content. Raw: {json_text}")


def create_imagine_final_prompt(description: str, keywords: list, inventory_items: list):
    inventory_summary = summarize_inventory_items(description, inventory_items)

    system_prompt =f"""
   You are a style-to-catalog mapper. 
   Your job is to transform a user's aesthetic description into a DALL·E prompt that uses the characteristics of the provided product catalog.
   
   
   Description:  \"\"\"{description}\"\"\"
    
    Aesthetic keywords: {", ".join(keywords)}
    
    IMPORTANT:
    The generated prompt MUST visually match the style, colors, materials, and categories of the following real inventory items. 
    Use them as style anchors and visual constraints:
    
    {inventory_summary}
    
    Rules:
    - Do NOT invent new product styles that are not compatible with the inventory list.
    - Scene should look like it's composed of items from the inventory (even if not exactly identical).
    - Maintain consistent lighting, color tones, and materials from the inventory items.
    - Extract the main aesthetic keywords from the user's input.
    - Find the products in the catalog whose style/colors/materials match.
    - Build a descriptive scene that features items with shapes, colors, and materials similar to the catalog products.
    - Output ONLY the final DALL·E prompt.
    - The prompt MUST visually resemble the catalog items.
    """

    print(system_prompt)

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=system_prompt,
    )

    return response.text


def summarize_inventory_items(description: str, inventory_items: list):
    summaries = []
    for item in inventory_items:
        colors = ", ".join(item.get("colors", []))
        materials = ", ".join(item.get("materials", []))
        style = ", ".join(item.get("style", []))

        summary = (
            f"{item['name']} — "
            f"category: {item.get('category', 'N/A')}; "
            f"colors: {colors}; "
            f"materials: {materials}; "
            f"style: {style}."
        )
        summaries.append(summary)

    # get_key_products_from_description(description ,"\n".join(f"- {s}" for s in summaries))

    return "\n".join(f"- {s}" for s in summaries)