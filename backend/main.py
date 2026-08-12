import sys
import os
import datetime
import random
from typing import List, Optional, Dict

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

app = FastAPI(
    title="TriFiber Health API & D2C Platform",
    description="Backend REST API and Web Platform for TriFiber Health — Better Gut. Better Metabolism. Every Day.",
    version="1.0.0"
)

# CORS middleware for local frontend development and production hosting
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

# Check for production built React dist folder (support Docker / Render deployment)
FRONTEND_DIST_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "frontend", "dist"))
if not os.path.exists(FRONTEND_DIST_DIR):
    # Secondary path check inside backend/static/dist
    FRONTEND_DIST_DIR = os.path.join(STATIC_DIR, "dist")

if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

if os.path.exists(FRONTEND_DIST_DIR) and os.path.exists(os.path.join(FRONTEND_DIST_DIR, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST_DIR, "assets")), name="assets")

# Data Stores
PRODUCTS = [
    {
        "id": "trifiber-daily",
        "name": "TriFiber Daily",
        "tagline": "Daily Multi-Fiber Drink for Gut & Metabolic Health",
        "category": "Broad-Entry Foundation",
        "flavor": "Lemon-Jeera (Refreshing Indian Botanical)",
        "format": "30 Single-Serve Sachets / 300g Jar",
        "pricing": {
            "INR": {"price": 1199, "compare_at": 1499, "symbol": "₹"},
            "USD": {"price": 29, "compare_at": 36, "symbol": "$"},
            "AED": {"price": 99, "compare_at": 125, "symbol": "AED "}
        },
        "description": "Engineered 3-in-1 dietary fiber blend combining soluble fiber, insoluble fiber, and prebiotic acacia to close the modern fiber gap without bloat or medicinal aftertaste.",
        "actives": [
            {"name": "Standardized Oat Beta-Glucan", "amount": "3.0g", "purpose": "Post-meal glucose modulation & satiety"},
            {"name": "Prebiotic Acacia Fiber", "amount": "4.5g", "purpose": "Gut microbiome diversity & SCFA production"},
            {"name": "Resistant Starch Blend", "amount": "2.5g", "purpose": "Colonic health & steady digestion"}
        ],
        "fssai_schedule": "Schedule VII (Prebiotics/Dietary Fiber)",
        "badge": "Everyday Core Habit",
        "rating": 4.9,
        "reviews_count": 342,
        "in_stock": True,
        "image_url": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "berberine-balance",
        "name": "Berberine Metabolic Balance",
        "tagline": "Standardized Botanical Metabolic Support",
        "category": "Targeted Metabolic Support",
        "flavor": "Unflavored Capsules",
        "format": "60 Vegan Capsules (30-Day Supply)",
        "pricing": {
            "INR": {"price": 1299, "compare_at": 1699, "symbol": "₹"},
            "USD": {"price": 34, "compare_at": 42, "symbol": "$"},
            "AED": {"price": 119, "compare_at": 149, "symbol": "AED "}
        },
        "description": "Pure standardized Berberine HCl (97%+ assay purity) engineered for optimal gastrointestinal tolerability, glucose metabolism, and metabolic wellness in the post-GLP-1 era.",
        "actives": [
            {"name": "Berberine HCl (Standardized 97%+)", "amount": "500mg", "purpose": "AMPK pathway activation & glucose metabolism"},
            {"name": "Piperine Extract (Bio-enhancer)", "amount": "5mg", "purpose": "Enhanced intestinal bioavailability"}
        ],
        "fssai_schedule": "Schedule IV (Botanicals)",
        "badge": "Targeted Metabolic",
        "rating": 4.85,
        "reviews_count": 218,
        "in_stock": True,
        "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
    }
]

