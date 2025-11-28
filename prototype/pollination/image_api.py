import requests
from urllib.parse import quote

# Your idea for the image
prompt = "A serene mountain landscape at sunrise"
# Encode the prompt to handle spaces
url = f"https://image.pollinations.ai/prompt/{quote(prompt)}"
# Customize the image size and model
params = {"width": 1280, "height": 720, "model": "flux", "nologo": "true"}

# Make the request
response = requests.get(url, params=params, timeout=60)
# Save the image to a file
with open("mountain.jpg", "wb") as f:
    f.write(response.content)

print("Image saved as mountain.jpg!")