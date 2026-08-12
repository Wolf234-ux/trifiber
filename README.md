# TriFiber Health — Better Gut. Better Metabolism. Every Day.

TriFiber Health is an evidence-led everyday nutrition platform for gut and metabolic health in the post-GLP-1 era.

---

## 📁 Repository Structure

```
trifiber/
├── Dockerfile                # Multi-stage Docker build file (Node.js React build + Python FastAPI runner)
├── render.yaml               # Render Blueprint Infrastructure-as-Code specification file
├── backend/                  # FastAPI Python Backend Service
│   ├── main.py              # Application entry point & REST API routes
│   ├── requirements.txt      # Python dependencies (fastapi, uvicorn, pydantic)
│   └── static/              # Legacy HTML designs & static assets
├── frontend/                 # Vite + React 19 + Tailwind CSS Frontend Web App
│   ├── src/                 # Components, App layout, and styling
│   ├── public/              # Static public assets
│   ├── package.json         # NPM scripts and frontend dependencies
│   └── vite.config.js       # Vite build & API proxy configuration (/api -> :8000)
└── docs/                     # Architecture specs, system design, & pitch deck assets
```

---

## 🚀 Getting Started & Running the Project

### 1. Start the Backend API Server

Navigate to the project root and run:

```bash
python backend/main.py
```

*OR directly with Uvicorn:*

```bash
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
```

- **API Documentation (Swagger UI)**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **HTML Preview**: [http://127.0.0.1:8000/html-preview](http://127.0.0.1:8000/html-preview)

---

### 2. Start the Frontend Application

In a separate terminal window, start the React dev server:

```bash
cd frontend
npm run dev
```

*OR from root:*

```bash
npm --prefix frontend run dev
```

- **Frontend App URL**: [http://localhost:5173](http://localhost:5173)

---

## 🐳 Docker Local Container Build & Test

To test the containerized multi-stage production bundle locally before deploying to Render:

1. **Build the Docker Image**:
   ```bash
   docker build -t trifiber:latest .
   ```

2. **Run the Container**:
   ```bash
   docker run -p 10000:10000 trifiber:latest
   ```

3. Open **[http://localhost:10000](http://localhost:10000)** in your browser to verify that both the React application and FastAPI endpoints serve correctly.

---

## 🌐 Deploying Live on Render with Auto-Deployment

This repository is pre-configured for automated continuous deployment on [Render](https://render.com) using Docker.

### Method 1: Blueprint Deployment (Recommended — 1-Click Setup)

1. **Push Repository to GitHub / GitLab**:
   Ensure your latest code is pushed to a remote git repository (e.g. GitHub).
   ```bash
   git add .
   git commit -m "Configure Docker & Render deployment"
   git push origin main
   ```

2. **Log into Render**:
   Go to [dashboard.render.com](https://dashboard.render.com) and log in.

3. **Deploy via Blueprints**:
   - Click **New +** → select **Blueprint**.
   - Connect your GitHub repository (`trifiber`).
   - Render automatically parses `render.yaml` and provisions:
     - **Service Name**: `trifiber-health`
     - **Runtime**: Docker (`Dockerfile`)
     - **Auto-Deploy**: Enabled (`true`)
   - Click **Apply**.

---

### Method 2: Manual Web Service Setup

If you prefer to configure the Web Service manually on Render:

1. Click **New +** → select **Web Service**.
2. Select **Build and deploy from a Git repository** and pick your `trifiber` repository.
3. Configure the following service settings:
   - **Name**: `trifiber-health` (or your preferred name)
   - **Region**: Choose the closest region (e.g., Singapore, Oregon, Frankfurt)
   - **Branch**: `main`
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `./Dockerfile`
   - **Instance Type**: `Free` or `Starter`
4. Under **Advanced** settings:
   - Verify **Auto-Deploy** is set to **Yes**.
5. Click **Create Web Service**.

---

### 🔄 How Auto-Deployment Works

- Every time you push a new commit to your `main` branch (`git push origin main`), Render triggers a web-hook automatically.
- Render executes Stage 1 (Node.js Vite React compilation) and Stage 2 (Python FastAPI container packaging).
- Render deploys the updated container seamlessly with zero downtime once health checks pass.

---

## ⚡ API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Status & Service Health |
| `GET` | `/api/products` | Catalog of TriFiber products and active ingredients |
| `GET` | `/api/batch/{batch_id}` | CoA & Quality Assurance lab records by batch ID |
| `POST` | `/api/quiz` | Evaluate Metabolic Satiety Quiz & get tailored routine |
| `POST` | `/api/marketing/generate-campaign` | AI Marketing Campaign generator by persona |
| `POST` | `/api/claims/check` | Regulatory & FSSAI claim compliance validation |
| `POST` | `/api/checkout` | Order checkout & subscription processing simulation |

