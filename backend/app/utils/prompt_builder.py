import json

from app.database.db import get_all_products
from app.services.gemini_service import create_keywords_from_description
from app.services.gemini_service import create_imagine_final_prompt
from app.services.gemini_service import get_key_products_from_description


CATALOG = get_all_products()


print(CATALOG)

def imagine_prompt_builder(user_description: str):
    keywords = create_keywords_from_description(user_description)
    matched_items = match_catalog_items(keywords)

    prompt = create_imagine_final_prompt(user_description, keywords, matched_items)

    guard_filtered_products = get_key_products_from_description(prompt, json.dumps(matched_items))

    return {"prompt": prompt, "keywords": keywords, "similar_products": json.loads(guard_filtered_products)}
    # return create_imagine_final_prompt(user_description, keywords, matched_items)


def match_catalog_items(user_keywords):
    matched = []

    for product in CATALOG:
        score = 0
        for kw in user_keywords:
            # We use .get() here to be safe if keys are missing,
            # though your original code used direct access.
            if kw in product.get("style", []) or kw in product.get("colors", []):
                score += 1

        if score > 0:
            # We append a tuple: (score, product)
            # This allows us to sort by the score later.
            matched.append((score, product))

    # Sort the list based on the score (index 0 of the tuple).
    # reverse=True ensures the highest numbers come first.
    matched.sort(key=lambda x: x[0], reverse=True)

    # Take the top 5 results
    top_5_with_scores = matched[:5]

    # Clean up the result: extract just the product dictionary
    # (removing the score helper) to return a clean list of products.
    final_result = [item[1] for item in top_5_with_scores]

    return final_result




