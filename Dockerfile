# STAGE 1: Build Frontend React Web Application
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy frontend package manifest and install dependencies
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source files and build production dist
COPY frontend/ ./
RUN npm run build

# STAGE 2: Python FastAPI Backend Container
FROM python:3.11-slim AS runner
WORKDIR /app

# Prevent Python from writing bytecode and buffer stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=10000

# Install backend dependencies
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r ./backend/requirements.txt

# Copy backend code and static files
COPY backend/ ./backend/

# Copy built frontend production dist bundle into backend/static/dist
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist
COPY --from=frontend-builder /app/frontend/dist ./backend/static/dist

# Expose Render PORT
EXPOSE 10000

# Start Uvicorn web server dynamically listening on Render's assigned PORT
CMD ["sh", "-c", "python -m uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-10000}"]

