# Refactoring Changes

## 1. Project Structure Restructuring

Moved the main application code into a dedicated `app` directory to improve organization and maintainability.

**Old Structure:**

```
backend/
├── api/
├── core/
├── database/
├── models/
├── services/
└── main.py
```

**New Structure:**

```
backend/
├── app/
│   ├── api/
│   │   ├── endpoints/
│   │   │   ├── chat.py
│   │   │   ├── default.py
│   │   │   └── test.py
│   │   ├── index.py
│   │   ├── router.py
│   │   └── __init__.py
│   ├── core/
│   ├── database/
│   ├── models/
│   ├── services/
│   ├── static/
│   │   └── tests/
│   │       └── cat.png
│   ├── main.py
│   └── __init__.py
├── REFACTOR.MD
└── requirements.txt
```

## 2. API Routing Refactoring

- **Centralized Routing**: Created `app/api/router.py` to manage all API routes.
- **Modular Endpoints**: Split monolithic `main.py` endpoints into separate modules within `app/api/endpoints/`:
  - `default.py`: Root endpoint, health checks, and general test routes.
  - `chat.py`: Chatbot interaction and image generation requests.
  - `test.py`: Image generation endpoints and static file serving.
- **Global Prefix**: No global `/api` prefix applied - routes are at root level.
- **Routing Configuration**:
  - `/` - Default router (root endpoint)
  - `/chat` - Chat endpoints (send messages, imagine)
  - `/test` - Test endpoints (image generation, cat image)

## 3. Endpoint Structure

### `app/api/endpoints/default.py`

- `GET /` - Root landing endpoint with service information and available endpoints list
- `GET /hello/{name}` - Simple hello world endpoint
- `POST /test` - Test endpoint to generate keywords from descriptions using Gemini

### `app/api/endpoints/chat.py`

- `POST /send` - Send message to Gemini API and get response
- `POST /imagine` - Send prompt to Pollination and get image URL

### `app/api/endpoints/test.py`

- `GET /cat` - Return static cat image from `app/static/tests/cat.png`
- `GET /generate-cat` - Generate a cute cat image and save to `static/generated_cat.jpg`
- `POST /generate-image` - Generate image from prompt and return base64 encoded data
- `POST /prompt-builder` - Test endpoint for prompt building from descriptions

## 4. Code Updates

- **Imports**: Updated all internal imports to use absolute paths starting with `app.` (e.g., `from app.core.config import settings`).
- **Database Connection**: Fixed `app/database/db.py` to correctly import from `app.core.config`.
- **Static Files**: Configured `StaticFiles` mounting in `app/main.py` to serve files from `static/` directory.
- **Vercel Compatibility**: Updated `app/api/index.py` to properly import the app from `app.main`.

## 5. Documentation

- Added helpful docstrings to all endpoints in `default.py`, `chat.py`, and `test.py` to describe their functionality.
- Each endpoint includes clear descriptions of what it does and what it returns.

## 6. Running the Application

**From `backend/` directory:**

```bash
uvicorn app.main:app --reload
```

**Available API Routes:**

- `GET /` - Root endpoint
- `GET /hello/{name}` - Hello endpoint
- `POST /test` - Test keywords endpoint
- `POST /chat/send` - Send message to chatbot
- `POST /chat/imagine` - Generate image from description
- `GET /test/cat` - Get cat image
- `GET /test/generate-cat` - Generate cat image
- `POST /test/generate-image` - Generate image from prompt
- `POST /test/prompt-builder` - Build prompt from description
