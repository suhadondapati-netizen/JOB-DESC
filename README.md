# AI-Based Job Recommendation System Based on Educational Qualifications

An intelligent career recommendation platform that recommends suitable job roles based on students' educational qualifications, technical skills, certifications, experience, projects, and career interests.

---

## 🚀 Quick Start (Local / VS Code)

### 1. Prerequisites
- Python 3.10 or higher
- pip package manager

### 2. Setup Virtual Environment
```bash
# macOS / Linux
python3 -m venv venv
source venv/bin/activate

# Windows (PowerShell)
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 3. Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Initialize Database
```bash
python flask_app/database/init_db.py
```
This sets up SQLite with all 7 tables and seeds the 13 tech roles.

### 5. Run the Flask Web App
```bash
python flask_app/app.py
```
Open **`http://127.0.0.1:5000`** in your browser.

---

## 📂 Project Architecture

```
├── flask_app/
│   ├── app.py                     # Flask 3.0 backend application & API
│   ├── database/
│   │   ├── schema.sql             # 7 SQLite tables schema
│   │   ├── init_db.py             # Database seed script for 13 job roles
│   │   └── job_recommender.db     # SQLite database
│   ├── static/
│   │   └── css/
│   │       └── style.css          # Custom styling (blue, purple & white theme)
│   └── templates/
│       ├── base.html              # Bootstrap 5 layout & navbar
│       ├── index.html             # Landing page with interactive preview
│       ├── login.html             # Student & Admin authentication
│       └── register.html          # Account registration
├── requirements.txt               # Python dependencies
├── VSCODE_GUIDE.md                # Detailed guide for VS Code
└── src/                           # React + Tailwind web application
```

---

## 🔑 Test Credentials
- **Student Account**: `student@careerai.edu` / `student123`
- **Admin Account**: `admin@careerai.edu` / `admin123`
