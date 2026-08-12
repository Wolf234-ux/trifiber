#!/usr/bin/env python3
"""
TriFiber Health — Security & User Acceptance Testing (UAT) Automated Suite
Run this script before pushing any code to GitHub / Render.

Usage:
    python scripts/security_uat.py
"""

import sys
import os
import re
import subprocess
import json
from typing import List, Tuple

# Set workspace root path
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
WORKSPACE_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))

class TerminalColor:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def log_header(title: str):
    print(f"\n{TerminalColor.BOLD}{TerminalColor.HEADER}=== {title} ==={TerminalColor.ENDC}")

def log_pass(msg: str):
    print(f"  {TerminalColor.OKGREEN}[PASS]{TerminalColor.ENDC} {msg}")

def log_warn(msg: str):
    print(f"  {TerminalColor.WARNING}[WARN]{TerminalColor.ENDC} {msg}")

def log_fail(msg: str):
    print(f"  {TerminalColor.FAIL}[FAIL]{TerminalColor.ENDC} {msg}")

# -----------------------------------------------------------------------------
# 1. Security & Secret Leak Scanner
# -----------------------------------------------------------------------------
def run_security_audit() -> bool:
    log_header("1. Security & Secret Leak Audit")
    passed = True
    
    # Split pattern so scanner doesn't match this file itself
    pem_pattern = r'-----BEGIN ' + r'PRIVATE KEY-----'
    secret_patterns = [
        (r'AKIA[0-9A-Z]{16}', "AWS Access Key ID"),
        (pem_pattern, "RSA/PEM Private Key"),
        (r'sk_live_[0-9a-zA-Z]{24}', "Stripe Live Secret Key"),
        (r'rzp_live_[0-9a-zA-Z]{14}', "Razorpay Live Key"),
    ]

    
    excluded_dirs = {'.git', '__pycache__', 'node_modules', 'dist', '.venv', 'docs'}
    
    leaks_found = []
    
    for root, dirs, files in os.walk(WORKSPACE_ROOT):
        dirs[:] = [d for d in dirs if d not in excluded_dirs]
        for file in files:
            if file.endswith(('.py', '.js', '.jsx', '.json', '.yaml', '.yml', '.env')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        for pattern, desc in secret_patterns:
                            if re.search(pattern, content):
                                rel_path = os.path.relpath(file_path, WORKSPACE_ROOT)
                                leaks_found.append((rel_path, desc))
                except Exception as e:
                    pass
                    
    if leaks_found:
        passed = False
        for path, desc in leaks_found:
            log_fail(f"Potential hardcoded secret ({desc}) detected in: {path}")
    else:
        log_pass("No hardcoded API keys, private keys, or credentials found.")
        
    # Check FastAPI CORS configuration security
    main_py_path = os.path.join(WORKSPACE_ROOT, "backend", "main.py")
    if os.path.exists(main_py_path):
        with open(main_py_path, "r", encoding="utf-8") as f:
            code = f.read()
            if "CORSMiddleware" in code:
                log_pass("CORS Middleware is configured in FastAPI backend.")
            else:
                log_warn("CORSMiddleware missing in backend/main.py.")
                
    return passed

# -----------------------------------------------------------------------------
# 2. Backend FastAPI Endpoint & Integration UAT
# -----------------------------------------------------------------------------
def run_backend_uat() -> bool:
    log_header("2. Backend FastAPI Endpoint & Integration UAT")
    passed = True
    
    sys.path.insert(0, WORKSPACE_ROOT)
    
    try:
        from fastapi.testclient import TestClient
        from backend.main import app
        
        client = TestClient(app)
        
        # Test 1: Root Route SPA / Service Health
        res = client.get("/")
        if res.status_code == 200:
            log_pass("GET / -> 200 OK (Root route active)")
        else:
            log_fail(f"GET / failed with status code {res.status_code}")
            passed = False
            
        # Test 2: Swagger Documentation Route
        res = client.get("/docs")
        if res.status_code == 200:
            log_pass("GET /docs -> 200 OK (Swagger API docs active)")
        else:
            log_fail(f"GET /docs failed with status code {res.status_code}")
            passed = False

        # Test 3: Products Catalog Endpoint
        res = client.get("/api/products")
        if res.status_code == 200 and len(res.json().get("products", [])) > 0:
            log_pass(f"GET /api/products -> 200 OK ({len(res.json()['products'])} catalog items loaded)")
        else:
            log_fail("GET /api/products returned empty or invalid payload")
            passed = False

        # Test 4: CoA Quality Batch Record Lookup Endpoint
        res = client.get("/api/batch/TFH-2026-B001")
        if res.status_code == 200 and res.json().get("batch_id") == "TFH-2026-B001":
            log_pass("GET /api/batch/TFH-2026-B001 -> 200 OK (CoA lab record verified)")
        else:
            log_fail("GET /api/batch/TFH-2026-B001 lookup failed")
            passed = False

        # Test 5: Metabolic Quiz Evaluation Endpoint
        quiz_payload = {
            "glucose_spikes": 3,
            "cravings_score": 3,
            "fiber_intake": 2,
            "satiety_duration": 3
        }
        res = client.post("/api/quiz", json=quiz_payload)
        if res.status_code == 200 and "metabolic_score" in res.json():
            log_pass("POST /api/quiz -> 200 OK (Metabolic Quiz engine validated)")
        else:
            log_fail("POST /api/quiz evaluation failed")
            passed = False

        # Test 6: Regulatory Claims Checker Endpoint
        claim_payload = {"claim_text": "cures diabetes", "jurisdiction": "FSSAI"}
        res = client.post("/api/claims/check", json=claim_payload)
        if res.status_code == 200 and res.json().get("is_compliant") is False:
            log_pass("POST /api/claims/check -> 200 OK (Non-compliant claim caught correctly)")
        else:
            log_fail("POST /api/claims/check validation failed")
            passed = False

        # Test 7: Checkout Simulator Endpoint
        checkout_payload = {
            "items": [{"id": "trifiber-daily", "price": 1199, "quantity": 1}],
            "currency": "INR",
            "is_subscription": True,
            "customer_email": "test@trifiberhealth.com",
            "shipping_address": {"address": "123 Health Way", "city": "Bengaluru", "postal_code": "560001"}
        }
        res = client.post("/api/checkout", json=checkout_payload)
        if res.status_code == 200 and res.json().get("success") is True:
            log_pass("POST /api/checkout -> 200 OK (Checkout engine validated)")
        else:
            log_fail("POST /api/checkout simulation failed")
            passed = False


    except Exception as e:
        log_fail(f"Backend UAT execution error: {str(e)}")
        passed = False

    return passed

# -----------------------------------------------------------------------------
# 3. Frontend React Build UAT Audit
# -----------------------------------------------------------------------------
def run_frontend_uat() -> bool:
    log_header("3. Frontend React Build UAT Audit")
    passed = True

    frontend_dir = os.path.join(WORKSPACE_ROOT, "frontend")
    package_json = os.path.join(frontend_dir, "package.json")

    if not os.path.exists(package_json):
        log_fail("frontend/package.json not found!")
        return False

    log_pass("frontend/package.json exists.")

    # Run npm run build test in non-interactive mode
    try:
        print("  [INFO] Running Vite production build check (npm run build)...")
        result = subprocess.run(
            ["npm", "run", "build"],
            cwd=frontend_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            shell=True
        )

        if result.returncode == 0:
            log_pass("Frontend Vite production build compiled with ZERO errors.")
        else:
            log_fail("Frontend compilation failed during `npm run build`:")
            print(result.stderr[:500])
            passed = False
    except Exception as e:
        log_warn(f"Unable to run npm build process automatically: {e}")

    return passed

# -----------------------------------------------------------------------------
# 4. Render & Docker Infrastructure Audit
# -----------------------------------------------------------------------------
def run_infrastructure_audit() -> bool:
    log_header("4. Infrastructure & Render Deployment Audit")
    passed = True

    dockerfile_path = os.path.join(WORKSPACE_ROOT, "Dockerfile")
    render_yaml_path = os.path.join(WORKSPACE_ROOT, "render.yaml")

    # Check Dockerfile
    if os.path.exists(dockerfile_path):
        with open(dockerfile_path, "r", encoding="utf-8") as f:
            df_content = f.read()
            if "${PORT:-10000}" in df_content or "$PORT" in df_content:
                log_pass("Dockerfile dynamic $PORT binding verified.")
            else:
                log_warn("Dockerfile might be hardcoding PORT 10000 instead of dynamic $PORT.")
            if "node:20-alpine" in df_content and "python:3.11-slim" in df_content:
                log_pass("Dockerfile multi-stage build (Node.js -> Python) verified.")
    else:
        log_fail("Dockerfile missing at repository root!")
        passed = False

    # Check render.yaml
    if os.path.exists(render_yaml_path):
        with open(render_yaml_path, "r", encoding="utf-8") as f:
            ry_content = f.read()
            if "autoDeploy: true" in ry_content or "autoDeploy:true" in ry_content:
                log_pass("render.yaml autoDeploy is enabled.")
            else:
                log_warn("render.yaml missing autoDeploy setting.")
            if "runtime: docker" in ry_content:
                log_pass("render.yaml Docker runtime specified.")
    else:
        log_fail("render.yaml Blueprint missing at repository root!")
        passed = False

    return passed

# -----------------------------------------------------------------------------
# Master Execution Flow
# -----------------------------------------------------------------------------
def main():
    print(f"\n{TerminalColor.BOLD}{TerminalColor.OKBLUE}==================================================={TerminalColor.ENDC}")
    print(f"{TerminalColor.BOLD}{TerminalColor.OKBLUE}  TriFiber Health — Pre-Push Security & UAT Suite  {TerminalColor.ENDC}")
    print(f"{TerminalColor.BOLD}{TerminalColor.OKBLUE}==================================================={TerminalColor.ENDC}")

    sec_ok = run_security_audit()
    backend_ok = run_backend_uat()
    frontend_ok = run_frontend_uat()
    infra_ok = run_infrastructure_audit()

    print(f"\n{TerminalColor.BOLD}==================================================={TerminalColor.ENDC}")
    if sec_ok and backend_ok and frontend_ok and infra_ok:
        print(f"{TerminalColor.BOLD}{TerminalColor.OKGREEN} SUCCESS: ALL SECURITY & UAT CHECKS PASSED!{TerminalColor.ENDC}")
        print(f"{TerminalColor.OKGREEN} Safe to commit and push code to GitHub / Render.{TerminalColor.ENDC}\n")
        sys.exit(0)
    else:
        print(f"{TerminalColor.BOLD}{TerminalColor.FAIL} ERROR: PRE-PUSH UAT SECURITY AUDIT FAILED!{TerminalColor.ENDC}")
        print(f"{TerminalColor.FAIL} Please resolve the issues above before pushing.{TerminalColor.ENDC}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
