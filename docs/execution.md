# TriFiber Health — Developer Execution Guide (execution.md)

## Quick Start & Running the Project

### Prerequisites
- Python 3.10+ (Python 3.14 installed)
- Node.js 18+ (Node v24 installed)
- npm or pnpm

---

## 1. Setting Up the Backend (Python FastAPI)

Navigate to the project root `c:\Users\saura\Downloads\trifiber`:

```bash
# 1. Install dependencies
pip install fastapi uvicorn pydantic jinja2

# 2. Run the FastAPI Server
python backend_server.py
# Server will start on http://127.0.0.1:8000
```

### Backend API Documentation
Once running, visit `http://127.0.0.1:8000/docs` to test interactive Swagger API endpoints.

---

## 2. Running the Full-Stack Application (Python FastAPI + React)

```bash
# 1. Install dependencies
pip install fastapi uvicorn pydantic jinja2

# 2. Start the Full-Stack TriFiber Application Server
python backend_server.py
# The application and API will be live on http://127.0.0.1:8000
```

---

## 3. Running HTML Preview Server

To serve `trifiber-health (V_1).html`:
```bash
python -m http.server 8080 --bind 127.0.0.1
# Open http://127.0.0.1:8080/trifiber-health%20(V_1).html in your browser
```

---

## 4. Environment Variables Configuration (`.env`)

```env
PORT=8000
HOST=127.0.0.1
DATABASE_URL=sqlite:///./trifiber.db
DEFAULT_CURRENCY=INR
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:8080
```
