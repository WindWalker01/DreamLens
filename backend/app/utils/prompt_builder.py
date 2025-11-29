from app.database.db import get_all_products
from app.services.gemini_service import create_keywords_from_description
from app.services.gemini_service import create_imagine_final_prompt


CATALOG = get_all_products()



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




