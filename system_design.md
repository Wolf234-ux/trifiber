# TriFiber Health — System Design Document (system_design.md)

## 1. Data Models & DB Schema Design

### Product Entity (`Product`)
```json
{
  "id": "trifiber-daily",
  "name": "TriFiber Daily",
  "subtitle": "3-in-1 Daily Multi-Fiber Drink",
  "flavor": "Lemon-Jeera",
  "pricing": {
    "INR": 1199,
    "USD": 29,
    "AED": 99
  },
  "servings": 30,
  "actives": [
    "Oat Beta-Glucan (Standardized)",
    "Resistant Starch & Soluble Fiber",
    "Prebiotic Acacia Fiber"
  ],
  "fssai_schedule": "Schedule VII",
  "stock": 500
}
```

### Batch Verification Entity (`BatchRecord`)
```json
{
  "batch_id": "TFH-2026-B001",
  "product_id": "trifiber-daily",
  "manufacture_date": "2026-07-15",
  "expiry_date": "2028-07-15",
  "active_assay": "Beta-Glucan 72.4% (Spec >= 70%)",
  "heavy_metals_pass": true,
  "microbial_pass": true,
  "cfu_count": "1.2 x 10^6 CFU/g",
  "coa_url": "/coa/TFH-2026-B001.pdf"
}
```

---

## 2. Core Functional Algorithms

### A. Metabolic Health Score Calculator
$$Score = 100 - (G \times 25 + C \times 20 + F \times 25 + S \times 30)$$
Where:
- $G$: Post-meal blood glucose fluctuation level (0.0 – 1.0)
- $C$: Afternoon sugar/carb craving frequency (0.0 – 1.0)
- $F$: Daily fiber deficit score (0.0 – 1.0)
- $S$: Satiety duration after meals (0.0 – 1.0)

**Output Categories**:
- `80 – 100`: Optimal Maintenance -> TriFiber Daily
- `50 – 79`: Moderate Fiber Deficit -> TriFiber Daily + Berberine Starter
- `< 50`: High Metabolic Imbalance -> TriFiber + Berberine Core Dual Bundle

### B. Regulatory Claims Rules Engine
- Rules database maps strict regulatory requirements by region:
  - **India (FSSAI)**: Allows "Helps maintain healthy digestion and blood sugar". Disallows disease treatment claims.
  - **US (FDA)**: Structure/function statements must carry mandatory DSHEA disclaimer. Disallows "Cures diabetes" or "Replaces Ozempic".
  - **EU (EFSA)**: Requires specific health claim authorization code.

---

## 3. UI Component Hierarchy

```
App Root
 ├── Navbar (Navigation, Currency Switcher, Cart Trigger)
 ├── Hero Banner ("Better Gut. Better Metabolism. Every Day.")
 ├── Product Section
 │    ├── Product Card 1: TriFiber Daily (Flavor selector, Sachet/Jar toggle, Add to Cart)
 │    └── Product Card 2: Berberine Balance (500mg Standardized, Add to Cart)
 ├── Metabolic Assessment Quiz (Interactive Modal & Real-time Score)
 ├── Quality & Transparency Portal (Batch QR Code Lookup Engine)
 ├── Auto-Marketing Campaign Suite (AI Angle Generator & Growth Metrics)
 ├── Cart Drawer (Item list, Subscription Discount Toggle, Checkout Simulator)
 └── Footer (FSSAI, FDA, Disclaimer, Links)
```
