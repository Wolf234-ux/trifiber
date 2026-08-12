# TriFiber Health — System Changes & Deployment Changelog (`change.md`)

This document records the system architecture, infrastructure deployment, security audit protocols, and feature changes for the TriFiber Health platform.

---

## 1. 🌐 Production & Staging Infrastructure Setup

- **Multi-Stage Containerization (`Dockerfile`)**:
  - **Stage 1 (Frontend)**: `node:20-alpine` compiles Vite + React 19 production bundle (`dist`).
  - **Stage 2 (Backend)**: `python:3.11-slim` runs FastAPI backend with Uvicorn, serving API routes at `/api/*` and production SPA at `/`.
  - **Dynamic Port Binding**: `CMD ["sh", "-c", "python -m uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-10000}"]` dynamically binds to Render's assigned `$PORT`.

- **Render Blueprint Infrastructure-as-Code (`render.yaml`)**:
  - **Staging Service** (`trifiber-staging`): Auto-deployed from Git branch `staging`.
  - **Production Service** (`trifiber-health`): Auto-deployed from Git branch `main`.

---

## 2. 🛡️ Pre-Push Automated Security & UAT Protocol

- **Test Runner (`security_uat.py`)**:
  - Implemented automated pre-push security audit & integration test suite.
  - Enforces 4 mandatory verification checkpoints before any Git push:
    1. **Secret & Credentials Leak Scanner**: Prevents committing hardcoded API keys, private keys, or passwords.
    2. **Backend FastAPI Route UAT**: Tests all 7 API endpoints (`/`, `/docs`, `/api/products`, `/api/batch/...`, `/api/quiz`, `/api/claims/check`, `/api/checkout`).
    3. **Frontend React Build Audit**: Validates `npm run build` compilation without errors.
    4. **Docker & Render Infrastructure Audit**: Verifies `$PORT` binding and Blueprint spec.

- **Workspace Enforcement (`.agents/AGENTS.md`)**:
  - Added workspace protocol requiring execution of `python security_uat.py` prior to committing to `staging` or `main`.

---

## 3. 👑 Owner AI Suite & Private Access Gateway

- **Role-Based Access Control**:
  - Restricted the **AI Marketing Campaign Generator**, **FSSAI/FDA Regulatory Claims Verification Engine**, and **VIP Lead Community Analytics** exclusively to the website owner.
- **Clean Customer Storefront**:
  - Removed all visible "Owner Login" / "Admin Portal" buttons from public Navbar, Mobile Menu, and Footer.
- **Private Founder Trigger**:
  - Implemented URL query trigger (`?admin=true` or `?owner=true`).
  - Accessing `https://trifiber-health.onrender.com/?admin=true` opens [OwnerAuthModal.jsx](file:///c:/Users/saura/Downloads/trifiber/frontend/src/components/OwnerAuthModal.jsx).
  - Entering Master PIN `2026` unlocks the `👑 Owner AI Suite` tab.

---

## 4. 🔄 Master Deployment Workflow

1. **Development & Staging Test**:
   - Edits are committed on the `staging` branch.
   - Execute `python security_uat.py`.
   - Push to `staging`: `git push origin staging`.
   - Auto-deploys to **Render Staging** (`trifiber-staging`).

2. **Production Release**:
   - After UAT approval, merge `staging` into `main`.
   - Push to `main`: `git push origin main`.
   - Auto-deploys to **Render Production** (`trifiber-health`).
