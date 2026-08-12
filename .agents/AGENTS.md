# Workspace Rules & Quality Guidelines

## Pre-Push & Staging Verification Protocol

1. **Develop & Test on `staging` Branch First**:
   - All new features, UI components, and API changes MUST be committed and pushed to the `staging` branch first.
   - Pushing to `staging` automatically triggers auto-deployment to the **Staging Environment** on Render (`trifiber-staging`).

2. **Pre-Push Security & UAT Execution**:
   - Before pushing to `staging` or `main`, ALWAYS execute `python security_uat.py`.
   - Ensure all 4 test suites pass:
     1. Secret & Credentials Security Audit
     2. Backend FastAPI Integration & Route UAT
     3. Frontend Vite Compilation & Build Audit
     4. Docker & Render Infrastructure Audit
   - Only push if `python security_uat.py` returns `SUCCESS: ALL SECURITY & UAT CHECKS PASSED!`.

3. **Production Promotion Protocol**:
   - After UAT and user approval in the Staging Environment, merge `staging` into `main` and push `main` to trigger the **Production Release** on Render (`trifiber-health`).
