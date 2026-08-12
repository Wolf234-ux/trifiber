# Workspace Rules & Quality Guidelines

## Pre-Push Verification Protocol
- Before committing and pushing code changes to Git or Render, ALWAYS execute `python security_uat.py`.
- Ensure all 4 test suites pass:
  1. Secret & Credentials Security Audit
  2. Backend FastAPI Integration & Route UAT
  3. Frontend Vite Compilation & Build Audit
  4. Docker & Render Infrastructure Audit
- Only push if `python security_uat.py` returns `SUCCESS: ALL SECURITY & UAT CHECKS PASSED!`.
