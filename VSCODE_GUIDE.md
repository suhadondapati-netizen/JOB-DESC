# VS Code & Local Setup Guide: AI-Based Job Recommendation System

This guide provides step-by-step instructions for running the Flask + SQLite application in Visual Studio Code (VS Code) or any local terminal.

---

## 1. Project Folder Structure

```
├── flask_app/
│   ├── app.py                     # Main Flask web application
│   ├── database/
│   │   ├── schema.sql             # Complete SQLite database schema (7 tables)
│   │   ├── init_db.py             # Database seeding script (13 real job roles & master skills)
│   │   └── job_recommender.db     # Generated SQLite database file
│   ├── static/
│   │   └── css/
│   │       └── style.css          # Modern blue, purple & white responsive CSS
│   └── templates/
│       ├── base.html              # Responsive Bootstrap 5 layout & navbar
│       ├── index.html             # Landing page with interactive preview & features
│       ├── login.html             # Student & Admin authentication
│       └── register.html          # Student account registration
├── requirements.txt               # Python package dependencies
├── VSCODE_GUIDE.md                # This setup guide
└── src/                           # React / TypeScript interactive web client (AI Studio preview)
```

---

## 2. Prerequisites

- Python 3.10+ installed on your computer.
- VS Code installed with the Python extension (`ms-python.python`).
- Git (optional, for cloning).

---

## 3. Step-by-Step Setup in VS Code

### Step 1: Open the Project in VS Code
1. Launch VS Code.
2. Go to **File -> Open Folder...** and select the project root directory.
3. Open the integrated terminal using `Ctrl + \`` (or `Cmd + \`` on macOS).

### Step 2: Create a Python Virtual Environment
Run the following command in the VS Code terminal:

- On **Linux / macOS**:
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

- On **Windows (PowerShell)**:
  ```powershell
  python -m venv venv
  .\venv\Scripts\Activate.ps1
  ```
  *(Note: If PowerShell displays an execution policy error, run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`)*

- On **Windows (Command Prompt / CMD)**:
  ```cmd
  python -m venv venv
  .\venv\Scripts\activate.bat
  ```

### Step 3: Upgrade pip and Install Dependencies
With the virtual environment activated, run:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 4: Initialize and Seed the SQLite Database
Execute the database initialization script to create all 7 tables and seed 13 real job roles and master skills:
```bash
python flask_app/database/init_db.py
```
Expected output:
```
Initializing database at: .../flask_app/database/job_recommender.db
Database initialization and dataset seeding completed successfully!
```

### Step 5: Run the Flask Application
Run the Flask server:
```bash
python flask_app/app.py
```
Or with Flask CLI:
```bash
export FLASK_APP=flask_app/app.py  # (set FLASK_APP=flask_app/app.py on Windows)
flask run --port=5000 --debug
```

### Step 6: Open the Application in Your Browser
Open your browser and navigate to:
**`http://127.0.0.1:5000`** or **`http://localhost:5000`**

---

## 4. Test Accounts

| Role | Email | Password |
|---|---|---|
| **Student** | `student@careerai.edu` | `student123` |
| **Admin** | `admin@careerai.edu` | `admin123` |

---

## 5. Verification Checklist for Module 1

- [x] **Folder structure**: Organized into `flask_app/`, `database/`, `templates/`, `static/`.
- [x] **Virtual environment**: Standard `venv` configuration documented and tested.
- [x] **requirements.txt**: Contains Flask, Pandas, NumPy, Scikit-learn, Plotly, etc.
- [x] **Flask application**: Running on port 5000 with session handling, flash alerts, and JSON endpoints.
- [x] **SQLite Database**: 7 tables (`users`, `student_profiles`, `skills`, `job_roles`, `job_requirements`, `recommendations`, `learning_progress`) with real seeded requirements.
- [x] **Professional Home Page**: Modern blue/purple SaaS landing page with hero, interactive match simulation preview, how it works, features, 13 job roles, and authentication links.
