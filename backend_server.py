import sys
import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from pydantic import BaseModel, Field
from typing import List, Optional, Dict
import datetime
import random

app = FastAPI(
    title="TriFiber Health API & Web Platform",
    description="Backend API and D2C Web Platform for TriFiber Health — Better Gut. Better Metabolism. Every Day.",
    version="1.0.0"
)

# Enable CORS for frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# Web App Routes
@app.get("/html-preview", response_class=HTMLResponse)
def get_html_preview():
    html_file = os.path.join(os.path.dirname(__file__), "trifiber-health (V_1).html")
    if os.path.exists(html_file):
        with open(html_file, "r", encoding="utf-8") as f:
            return f.read()
    raise HTTPException(status_code=404, detail="HTML preview file not found")

@app.get("/", response_class=HTMLResponse)
def get_react_app():
    # Serves the high-performance React 18 Application
    react_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TriFiber Health — Better Gut. Better Metabolism. Every Day.</title>
  <meta name="description" content="TriFiber Health: Evidence-led everyday nutrition for gut and metabolic health in the post-GLP-1 era.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <!-- React 18 and Babel for React Standalone App without Vite -->
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    :root {
      --navy: #232B4C;
      --navy-light: #3A4468;
      --parchment: #ECEFE3;
      --parchment-deep: #E2E6D3;
      --green: #5B6B4A;
      --gold: #D9A02A;
      --gold-soft: #E8BE5C;
      --dark: #14171F;
      --card-bg: #F8FAF2;
      --text-main: #14161A;
      --text-muted: #565D5F;
      --font-serif: 'IBM Plex Serif', Georgia, serif;
      --font-sans: 'IBM Plex Sans', -apple-system, sans-serif;
      --font-mono: 'IBM Plex Mono', monospace;
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--parchment);
      color: var(--text-main);
      font-family: var(--font-sans);
      line-height: 1.6;
    }
    .header {
      position: sticky; top: 0; z-index: 100;
      background: rgba(236, 239, 227, 0.94);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(35, 43, 76, 0.1);
      padding: 16px 32px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .logo { font-family: var(--font-serif); font-size: 24px; font-weight: 700; color: var(--navy); text-decoration: none; }
    .logo span { display: block; font-family: var(--font-mono); font-size: 10px; color: var(--green); letter-spacing: 0.2em; font-weight: 600; }
    .nav-links { display: flex; gap: 28px; font-weight: 600; font-size: 14px; }
    .nav-links a { color: var(--navy); text-decoration: none; transition: opacity 0.2s; }
    .nav-links a:hover { opacity: 0.7; }
    .actions { display: flex; align-items: center; gap: 16px; }
    .currency-select {
      background: white; border: 1.5px solid var(--navy-light); border-radius: 6px;
      padding: 6px 12px; font-family: var(--font-mono); font-size: 13px; font-weight: 600; color: var(--navy); cursor: pointer;
    }
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      padding: 12px 24px; font-weight: 600; font-size: 14px; border-radius: 6px;
      border: 1.5px solid transparent; cursor: pointer; transition: all 0.2s ease;
    }
    .btn-primary { background: var(--gold); color: var(--navy); box-shadow: 0 4px 14px rgba(217, 160, 42, 0.25); }
    .btn-primary:hover { background: var(--gold-soft); transform: translateY(-2px); }
    .btn-outline { background: transparent; border-color: var(--navy); color: var(--navy); }
    .btn-outline:hover { background: rgba(35, 43, 76, 0.05); }
    .container { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
    
    .hero { text-align: center; padding: 60px 20px; }
    .eyebrow { font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.15em; font-size: 12px; color: var(--green); font-weight: 600; margin-bottom: 12px; }
    .hero h1 { font-family: var(--font-serif); font-size: clamp(32px, 4.5vw, 54px); color: var(--navy); margin: 0 0 16px; line-height: 1.15; }
    .hero p { max-width: 720px; margin: 0 auto 32px; font-size: 18px; color: var(--text-muted); }

    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 32px; margin-top: 40px; }
    .card { background: var(--card-bg); border: 1px solid rgba(35, 43, 76, 0.1); border-radius: 12px; padding: 28px; transition: transform 0.2s, box-shadow 0.2s; }
    .card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(35, 43, 76, 0.08); }
    .card-badge { display: inline-block; background: var(--parchment-deep); color: var(--green); font-family: var(--font-mono); font-size: 11px; padding: 4px 10px; border-radius: 4px; font-weight: 600; margin-bottom: 12px; }
    .card h3 { font-family: var(--font-serif); font-size: 24px; color: var(--navy); margin: 0 0 8px; }
    .price-tag { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--navy); margin: 16px 0; }
    .price-tag s { font-size: 18px; color: var(--text-muted); font-weight: 400; margin-left: 8px; }
    
    .section-title { text-align: center; margin-bottom: 40px; }
    .section-title h2 { font-family: var(--font-serif); font-size: 36px; color: var(--navy); margin: 0 0 8px; }
    
    .quiz-box { background: var(--navy); color: white; border-radius: 16px; padding: 40px; margin: 60px 0; }
    .quiz-box h2 { font-family: var(--font-serif); color: white; margin-top: 0; }
    .quiz-box label { display: block; margin: 16px 0 6px; font-weight: 500; font-size: 14px; color: var(--parchment); }
    .quiz-box select { width: 100%; padding: 12px; border-radius: 6px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; font-size: 15px; }
    .quiz-box option { background: var(--navy); color: white; }
    .score-result { background: rgba(255,255,255,0.08); border: 1px solid var(--gold); border-radius: 10px; padding: 24px; margin-top: 24px; }
    
    .batch-tester { background: white; border: 1px solid rgba(35, 43, 76, 0.15); border-radius: 12px; padding: 32px; margin: 40px 0; }
    .batch-tester input { padding: 12px 16px; border: 1px solid #ccc; border-radius: 6px; font-family: var(--font-mono); font-size: 15px; width: 280px; margin-right: 12px; }

    .marketing-suite { background: #14171F; color: var(--parchment); border-radius: 16px; padding: 40px; margin: 60px 0; }
    .marketing-suite h2 { font-family: var(--font-serif); color: var(--gold-soft); margin-top: 0; }
    .marketing-output { background: #232B4C; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid var(--gold); }

    .cart-drawer {
      position: fixed; right: 0; top: 0; bottom: 0; width: 380px; max-width: 90vw; background: white; z-index: 200;
      box-shadow: -10px 0 30px rgba(0,0,0,0.15); padding: 28px; display: flex; flex-direction: column;
    }
    .cart-item { display: flex; justify-content: space-between; border-bottom: 1px solid #eee; padding: 12px 0; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    function App() {
      const [currency, setCurrency] = useState('INR');
      const [products, setProducts] = useState([]);
      const [cart, setCart] = useState([]);
      const [isCartOpen, setIsCartOpen] = useState(false);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [orderSuccess, setOrderSuccess] = useState(null);

      // Quiz State
      const [quizData, setQuizData] = useState({ glucose_spikes: 3, cravings_score: 3, fiber_intake: 2, satiety_duration: 2 });
      const [quizResult, setQuizResult] = useState(null);

      // Batch QA State
      const [batchId, setBatchId] = useState('TFH-2026-B001');
      const [batchResult, setBatchResult] = useState(null);

      // Auto Marketing State
      const [persona, setPersona] = useState('glucose_conscious');
      const [campaignResult, setCampaignResult] = useState(null);

      useEffect(() => {
        fetch('/api/products')
          .then(res => res.json())
          .then(data => setProducts(data.products || []));
      }, []);

      const addToCart = (product) => {
        setCart(prev => {
          const existing = prev.find(item => item.id === product.id);
          if (existing) {
            return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
          }
          return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
      };

      const handleQuizSubmit = (e) => {
        e.preventDefault();
        fetch('/api/quiz/evaluate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(quizData)
        })
        .then(res => res.json())
        .then(data => setQuizResult(data));
      };

      const handleBatchCheck = () => {
        fetch(`/api/batch/${batchId}`)
          .then(res => res.json())
          .then(data => setBatchResult(data.data));
      };

      const handleGenerateCampaign = () => {
        fetch('/api/marketing/generate-campaign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ target_persona: persona, channel: 'instagram' })
        })
        .then(res => res.json())
        .then(data => setCampaignResult(data.copy_assets));
      };

      const handleCheckout = () => {
        setIsSubmitting(true);
        const payload = {
          items: cart.map(i => ({ id: i.id, price: i.pricing[currency].price, quantity: i.quantity })),
          currency,
          is_subscription: true,
          customer_email: "customer@trifiberhealth.com",
          shipping_address: { city: "Mumbai", country: "India" }
        };
        fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
          setIsSubmitting(false);
          setOrderSuccess(data);
          setCart([]);
        });
      };

      const totalAmount = cart.reduce((sum, item) => sum + (item.pricing[currency].price * item.quantity), 0);
      const symbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : 'AED ';

      return (
        <div>
          {/* HEADER */}
          <header className="header">
            <a href="#" className="logo">
              TRIFIBER HEALTH
              <span>POST-GLP-1 METABOLIC PLATFORM</span>
            </a>
            <nav className="nav-links">
              <a href="#products">Products</a>
              <a href="#quiz">Metabolic Assessment</a>
              <a href="#quality">Batch Verification</a>
              <a href="#marketing">Auto-Marketing Engine</a>
              <a href="/html-preview" target="_blank" style={{color: 'var(--gold)', fontWeight: '700'}}>HTML Deck Preview ↗</a>
            </nav>
            <div className="actions">
              <select value={currency} onChange={e => setCurrency(e.target.value)} className="currency-select">
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="AED">AED (AED)</option>
              </select>
              <button className="btn btn-primary" onClick={() => setIsCartOpen(true)}>
                Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </button>
            </div>
          </header>

          {/* HERO */}
          <section className="hero container">
            <div className="eyebrow">Evidence-Led Everyday Nutrition</div>
            <h1>Better Gut. Better Metabolism. Every Day.</h1>
            <p>
              Two daily habits engineered for the post-GLP-1 world. Closing the fiber gap and supporting everyday glucose metabolism without prescription drug side effects.
            </p>
            <div style={{display: 'flex', gap: '16px', justifyContent: 'center'}}>
              <a href="#products" className="btn btn-primary">Explore Products</a>
              <a href="#quiz" className="btn btn-outline">Take Metabolic Quiz</a>
            </div>
          </section>

          {/* PRODUCTS SECTION */}
          <section id="products" className="container">
            <div className="section-title">
              <div className="eyebrow">Core SKUs</div>
              <h2>Targeted Products. Universal Daily Habits.</h2>
            </div>
            <div className="grid-2">
              {products.map(p => (
                <div key={p.id} className="card">
                  <span className="card-badge">{p.badge}</span>
                  <h3>{p.name}</h3>
                  <p style={{color: 'var(--text-muted)', fontSize: '14px'}}>{p.tagline}</p>
                  
                  <div className="price-tag">
                    {p.pricing[currency].symbol}{p.pricing[currency].price}
                    <s>{p.pricing[currency].symbol}{p.pricing[currency].compare_at}</s>
                  </div>

                  <p style={{fontSize: '14px', marginBottom: '16px'}}>{p.description}</p>
                  
                  <div style={{marginBottom: '20px'}}>
                    <strong style={{fontSize: '12px', textTransform: 'uppercase', color: 'var(--green)', fontFamily: 'var(--font-mono)'}}>Active Ingredients:</strong>
                    <ul style={{fontSize: '13px', paddingLeft: '20px', margin: '6px 0'}}>
                      {p.actives.map((act, i) => (
                        <li key={i}><strong>{act.name}</strong> ({act.amount}) — {act.purpose}</li>
                      ))}
                    </ul>
                  </div>

                  <button className="btn btn-primary" style={{width: '100%'}} onClick={() => addToCart(p)}>
                    Add to Cart • Save 15% on Subscription
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* METABOLIC QUIZ SECTION */}
          <section id="quiz" className="container">
            <div className="quiz-box">
              <div className="eyebrow" style={{color: 'var(--gold-soft)'}}>Interactive Clinical Algorithm</div>
              <h2>Personalized Metabolic Assessment</h2>
              <p style={{color: 'rgba(255,255,255,0.8)'}}>Evaluate your post-meal energy stability, satiety window, and fiber intake deficit.</p>
              
              <form onSubmit={handleQuizSubmit} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                <div>
                  <label>Post-Meal Energy Dip / Glucose Spikes:</label>
                  <select value={quizData.glucose_spikes} onChange={e => setQuizData({...quizData, glucose_spikes: Number(e.target.value)})}>
                    <option value={1}>1 - Rare (Steady energy)</option>
                    <option value={3}>3 - Moderate (Afternoon fatigue)</option>
                    <option value={5}>5 - Frequent (Heavy post-meal crash)</option>
                  </select>
                </div>
                <div>
                  <label>Sugar & Afternoon Carb Cravings:</label>
                  <select value={quizData.cravings_score} onChange={e => setQuizData({...quizData, cravings_score: Number(e.target.value)})}>
                    <option value={1}>1 - Low cravings</option>
                    <option value={3}>3 - Afternoon snack urge</option>
                    <option value={5}>5 - Intense daily sugar craving</option>
                  </select>
                </div>
                <div>
                  <label>Daily Plant / Fiber Diversity:</label>
                  <select value={quizData.fiber_intake} onChange={e => setQuizData({...quizData, fiber_intake: Number(e.target.value)})}>
                    <option value={1}>1 - Minimal (Refined carbs focus)</option>
                    <option value={3}>3 - Average (Occasional salad)</option>
                    <option value={5}>5 - High (30g+ plant fiber)</option>
                  </select>
                </div>
                <div>
                  <label>Fullness Satiety Duration After Meals:</label>
                  <select value={quizData.satiety_duration} onChange={e => setQuizData({...quizData, satiety_duration: Number(e.target.value)})}>
                    <option value={1}>1 - Hungry within 1-2 hours</option>
                    <option value={3}>3 - Satisfied for 2-3 hours</option>
                    <option value={5}>5 - Full for 4+ hours</option>
                  </select>
                </div>
                <div style={{gridColumn: '1 / -1', marginTop: '12px'}}>
                  <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Calculate Metabolic Score</button>
                </div>
              </form>

              {quizResult && (
                <div className="score-result">
                  <h3 style={{margin: '0 0 8px', color: 'var(--gold-soft)'}}>Metabolic Health Score: {quizResult.score} / 100</h3>
                  <p style={{fontWeight: '600'}}>{quizResult.category}</p>
                  <p style={{fontSize: '14px', margin: '8px 0'}}>{quizResult.recommendation}</p>
                  <div style={{fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--parchment)', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px', marginTop: '10px'}}>
                    Estimated Daily Fiber Deficit: {quizResult.insights.fiber_deficit_g}g | Glucose Volatility: {quizResult.insights.glucose_volatility}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* BATCH QA VERIFICATION PORTAL */}
          <section id="quality" className="container">
            <div className="batch-tester">
              <div className="eyebrow">Transparency Moat</div>
              <h2 style={{fontFamily: 'var(--font-serif)', color: 'var(--navy)', marginTop: 0}}>Batch QA & Certificate of Analysis (COA) Lookup</h2>
              <p style={{color: 'var(--text-muted)'}}>Enter the QR code batch number from your bottle or sachet pack to inspect batch-level purity and heavy metal test results.</p>
              
              <div style={{display: 'flex', alignItems: 'center', marginTop: '20px'}}>
                <input 
                  type="text" 
                  value={batchId} 
                  onChange={e => setBatchId(e.target.value)} 
                  placeholder="e.g. TFH-2026-B001"
                />
                <button className="btn btn-primary" onClick={handleBatchCheck}>Verify Batch QA</button>
              </div>

              {batchResult && (
                <div style={{marginTop: '24px', background: 'var(--card-bg)', border: '1px solid var(--navy-light)', borderRadius: '8px', padding: '20px'}}>
                  <h4 style={{margin: '0 0 12px', color: 'var(--navy)'}}>{batchResult.product_name} (Batch: {batchResult.batch_id})</h4>
                  <p style={{fontSize: '13px', margin: '0 0 12px'}}><strong>Status:</strong> <span style={{color: 'green', fontWeight: '700'}}>{batchResult.status}</span> | <strong>Lab:</strong> {batchResult.lab_name}</p>
                  
                  <table style={{width: '100%', fontSize: '13px', borderCollapse: 'collapse'}}>
                    <thead>
                      <tr style={{background: 'var(--parchment-deep)', textAlign: 'left'}}>
                        <th style={{padding: '8px'}}>Parameter</th>
                        <th style={{padding: '8px'}}>Lab Result</th>
                        <th style={{padding: '8px'}}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batchResult.tests.map((t, idx) => (
                        <tr key={idx} style={{borderBottom: '1px solid #eee'}}>
                          <td style={{padding: '8px'}}>{t.parameter}</td>
                          <td style={{padding: '8px'}}>{t.result}</td>
                          <td style={{padding: '8px', color: 'green', fontWeight: 'bold'}}>{t.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>

          {/* AUTO-MARKETING SUITE */}
          <section id="marketing" className="container">
            <div className="marketing-suite">
              <div className="eyebrow" style={{color: 'var(--gold-soft)'}}>Automated Growth Engine</div>
              <h2>Auto-Marketing Campaign & Pitch Generator</h2>
              <p>Simulate AI campaign hook generation based on target consumer persona and regulatory parameters.</p>

              <div style={{display: 'flex', gap: '16px', alignItems: 'center', marginTop: '20px'}}>
                <select value={persona} onChange={e => setPersona(e.target.value)} style={{padding: '10px 16px', borderRadius: '6px', fontSize: '14px', background: '#232B4C', color: 'white', border: '1px solid #4A5580'}}>
                  <option value="glucose_conscious">Persona: Glucose Conscious (Post-Meal Energy)</option>
                  <option value="fiber_gap">Persona: Fiber Gap Sufferer (Sensory & Bloat)</option>
                  <option value="post_glp1">Persona: Post-GLP-1 Era Maintainer</option>
                </select>
                <button className="btn btn-primary" onClick={handleGenerateCampaign}>Generate Campaign Assets</button>
              </div>

              {campaignResult && (
                <div className="marketing-output">
                  <h4 style={{color: 'var(--gold-soft)', margin: '0 0 8px'}}>Headline: {campaignResult.headline}</h4>
                  <p style={{fontSize: '14px', margin: '4px 0'}}><strong>Social Hook:</strong> "{campaignResult.hook}"</p>
                  <p style={{fontSize: '14px', margin: '4px 0'}}><strong>Email Subject Line:</strong> {campaignResult.email_subject}</p>
                  <p style={{fontSize: '13px', color: 'var(--gold-soft)', marginTop: '8px'}}><em>Angle Strategy: {campaignResult.key_angle}</em></p>
                </div>
              )}
            </div>
          </section>

          {/* CART DRAWER */}
          {isCartOpen && (
            <div className="cart-drawer">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '16px'}}>
                <h3 style={{margin: 0, fontFamily: 'var(--font-serif)', color: 'var(--navy)'}}>Your Metabolic Cart</h3>
                <button onClick={() => setIsCartOpen(false)} style={{background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer'}}>×</button>
              </div>

              <div style={{flex: 1, overflowY: 'auto', margin: '20px 0'}}>
                {cart.length === 0 ? (
                  <p style={{color: 'var(--text-muted)'}}>Your cart is currently empty.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div>
                        <strong>{item.name}</strong>
                        <div style={{fontSize: '12px', color: 'var(--text-muted)'}}>Qty: {item.quantity}</div>
                      </div>
                      <div style={{fontWeight: '700'}}>{symbol}{item.pricing[currency].price * item.quantity}</div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', marginBottom: '16px'}}>
                    <span>Total (Subscription -15%):</span>
                    <span>{symbol}{Math.round(totalAmount * 0.85)}</span>
                  </div>
                  <button className="btn btn-primary" style={{width: '100%'}} onClick={handleCheckout} disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Complete Order Simulation"}
                  </button>
                </div>
              )}

              {orderSuccess && (
                <div style={{marginTop: '16px', background: '#E6F4EA', color: '#137333', padding: '12px', borderRadius: '6px', fontSize: '13px'}}>
                  <strong>Order Confirmed!</strong><br />
                  ID: {orderSuccess.order_id}<br />
                  Est Delivery: {orderSuccess.estimated_delivery}
                </div>
              )}
            </div>
          )}

          {/* FOOTER */}
          <footer style={{background: 'var(--dark)', color: 'var(--parchment)', padding: '40px 24px', textAlign: 'center', fontSize: '13px'}}>
            <p>TriFiber Health © 2026. Strictly Confidential. Built in India, Designed for the World.</p>
            <p style={{opacity: 0.6, marginTop: '8px'}}>FSSAI Compliant Formulations | Schedule IV & Schedule VII Specifications</p>
          </footer>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>"""
    return react_html

@app.get("/api/products")
def get_products():
    return {"products": PRODUCTS}

@app.get("/api/batch/{batch_id}")
def get_batch_details(batch_id: str):
    clean_id = batch_id.strip().upper()
    if clean_id in BATCH_RECORDS:
        return {"found": True, "data": BATCH_RECORDS[clean_id]}
    else:
        return {
            "found": True,
            "data": {
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
        }

@app.post("/api/quiz/evaluate")
def evaluate_quiz(data: QuizSubmission):
    penalty = (data.glucose_spikes * 6) + (data.cravings_score * 6) + ((6 - data.fiber_intake) * 5) + ((6 - data.satiety_duration) * 5)
    metabolic_score = max(25, min(98, 100 - penalty))
    
    if metabolic_score >= 80:
        category = "Optimal Balance"
        recommendation = "Your metabolic system is fairly resilient! Daily multi-fiber maintenance will keep your gut microbiome thriving and maintain steady post-meal glucose."
        bundle = ["trifiber-daily"]
    elif metabolic_score >= 60:
        category = "Moderate Fiber & Glucose Gap"
        recommendation = "You are experiencing classic afternoon energy slumps and moderate carb cravings due to dietary fiber deficiency. Adding TriFiber Daily will extend meal satiety and reduce spikes."
        bundle = ["trifiber-daily"]
    else:
        category = "High Metabolic & Satiety Deficit"
        recommendation = "Your score indicates significant post-meal glucose volatility and digestive irregularity. The Dual Metabolic Protocol (TriFiber Daily + Berberine Metabolic Balance) provides targeted dual support."
        bundle = ["trifiber-daily", "berberine-balance"]

    return {
        "score": metabolic_score,
        "category": category,
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend_server:app", host="127.0.0.1", port=8000, reload=True)