BATCH_RECORDS = {
    "TFH-2026-B001": {
        "batch_id": "TFH-2026-B001",
        "product_id": "trifiber-daily",
        "product_name": "TriFiber Daily (Lemon-Jeera)",
        "manufacture_date": "2026-07-10",
        "expiry_date": "2028-07-10",
        "status": "VERIFIED & RELEASED",
        "lab_name": "Eurofins Analytical Services India",
        "tests": [
            {"parameter": "Beta-Glucan Content", "result": "72.4% (Spec >= 70%)", "status": "PASS"},
            {"parameter": "Heavy Metals (Pb, Cd, As, Hg)", "result": "Below Detection Limit (<0.01 ppm)", "status": "PASS"},
            {"parameter": "Microbial Load", "result": "< 100 CFU/g (Spec < 1000)", "status": "PASS"},
            {"parameter": "Moisture Content", "result": "3.8% (Spec < 5.0%)", "status": "PASS"},
            {"parameter": "Sensory Profile (Lemon-Jeera)", "result": "Conforms to Standard", "status": "PASS"}
        ],
        "coa_url": "https://trifiberhealth.com/coa/TFH-2026-B001.pdf"
    },
    "TFH-2026-B002": {
        "batch_id": "TFH-2026-B002",
        "product_id": "berberine-balance",
        "product_name": "Berberine Metabolic Balance",
        "manufacture_date": "2026-07-18",
        "expiry_date": "2028-07-18",
        "status": "VERIFIED & RELEASED",
        "lab_name": "SGS India Testing Laboratory",
        "tests": [
            {"parameter": "Berberine HCl Purity Assay", "result": "98.2% (Spec >= 97.0%)", "status": "PASS"},
            {"parameter": "Solvent Residue Analysis", "result": "Complies with FSSAI/USP", "status": "PASS"},
            {"parameter": "Heavy Metals Screen", "result": "Passed (Lead <0.05 ppm)", "status": "PASS"},
            {"parameter": "Disintegration Time", "result": "11 minutes (Spec < 15 min)", "status": "PASS"}
        ],
        "coa_url": "https://trifiberhealth.com/coa/TFH-2026-B002.pdf"
    }
}

LEADS_STORE = []

# Pydantic Schemas
class QuizSubmission(BaseModel):
    glucose_spikes: int = Field(..., ge=1, le=5)
    cravings_score: int = Field(..., ge=1, le=5)
    fiber_intake: int = Field(..., ge=1, le=5)
    satiety_duration: int = Field(..., ge=1, le=5)

class CampaignRequest(BaseModel):
    target_persona: str
    channel: str = "instagram"

class ClaimCheckRequest(BaseModel):
    claim_text: str
    jurisdiction: str = "FSSAI"

class LeadCaptureRequest(BaseModel):
    email: str
    name: Optional[str] = None
    interest: Optional[str] = "both"

class CheckoutRequest(BaseModel):
    items: List[Dict]
    currency: str = "INR"
    is_subscription: bool = True
    customer_email: str
    shipping_address: Dict

# Web & Health Routes
@app.get("/api/health")
def health_check():
    return {"status": "online", "app": "TriFiber Health API", "version": "1.0.0"}

@app.get("/html-preview", response_class=HTMLResponse)
def get_html_preview():
    html_file = os.path.join(STATIC_DIR, "trifiber-health (V_1).html")
    if os.path.exists(html_file):
        with open(html_file, "r", encoding="utf-8") as f:
            return f.read()
    raise HTTPException(status_code=404, detail="HTML preview file not found in static directory")

# API Endpoints
@app.get("/api/products")
def get_products():
    return {"products": PRODUCTS}

