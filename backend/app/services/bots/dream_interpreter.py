from app.core.gemini import gemini

import json
from typing import List, Dict

class DreamInterpreter:
    def __init__(self):
        self.products = self._load_products()
    
    def _load_products(self) -> List[Dict]:
        """Load products from product_context.txt file (always relative to this script's directory)"""
        import os
        base_dir = os.path.dirname(os.path.abspath(__file__))
        context_path = os.path.join(base_dir, "product_context.txt")
        try:
            with open(context_path, "r", encoding="utf-8") as file:
                products_data = json.load(file)
                return products_data
        except FileNotFoundError:
            print(f"❌ {context_path} not found! Using empty list.")
            return []
        except json.JSONDecodeError:
            print(f"❌ Invalid JSON in {context_path}! Using empty list.")
            return []
    
    def identify_products(self, user_prompt: str) -> str:
        """
        Uses Gemini API to interpret the user's dream description and
        return a concise list of relevant product categories and specs.
        """
        # Convert products to context string
        products_context = "\n".join([
            f"- {p['name']} ({p['category']}): {p['description']} - {p['color']} - ₱{p['price']}"
            for p in self.products
        ])
        
        rules = (
            "You are a product identification expert for Home Credit Philippines. "
            "Your task is to extract SPECIFIC product categories and specifications from user dreams.\n\n"
            
            "AVAILABLE PRODUCTS:\n"
            f"{products_context}\n\n"
            
            "CRITICAL RULES:\n"
            "1. ONLY return a JSON array of product objects, NOTHING ELSE\n"
            "2. Each product MUST have: category, description, and specs\n"
            "3. Match user's dream with available products above\n"
            "4. Be SPECIFIC - 'gaming monitor' not just 'monitor', 'mechanical keyboard' not just 'keyboard'\n"
            "5. Include relevant specs: size for monitors, type for chairs, capacity for appliances\n"
            "6. MAXIMUM 5 products per dream\n"
            "7. If unclear, make reasonable assumptions based on common setups\n\n"
            
            "EXAMPLE OUTPUT FORMAT:\n"
            "[\n"
            "  {\"category\": \"monitor\", \"description\": \"gaming monitor\", \"specs\": \"24 inch, 144Hz\"},\n"
            "  {\"category\": \"keyboard\", \"description\": \"mechanical keyboard\", \"specs\": \"RGB backlight\"},\n"
            "  {\"category\": \"chair\", \"description\": \"gaming chair\", \"specs\": \"ergonomic, adjustable height\"}\n"
            "]\n"
        )

        contents = f"RULES: {rules}\n\nUSER PROMPT: {user_prompt}"

        response = gemini.models.generate_content(
            model="gemini-2.0-flash",
            contents=contents
        )
        return response.text