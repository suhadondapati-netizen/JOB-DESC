@echo off
title AI-Based Job Recommendation System
echo ==========================================================
echo Starting AI-Based Job Recommendation System...
echo ==========================================================

if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat

echo Installing requirements...
pip install -r requirements.txt --quiet

echo Running application...
python run.py

pause