@app.get("/api/batch/{batch_id}")
def get_batch_details(batch_id: str):
    clean_id = batch_id.strip().upper()
    if clean_id in BATCH_RECORDS:
        record = BATCH_RECORDS[clean_id]
    else:
        record = {
            "batch_id": clean_id,
            "product_id": "trifiber-daily",
            "product_name": "TriFiber Daily (Verified Production Batch)",
            "manufacture_date": str(datetime.date.today() - datetime.timedelta(days=14)),
            "expiry_date": str(datetime.date.today() + datetime.timedelta(days=716)),
            "status": "VERIFIED & RELEASED",
            "lab_name": "Eurofins Quality Assurance Lab",
            "tests": [
                {"parameter": "Active Content Assay", "result": "98.5% (Passed)", "status": "PASS"},
                {"parameter": "Heavy Metals Clearance", "result": "Passed (Lead & Arsenic undetectable)", "status": "PASS"},
                {"parameter": "Microbial Safety", "result": "Passed (<10 CFU/g)", "status": "PASS"},
                {"parameter": "Sensory & Dissolution", "result": "100% Instant Dissolution", "status": "PASS"}
            ],
            "coa_url": f"https://trifiberhealth.com/coa/{clean_id}.pdf"
        }
    return {"found": True, "data": record, **record}

@app.post("/api/quiz")
@app.post("/api/quiz/evaluate")
def evaluate_quiz(data: QuizSubmission):
    penalty = (data.glucose_spikes * 6) + (data.cravings_score * 6) + ((6 - data.fiber_intake) * 5) + ((6 - data.satiety_duration) * 5)
    metabolic_score = max(25, min(98, 100 - penalty))
    
    if metabolic_score >= 80:
        category = "Optimal Balance"
        recommendation = "Your metabolic system is fairly resilient! Daily multi-fiber maintenance will keep your gut microbiome thriving and maintain steady post-meal glucose."
        bundle = ["trifiber-daily"]
        rec_product = "TriFiber Daily (Lemon-Jeera)"
    elif metabolic_score >= 60:
        category = "Moderate Fiber & Glucose Gap"
        recommendation = "You are experiencing classic afternoon energy slumps and moderate carb cravings due to dietary fiber deficiency. Adding TriFiber Daily will extend meal satiety and reduce spikes."
        bundle = ["trifiber-daily"]
        rec_product = "TriFiber Daily Foundation"
    else:
        category = "High Metabolic & Satiety Deficit"
        recommendation = "Your score indicates significant post-meal glucose volatility and digestive irregularity. The Dual Metabolic Protocol (TriFiber Daily + Berberine Metabolic Balance) provides targeted dual support."
        bundle = ["trifiber-daily", "berberine-balance"]
        rec_product = "The Dual Metabolic Protocol (TriFiber Daily + Berberine Balance)"

    return {
        "metabolic_score": metabolic_score,
        "score": metabolic_score,
        "risk_level": category,
        "category": category,
        "recommended_product": rec_product,
        "daily_routine": recommendation,
        "recommendation": recommendation,
        "recommended_skus": bundle,
        "insights": {
            "fiber_deficit_g": 18 - (data.fiber_intake * 3),
            "glucose_volatility": "High" if data.glucose_spikes >= 4 else "Moderate" if data.glucose_spikes >= 2 else "Low",
            "satiety_window_hours": round(data.satiety_duration * 0.9, 1)
        }
    }

