import requests
import io
from PIL import Image

# 1. Your settings
prompt = "A high-tech gaming PC setup featuring a large curved monitor displaying a vibrant game, RGB backlit keyboard and mouse, neon accents, a sleek black PC tower with internal RGB lighting, all arranged on a dark wood desk. The setup includes a comfortable gaming chair with RGB strips. Futuristic design elements and a dark, immersive atmosphere.\n"

# You MUST provide a public URL for your reference image
# reference_image_url = "https://media.istockphoto.com/id/521806786/photo/3d-rendering-of-empty-room-interior-white-brown-colors.jpg?s=612x612&w=0&k=20&c=njPof128FBEo4KjyC8ONDUPS0aBBkFEial5Uy8xoqdA="

# 2. Construct the URL with the correct parameters
# 'model': Specifies the model (try 'flux' or 'flux-realism' which covers context)
# 'image': The URL of your reference image
# 'nologo': Set to true to hide the Pollinations logo
base_url = f"https://image.pollinations.ai/prompt/{prompt}"
params = {
    "model": "flux",      # Flux is the engine behind Kontext/Pro
    # "image": reference_image_url, # <--- THIS is how you pass the reference
    "width": 1280,
    "height": 720,
    "nologo": "true",
    "seed": 6884105            # Optional: Keep this number same to reproduce results
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