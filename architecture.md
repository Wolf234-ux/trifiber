# TriFiber Health — System Architecture (architecture.md)

## System Overview
The TriFiber Health platform is architected as a modern, decoupled full-stack application built for maximum speed, security, and exceptional user experience (UI/UX).

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT LAYER                                      |
|  React 18 D2C Web App (Vite) | Tailwind/CSS Utilities | Responsive UI/UX         |
+-----------------------------------------------------------------------------------+
                                         │  HTTPS / REST API
                                         ▼
+-----------------------------------------------------------------------------------+
|                                 API GATEWAY LAYER                                 |
|  FastAPI (Python 3.14) | CORS Middleware | Pydantic Schemas | Rate Limiter         |
+-----------------------------------------------------------------------------------+
                                         │
       +---------------------------------+---------------------------------+
       │                                 │                                 │
       ▼                                 ▼                                 ▼
+-----------------------+     +-----------------------+     +-----------------------+
|  Product & Cart Core  |     |  Batch QA / QR Engine |     | Auto-Marketing Engine |
|  - Pricing / Bundles  |     |  - COA verification   |     |  - Pitch Generator    |
|  - Checkout simulator |     |  - Batch tracking     |     |  - Lead capture       |
+-----------------------+     +-----------------------+     +-----------------------+
       │                                 │                                 │
       +---------------------------------+---------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|                                  DATA STORE                                       |
|  SQLite / PostgreSQL Database | JSON Schemas | In-Memory Caching                   |
+-----------------------------------------------------------------------------------+
```

---

## Technical Stack Selection

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Backend Core** | **Python 3.14 (FastAPI)** | High performance async I/O, automatic OpenAPI docs, native integration with analytical/AI libraries for claims engine. |
| **Frontend UI** | **React 18 (Standalone ES Modules)** | Blazing-fast page loads (<100ms TTFB), 0 build step overhead, instant browser execution, modular component architecture. |
| **Styling** | **Custom CSS Variables + Utility Classes** | High design fidelity, premium dark navy & parchment aesthetics (`#232B4C`, `#ECEFE3`, `#D9A02A`). |
| **State Management** | **React Hooks & Context API** | Reactive cart state, quiz state, and batch lookup modal without unnecessary overhead. |
| **Data Layer** | **SQLAlchemy / SQLite (FastAPI Pydantic)** | Lightweight, type-safe data modeling and persistence. |

---

## API Endpoints Architecture

### 1. Products & Commerce (`/api/products`)
- `GET /api/products` — Retrieve all SKUs with multi-currency pricing (INR, USD, AED).
- `GET /api/products/{id}` — Detailed SKU specifications & formulation breakdown.

### 2. Batch QA & QR Code Verification (`/api/batch`)
- `GET /api/batch/{batch_id}` — Query lab purity testing, heavy metal clearance, active concentration, and shelf-life stability.

### 3. Metabolic Assessment Quiz (`/api/quiz`)
- `POST /api/quiz/evaluate` — Processes user survey inputs (glucose stability, diet, satiety) and returns a metabolic assessment score with custom product bundle recommendations.

### 4. Auto-Marketing & Lead Engine (`/api/marketing`)
- `POST /api/marketing/generate-campaign` — Generates targeted marketing copy, email hooks, and social pitch scripts dynamically based on audience persona.
- `POST /api/marketing/leads` — Capture VIP waitlist and subscription leads.

### 5. Regulatory Claims Engine (`/api/regulatory`)
- `POST /api/regulatory/check-claim` — Evaluates proposed marketing text against FSSAI, FDA DSHEA, and EFSA regulatory compliance rules.