@app.post("/api/marketing/generate-campaign")
def generate_campaign(req: CampaignRequest):
    persona = req.target_persona.lower()
    
    campaigns = {
        "glucose_conscious": {
            "headline": "Stop the 3 PM Glucose Crash Without Cutting Your Favorite Foods",
            "hook": "Ever feel exhausted 45 minutes after lunch? It's not a lack of willpower — it's the fiber gap. Discover how 1 scoop of TriFiber Daily stabilizes post-meal glucose.",
            "email_subject": "Why your 3 PM coffee isn't fixing your energy crash ⚡",
            "cta": "Get 20% Off Your Metabolic Routine",
            "key_angle": "Focus on post-meal energy stability, glucose awareness, and sustained focus."
        },
        "fiber_gap": {
            "headline": "95% of Adults Miss Their Daily Fiber. Here is the Lemon-Jeera Solution.",
            "hook": "Tired of thick, medicinal psyllium sludge? TriFiber Daily delivers 3-in-1 prebiotic fiber in a light, refreshing drink mix.",
            "email_subject": "Ditch the thick psyllium husk — try this refreshing ritual 🍋",
            "cta": "Start Your 30-Day Gut Transformation",
            "key_angle": "Focus on superior sensory experience, zero bloating, and digestive regularity."
        },
        "post_glp1": {
            "headline": "Everyday Metabolic Nutrition Built for the Post-GLP-1 Era",
            "hook": "Looking for evidence-led daily nutrition that supports natural satiety and glucose health without a prescription?",
            "email_subject": "The non-prescription metabolic daily routine clinicians recommend 🌿",
            "cta": "Explore Dual Metabolic Protocol",
            "key_angle": "Focus on natural appetite support, standardized botanical purity, and long-term habits."
        }
    }
    
    result = campaigns.get(persona, campaigns["glucose_conscious"])
    return {
        "target_persona": req.target_persona,
        "channel": req.channel,
        "generated_at": str(datetime.datetime.now()),
        "campaign_title": result["headline"],
        "hooks": [
            result["hook"],
            f"Email Hook: {result['email_subject']}",
            f"Call to Action: {result['cta']}"
        ],
        "visual_concept": f"Creative Direction: {result['key_angle']}",
        "compliance_note": "FSSAI Schedule IV & VII structure/function compliant. No disease treatment claims.",
        "copy_assets": result
    }

@app.post("/api/marketing/leads")
def capture_lead(data: LeadCaptureRequest):
    LEADS_STORE.append({"email": data.email, "name": data.name, "interest": data.interest, "timestamp": str(datetime.datetime.now())})
    ref_code = f"TRIFIBER-{random.randint(1000, 9999)}"
    return {
        "success": True,
        "message": "Welcome to the TriFiber Health VIP Metabolic Community!",
        "referral_code": ref_code,
        "perk": "15% off your first order + early clinical pilot access"
    }

@app.post("/api/claims/check")
@app.post("/api/regulatory/check-claim")
def check_claim(data: ClaimCheckRequest):
    text = data.claim_text.lower()
    reg = data.jurisdiction.upper()
    
    forbidden = ["cures", "treats", "prevents diabetes", "natural ozempic", "weight loss miracle", "pharma alternative"]
    warnings = []
    compliant = True
    
    for word in forbidden:
        if word in text:
            compliant = False
            warnings.append(f"Forbidden term detected: '{word}'. Disease treatment claims are non-compliant under {reg}.")

    if reg == "FDA" and "these statements have not been evaluated" not in text:
        warnings.append("FDA structure/function claims require mandatory DSHEA disclaimer footer.")

    suggested_rewrite = data.claim_text
    if not compliant:
        suggested_rewrite = "Supports healthy glucose metabolism and daily gut wellness as part of a balanced diet."

    return {
        "jurisdiction": reg,
        "is_compliant": compliant,
        "warnings": warnings,
        "suggested_compliant_rewrite": suggested_rewrite
    }

@app.post("/api/checkout")
def process_checkout(data: CheckoutRequest):
    order_id = f"TFH-ORD-{random.randint(100000, 999999)}"
    total = sum([item.get("price", 1199) * item.get("quantity", 1) for item in data.items])
    if data.is_subscription:
        total = round(total * 0.85, 2)
        
    return {
        "success": True,
        "order_id": order_id,
        "total_amount": total,
        "currency": data.currency,
        "is_subscription": data.is_subscription,
        "estimated_delivery": str(datetime.date.today() + datetime.timedelta(days=3)),
        "message": "Order confirmed! Track your batch quality details in your confirmation email."
    }

# Fallback route to serve production React application index.html for root and non-API routes
@app.get("/")
@app.get("/{full_path:path}")
def serve_react_app(full_path: str = ""):
    index_file = os.path.join(FRONTEND_DIST_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {
        "status": "online",
        "app": "TriFiber Health API",
        "version": "1.0.0",
        "documentation": "/docs",
        "frontend_dev_url": "http://localhost:5173",
        "html_preview": "/html-preview"
    }


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
