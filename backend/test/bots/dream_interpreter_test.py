import os
import sys

# Ensure project root (backend) is on path when running directly
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.abspath(os.path.join(CURRENT_DIR, "..", ".."))
if BACKEND_DIR not in sys.path:
    sys.path.append(BACKEND_DIR)

from app.services.bots.dream_interpreter import DreamInterpreter


def main():
    interpreter = DreamInterpreter()
    prompt = (
        "I want a gaming setup with a high-refresh monitor, mechanical keyboard, "
        "ergonomic mouse, large desk, and a chair with lumbar support."
    )
    result = interpreter.identify_products(prompt)
    print("Identified Products and Specs:")
    print(result)


if __name__ == "__main__":
    main()
