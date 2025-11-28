import requests
import io
from PIL import Image

# 1. Your settings
prompt = "Generate an image of a spacious and eclectic living room. In one area, a vibrant, low-profile, three-section foldable sofa bed in a compact sofa configuration is present. It is upholstered in a dynamic abstract pattern of vertically oriented, rounded, and varied-length 'bar' or 'brick' stripes in multiple shades of blue and teal, including navy, royal, sky blue, and aqua. Two matching square throw pillows with a horizontally oriented version of the same striped pattern rest on it. Adjacent, or in a central position, sits a rectangular, mid-century modern coffee table made of warm medium-brown wood. The tabletop has subtly grooved, stepped edges, and it stands on four slender, tapered legs that angle outwards. In another distinct area of the room, or forming a primary seating zone, there is a robust, L-shaped two-piece sectional sofa upholstered in a deep, textured chocolate brown fabric with a matte finish. Both backrests of the sectional are deeply button-tufted in a grid pattern. The left corner section has a high, gently rolled backrest, while the right section features a lower, straight backrest and a square armrest. The overall room should have soft, ambient lighting, with a mix of modern and traditional elements reflecting the diverse furniture styles."
# You MUST provide a public URL for your reference image
reference_image_url = "https://down-ph.img.susercontent.com/file/sg-11134201-7rdxh-m0leqk2mtoz497@resize_w900_nl.webp"

# 2. Construct the URL with the correct parameters
# 'model': Specifies the model (try 'flux' or 'flux-realism' which covers context)
# 'image': The URL of your reference image
# 'nologo': Set to true to hide the Pollinations logo
base_url = f"https://image.pollinations.ai/prompt/{prompt}"
params = {
    "model": "flux",      # Flux is the engine behind Kontext/Pro
    "image": reference_image_url, # <--- THIS is how you pass the reference
    "width": 1280,
    "height": 720,
    "nologo": "true",
    "seed": 577394            # Optional: Keep this number same to reproduce results
}

# 3. Request and Save
print(f"Generating with reference: {reference_image_url}...")
response = requests.get(base_url, params=params)

if response.status_code == 200:
    image = Image.open(io.BytesIO(response.content))
    image.save("kontext_result.png")
    print("Success! Saved as kontext_result.png")
else:
    print(f"Error {response.status_code}: {response.text}")