import requests
import io
from PIL import Image

# 1. Your settings
prompt = "A minimalist living room featuring a light gray modern sectional sofa with clean lines and a light wood frame, similar to a minimalist cloud sofa. A slim console bar table in light wood and white metal stands against the wall. A modern white and oak sideboard provides storage. The room is bathed in soft, diffused natural light.\n"
# You MUST provide a public URL for your reference image
reference_img_url = "https://shoppingmall.homecredit.ph/dam/jcr:c47748d4-88be-4c1e-afef-311933e0c960/item-1-638671669976089761-g2d4uy.webp"
# 2. Construct the URL with the correct parameters
# 'model': Specifies the model (try 'flux' or 'flux-realism' which covers context)
# 'image': The URL of your reference image
# 'nologo': Set to true to hide the Pollinations logo
base_url = f"https://image.pollinations.ai/prompt/{prompt}"
params = {
    "model": "flux",      # Flux is the engine behind Kontext/Pro
    "image": reference_img_url, # <--- THIS is how you pass the reference
    "width": 1280,
    "height": 720,
    "nologo": "true",
    "seed": 688414            # Optional: Keep this number same to reproduce results
}

# 3. Request and Save
print(f"Generating with reference: ...")
response = requests.get(base_url, params=params)

if response.status_code == 200:
    image = Image.open(io.BytesIO(response.content))
    image.save("kontext_result.png")
    print("Success! Saved as kontext_result.png")
else:
    print(f"Error {response.status_code}: {response.text}")


