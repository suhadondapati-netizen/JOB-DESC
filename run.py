"""
AI-Based Job Recommendation System - 1-Click VS Code Runner
Run this file directly by pressing the "Run" button in VS Code, or:
    python run.py

This script automatically:
1. Verifies/initializes the SQLite database (7 tables & 13 real job roles)
2. Automatically opens your default web browser to http://127.0.0.1:5000
3. Starts the Flask web server with live auto-reload enabled
"""

import os
import sys
import webbrowser
import threading
import time

# Ensure repository root is on sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(BASE_DIR, 'flask_app'))

def ensure_database():
    """Checks if the SQLite database exists; if not, automatically initializes it."""
    db_path = os.path.join(BASE_DIR, 'flask_app', 'database', 'job_recommender.db')
    if not os.path.exists(db_path):
        print("--> SQLite database not detected. Running automatic initialization...")
        from flask_app.database.init_db import init_database
        init_database()
        print("--> Database initialized and seeded successfully!\n")
    else:
        print(f"--> Found existing SQLite database at: {db_path}\n")

def open_browser():
    """Opens browser after server starts."""
    time.sleep(1.2)
    url = "http://127.0.0.1:5000"
    print(f"--> Opening web browser at {url} ...")
    webbrowser.open(url)

if __name__ == '__main__':
    print("=" * 65)
    print("   AI-BASED JOB RECOMMENDATION SYSTEM")
    print("   Starting Local Development Server for VS Code")
    print("=" * 65)

    ensure_database()

    # Import the Flask application
    from flask_app.app import app

    # Launch browser in a background thread
    threading.Thread(target=open_browser, daemon=True).start()

    print("--> Server is running! Press CTRL+C to stop.")
    print("--> Application URL: http://127.0.0.1:5000")
    print("=" * 65 + "\n")

    # Start Flask server
    app.run(host='127.0.0.1', port=5000, debug=True)
