#!/bin/bash
# AI-Based Job Recommendation System - 1-Click Startup Script for Mac/Linux

echo "=========================================================="
echo "Starting AI-Based Job Recommendation System..."
echo "=========================================================="

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "Installing/verifying requirements..."
pip install -r requirements.txt --quiet

echo "Running application..."
python3 run.py