# import json
# from supabase import create_client, Client
# from faker import Faker
# # ==========================================
# # 1. CONFIGURATION
# # ==========================================
#
# supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
# fake = Faker()
#
# # ==========================================
# # 2. MASTER PRODUCT LIST (18 Items)
# # ==========================================
# all_products = [
#     # --- BATCH 1 ---
#     {
#         "name": "Tactical Camo Gaming Chair (Grey)",
#         "category": "chair",
#         "colors": ["gray", "white", "camo"],
#         "materials": ["faux leather", "metal", "plastic"],
#         "style": ["gamer", "modern", "sporty"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:1bb9d553-9442-4be8-9c24-1677fe788fdc/item-1-638538476993112147-fsctv7.webp"
#     },
#     {
#         "name": "Tactical Camo Gaming Chair (Purple)",
#         "category": "chair",
#         "colors": ["black", "purple", "camo"],
#         "materials": ["faux leather", "metal", "plastic"],
#         "style": ["gamer", "modern", "sporty"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:2c72fea5-fe60-4e97-9457-2a0747896f40/item-1-638538471024618873-1akyiq.webp"
#     },
#     {
#         "name": "Classic Tufted Corner Sofa",
#         "category": "sofa",
#         "colors": ["brown", "coffee"],
#         "materials": ["fabric", "wood", "foam"],
#         "style": ["traditional", "mid-century", "classic"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:dd668766-61b7-40bd-8cc5-537905ce61df/item-1-638833060083721733-8fnjk8.webp"
#     },
#     {
#         "name": "Two-Tone Modular Lounge Set",
#         "category": "sofa",
#         "colors": ["cream", "brown", "beige"],
#         "materials": ["fabric", "foam", "wood"],
#         "style": ["contemporary", "retro", "minimalist"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:6d54ae77-fc46-49ea-b0f3-2e86f8849811/item-1-638833061575453570-ogroik.webp"
#     },
#     {
#         "name": "Multi-Tier Kitchen Utility Rack",
#         "category": "storage",
#         "colors": ["white", "oak", "light wood"],
#         "materials": ["metal", "laminate", "engineered wood"],
#         "style": ["industrial", "functional", "modern"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:be356a27-6716-4c68-bb30-26db87a91807/item-1-638566334154996783-m6u2zb.webp"
#     },
#     {
#         "name": "Modern L-Shape Sectional with Ottoman",
#         "category": "sofa",
#         "colors": ["gray", "slate"],
#         "materials": ["fabric", "metal", "foam"],
#         "style": ["modern", "minimalist", "scandinavian"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:c47748d4-88be-4c1e-afef-311933e0c960/item-1-638671669976089761-g2d4uy.webp"
#     },
#
#     # --- BATCH 2 ---
#     {
#         "name": "Minimalist Cloud Sofa (2-Seater)",
#         "category": "sofa",
#         "colors": ["white", "light gray"],
#         "materials": ["velvet", "wood"],
#         "style": ["minimalist", "scandinavian", "modern"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:21ace02e-8444-4010-b51a-29570e69e117/item-1-638676550282843082-5af1j6.webp"
#     },
#     {
#         "name": "Rustic Dining Set for Two",
#         "category": "table",
#         "colors": ["dark brown", "gray"],
#         "materials": ["wood", "fabric"],
#         "style": ["rustic", "traditional", "compact"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:f2cb7454-3f24-4546-84a7-4a28b6178341/item-1-638676549727848466-k18i0c.webp"
#     },
#     {
#         "name": "Geometric Folding Sofa Bed",
#         "category": "sofa",
#         "colors": ["charcoal", "gray", "white"],
#         "materials": ["foam", "fabric"],
#         "style": ["modern", "geometric", "functional"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:cd840d37-2f37-4360-98a8-42ea96412d15/item-1-638865923190518760-wqpatx.webp"
#     },
#     {
#         "name": "Slim Console Bar Table",
#         "category": "table",
#         "colors": ["light wood", "white"],
#         "materials": ["wood", "metal"],
#         "style": ["minimalist", "modern", "utility"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:feb11fdc-355a-42bb-b7ea-0c04284a0fc0/item-1-638877116109273181-s3hz0c.webp"
#     },
#     {
#         "name": "Orthopedic Premium Mattress",
#         "category": "mattress",
#         "colors": ["white", "black"],
#         "materials": ["foam", "fabric", "spring"],
#         "style": ["modern", "essential"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:a79f13b2-f5f7-42f2-ac83-48f34648e4b0/item-1-638445299037451557-qycx2z.webp"
#     },
#     {
#         "name": "Modern Two-Tone Sectional",
#         "category": "sofa",
#         "colors": ["gray", "black"],
#         "materials": ["fabric", "faux leather", "foam"],
#         "style": ["modern", "contemporary", "large"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:f86ed9fa-f26c-4820-90d0-47e490619bc3/item-1-638833060627010639-1gc71y.webp"
#     },
#     {
#         "name": "Ergo-Mesh Office Chair with Leg Rest",
#         "category": "chair",
#         "colors": ["gray", "white"],
#         "materials": ["mesh", "plastic", "metal"],
#         "style": ["ergonomic", "modern", "office"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:6e1fe061-14ff-4390-9709-6c71e2650b83/item-1-638877116545741080-aalbxk.webp"
#     },
#     {
#         "name": "Fabric Series Racing Chair",
#         "category": "chair",
#         "colors": ["light gray", "black"],
#         "materials": ["fabric", "plastic", "metal"],
#         "style": ["gamer", "sporty", "breathable"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:f78f7877-31bf-4fce-9263-65fc3c0cdb2a/item-1-638628470428202212-f747ge.webp"
#     },
#     {
#         "name": "Asymmetrical Display Shelf",
#         "category": "storage",
#         "colors": ["dark brown", "espresso"],
#         "materials": ["wood", "laminate"],
#         "style": ["modern", "geometric", "artistic"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:9c76b1ed-d217-4fa8-98fb-544edfd4eb3f/item-1-638871009704896941-jxj4bn.webp"
#     },
#     {
#         "name": "Classic Tufted Living Room Set",
#         "category": "sofa",
#         "colors": ["light blue", "gray"],
#         "materials": ["fabric", "wood"],
#         "style": ["classic", "traditional", "retro"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:f8b7edd6-013c-4544-85e9-03f9ee3f8647/item-1-638672360632250668-600q69.webp"
#     },
#
#     # --- BATCH 3 ---
#     {
#         "name": "Modern White & Oak Sideboard",
#         "category": "storage",
#         "colors": ["white", "light wood", "oak"],
#         "materials": ["wood", "laminate", "particle board"],
#         "style": ["scandinavian", "minimalist", "modern"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:0ecadf67-5000-4c94-a4b3-6127f2c1c729/item-1-638870986798170891-o37e5t.webp"
#     },
#     {
#         "name": "Dragon War Z-Leg Gaming Desk",
#         "category": "desk",
#         "colors": ["black", "orange"],
#         "materials": ["metal", "carbon fiber", "plastic"],
#         "style": ["gamer", "industrial", "sporty"],
#         "img_url": "https://shoppingmall.homecredit.ph/dam/jcr:7fc5cc46-4e40-4e55-a083-19e037cd8a4c/item-1-638636092275709307-m7z92s.webp"
#     }
# ]
#
#
# # ==========================================
# # 3. UPLOAD FUNCTION
# # ==========================================
# def seed_all_products():
#     print(f"🚀 Starting upload for {len(all_products)} products...")
#     success_count = 0
#
#     for product in all_products:
#         # Construct payload for the SQL function
#         payload = {
#             "p_id": fake.uuid4(),
#             "p_name": product["name"],
#             "p_category": product["category"],
#             "p_image_url": product["img_url"],
#             "p_colors": product["colors"],
#             "p_materials": product["materials"],
#             "p_styles": product["style"]
#         }
#
#         try:
#             # Call RPC function
#             supabase.rpc('insert_full_product', payload).execute()
#             print(f"✅ Inserted: {product['name']}")
#             success_count += 1
#         except Exception as e:
#             print(f"❌ Error inserting {product['name']}: {e}")
#
#     print("------------------------------------------------")
#     print(f"🎉 Finished! Successfully inserted {success_count}/{len(all_products)} items.")
#
#
# if __name__ == "__main__":
#     seed_all_products()