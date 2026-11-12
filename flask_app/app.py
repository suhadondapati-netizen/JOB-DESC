"""
AI-Based Job Recommendation System - Flask Application
Module 1: Core Setup, Database Connection, Routes, and Home Page

Features:
- Professional Landing Page with AI Career Guidance overview
- Session management & user authentication routes
- SQLite connection management
- Real job roles API endpoint
- Transparent matching calculation prototype
"""

import os
import sqlite3
import hashlib
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'ai_career_guidance_secret_key_2026')

DB_PATH = os.path.join(os.path.dirname(__file__), 'database', 'job_recommender.db')

def get_db_connection():
    """Returns a thread-safe connection to the SQLite database with dictionary-like row access."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def hash_password(password: str) -> str:
    salt = "ai_job_salt_2026"
    return hashlib.sha256((salt + password).encode('utf-8')).hexdigest()

@app.context_processor
def inject_user():
    """Inject logged-in user into all templates."""
    return dict(current_user=session.get('user'))

@app.route('/')
def home():
    """Module 1 Home Page - Modern Landing Page."""
    conn = get_db_connection()
    roles = conn.execute("SELECT * FROM job_roles LIMIT 6").fetchall()
    total_roles = conn.execute("SELECT COUNT(*) FROM job_roles").fetchone()[0]
    total_skills = conn.execute("SELECT COUNT(*) FROM skills").fetchone()[0]
    conn.close()
    return render_template('index.html', roles=roles, total_roles=total_roles, total_skills=total_skills)

@app.route('/api/roles')
def get_roles():
    """API endpoint to fetch all 13 job roles with criteria and required skills."""
    conn = get_db_connection()
    roles = conn.execute("SELECT * FROM job_roles").fetchall()
    result = []
    for role in roles:
        role_dict = dict(role)
        reqs = conn.execute("""
            SELECT skill_name, is_mandatory, weight 
            FROM job_requirements 
            WHERE job_role_id = ?
        """, (role['id'],)).fetchall()
        role_dict['requirements'] = [dict(r) for r in reqs]
        result.append(role_dict)
    conn.close()
    return jsonify({'roles': result})

@app.route('/api/preview-match', methods=['POST'])
def preview_match():
    """Interactive preview of the matching algorithm for the landing page."""
    data = request.get_json() or {}
    qualification = data.get('qualification', '')
    selected_skills = [s.strip().lower() for s in data.get('skills', []) if s.strip()]

    conn = get_db_connection()
    roles = conn.execute("SELECT * FROM job_roles").fetchall()
    matches = []

    for role in roles:
        # Check educational qualification match
        edu_reqs = [e.strip().lower() for e in role['educational_requirements'].split(',')]
        qual_match = any(qualification.lower() in req or req in qualification.lower() for req in edu_reqs) if qualification else True
        qual_score = 100 if qual_match else 50

        # Check skills match
        reqs = conn.execute("SELECT skill_name, is_mandatory, weight FROM job_requirements WHERE job_role_id = ?", (role['id'],)).fetchall()
        total_weight = sum(r['weight'] for r in reqs) or 1.0
        matched_skills = []
        missing_skills = []
        matched_weight = 0.0

        for r in reqs:
            req_skill = r['skill_name']
            if any(req_skill.lower() == s for s in selected_skills):
                matched_skills.append(req_skill)
                matched_weight += r['weight']
            else:
                missing_skills.append(req_skill)

        skill_score = (matched_weight / total_weight) * 100
        # Combined score: 60% skills, 40% qualification match
        overall_score = round((0.6 * skill_score) + (0.4 * qual_score), 1)

        matches.append({
            'role_id': role['id'],
            'title': role['title'],
            'domain': role['domain'],
            'match_score': overall_score,
            'qual_score': qual_score,
            'skill_score': round(skill_score, 1),
            'matched_skills': matched_skills,
            'missing_skills': missing_skills,
            'salary_range': role['salary_range']
        })

    conn.close()
    # Sort descending by match score
    matches.sort(key=lambda x: x['match_score'], reverse=True)
    return jsonify({'matches': matches[:4]})

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Student & Admin Login."""
    if request.method == 'POST':
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '')

        if not email or not password:
            flash('Please enter both email and password.', 'danger')
            return redirect(url_for('login'))

        conn = get_db_connection()
        user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
        conn.close()

        if user and user['password_hash'] == hash_password(password):
            session['user'] = {
                'id': user['id'],
                'full_name': user['full_name'],
                'email': user['email'],
                'role': user['role']
            }
            flash(f"Welcome back, {user['full_name']}!", 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid email or password.', 'danger')
            return redirect(url_for('login'))

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    """Student Registration."""
    if request.method == 'POST':
        full_name = request.form.get('full_name', '').strip()
        email = request.form.get('email', '').strip()
        password = request.form.get('password', '')
        confirm_password = request.form.get('confirm_password', '')

        if not full_name or not email or not password:
            flash('All fields are required.', 'danger')
            return redirect(url_for('register'))

        if password != confirm_password:
            flash('Passwords do not match.', 'danger')
            return redirect(url_for('register'))

        conn = get_db_connection()
        existing = conn.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone()
        if existing:
            conn.close()
            flash('Email is already registered. Please log in.', 'warning')
            return redirect(url_for('login'))

        hashed_pw = hash_password(password)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, 'student')",
                       (full_name, email, hashed_pw))
        conn.commit()
        user_id = cursor.lastrowid
        conn.close()

        session['user'] = {
            'id': user_id,
            'full_name': full_name,
            'email': email,
            'role': 'student'
        }
        flash('Account registered successfully! Welcome aboard.', 'success')
        return redirect(url_for('home'))

    return render_template('register.html')

@app.route('/logout')
def logout():
    """Clear session."""
    session.pop('user', None)
    flash('You have been logged out successfully.', 'info')
    return redirect(url_for('home'))

if __name__ == '__main__':
    # Default port for standalone local execution
    app.run(host='0.0.0.0', port=5000, debug=True)
