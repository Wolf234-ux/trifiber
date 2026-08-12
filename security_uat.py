#!/usr/bin/env python3
"""
TriFiber Health — Security & UAT Pre-Push Entry Point
"""
import subprocess
import sys
import os

if __name__ == "__main__":
    script_path = os.path.join(os.path.dirname(__file__), "scripts", "security_uat.py")
    res = subprocess.run([sys.executable, script_path])
    sys.exit(res.returncode)
