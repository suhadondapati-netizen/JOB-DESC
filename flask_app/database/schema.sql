-- AI-Based Job Recommendation System Database Schema (SQLite)
-- Tables: users, student_profiles, skills, job_roles, job_requirements, recommendations, learning_progress

DROP TABLE IF EXISTS learning_progress;
DROP TABLE IF EXISTS recommendations;
DROP TABLE IF EXISTS job_requirements;
DROP TABLE IF EXISTS job_roles;
DROP TABLE IF EXISTS student_profiles;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS users;

-- 1. Users Table (Authentication & Accounts)
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'student', -- 'student' or 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Student Profiles Table (Comprehensive Education, Skills & Preferences)
CREATE TABLE student_profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    highest_qualification TEXT NOT NULL,      -- e.g., 'B.Tech / B.E.', 'MCA', 'B.Sc CS', 'M.Tech', 'BCA'
    degree TEXT NOT NULL,                     -- e.g., 'Bachelor of Technology'
    specialization TEXT NOT NULL,             -- e.g., 'Computer Science & Engineering', 'Data Science'
    graduation_year INTEGER NOT NULL,
    cgpa REAL,                                -- CGPA (e.g., 8.5) or Percentage
    technical_skills TEXT NOT NULL,           -- Comma-separated or JSON list
    programming_languages TEXT NOT NULL,      -- Comma-separated (e.g. Python, Java, JavaScript)
    database_skills TEXT,                     -- Comma-separated (e.g. PostgreSQL, MySQL, MongoDB)
    certifications TEXT,                      -- Comma-separated or JSON list
    internship_experience TEXT,               -- Description or duration in months
    projects TEXT,                            -- Notable projects
    work_experience_years REAL DEFAULT 0.0,   -- In years
    career_interests TEXT NOT NULL,           -- Comma-separated (e.g. AI/ML, Cloud, Web Dev)
    preferred_location TEXT DEFAULT 'Anywhere',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Master Skills Table (Normalized Skill Taxonomy)
CREATE TABLE skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,                   -- 'Programming', 'Data Science', 'Cloud & DevOps', 'Web Development', 'Database', 'Cybersecurity'
    demand_level TEXT DEFAULT 'High'          -- 'High', 'Very High', 'Medium'
);

-- 4. Job Roles Table (Comprehensive Tech Role Profiles)
CREATE TABLE job_roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL,               -- e.g., 'Data Analyst', 'Machine Learning Engineer', 'Full Stack Developer'
    domain TEXT NOT NULL,                     -- e.g., 'Data & AI', 'Software Engineering', 'Cloud & Infrastructure'
    description TEXT NOT NULL,
    educational_requirements TEXT NOT NULL,   -- JSON or comma-separated eligible qualifications
    min_cgpa REAL DEFAULT 6.0,
    min_experience_years REAL DEFAULT 0.0,
    preferred_certifications TEXT,
    career_growth_opportunities TEXT NOT NULL,
    salary_range TEXT,                        -- e.g., '$85,000 - $130,000 / year'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Job Requirements Table (Skills mapped to Job Roles with Weights & Importance)
CREATE TABLE job_requirements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_role_id INTEGER NOT NULL,
    skill_name TEXT NOT NULL,
    is_mandatory INTEGER DEFAULT 1,           -- 1 = Mandatory, 0 = Preferred / Good-to-have
    weight REAL DEFAULT 1.0,                  -- Weight multiplier for match scoring (0.5 to 2.0)
    FOREIGN KEY (job_role_id) REFERENCES job_roles(id) ON DELETE CASCADE
);

-- 6. Recommendations Table (Cached matching results per student)
CREATE TABLE recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    job_role_id INTEGER NOT NULL,
    match_score REAL NOT NULL,                -- Percentage match (0 - 100)
    qualification_match_score REAL NOT NULL,
    skills_match_score REAL NOT NULL,
    matching_skills TEXT,                     -- JSON list of matched skills
    missing_skills TEXT,                      -- JSON list of skill gaps
    explanation TEXT NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (job_role_id) REFERENCES job_roles(id) ON DELETE CASCADE
);

-- 7. Learning Progress Table (Curated courses, projects, weekly plans)
CREATE TABLE learning_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    skill_name TEXT NOT NULL,
    target_job_role_id INTEGER,
    status TEXT DEFAULT 'pending',            -- 'pending', 'in_progress', 'completed'
    recommended_course TEXT,
    practice_project TEXT,
    priority_level TEXT DEFAULT 'High',       -- 'High', 'Medium', 'Low'
    weekly_plan_notes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (target_job_role_id) REFERENCES job_roles(id) ON DELETE SET NULL
);
