# from database import get_supabase
from app.services.gemini_service import create_keywords_from_description
from app.services.gemini_service import create_imagine_final_prompt


CATALOG = [
  {
    "name": "Ergonomic Office Chair",
    "category": "chair",
    "colors": ["white", "gray"],
    "materials": ["mesh", "plastic"],
    "style": ["minimalist", "modern"],
    "image_url": "https://merchant.com/chair001.jpg"
  },
  {
    "name": "Light Wood Study Desk",
    "category": "desk",
    "colors": ["light wood", "white"],
    "materials": ["oak", "laminate"],
    "style": ["scandinavian", "minimalist"],
    "image_url": "https://merchant.com/desk004.jpg"
  }
]



def imagine_prompt_builder(user_description: str):
    keywords = create_keywords_from_description(user_description)
    matched_items = match_catalog_items(keywords)

    return create_imagine_final_prompt(user_description, keywords, matched_items)





def match_catalog_items(user_keywords):
    matched = []
    for product in CATALOG:
        score = 0
        for kw in user_keywords:
            if kw in product["style"] or kw in product["colors"]:
                score += 1
        if score > 0:
            matched.append(product)
    return matched[:5]  # return top matches




