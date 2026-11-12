"""
Database initialization and seeding script for AI-Based Job Recommendation System.
Uses standard Python sqlite3 library to seed initial master data for the 13 job roles,
master skills taxonomy, admin user, and sample student profiles.
"""

import sqlite3
import os
import hashlib

DB_PATH = os.path.join(os.path.dirname(__file__), 'job_recommender.db')
SCHEMA_PATH = os.path.join(os.path.dirname(__file__), 'schema.sql')

def hash_password(password: str) -> str:
    # Use SHA-256 with salt for standalone portable compatibility
    salt = "ai_job_salt_2026"
    return hashlib.sha256((salt + password).encode('utf-8')).hexdigest()

def init_database():
    print(f"Initializing database at: {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Read and execute schema
    with open(SCHEMA_PATH, 'r') as f:
        schema_sql = f.read()
    cursor.executescript(schema_sql)

    # 1. Seed Master Users (Admin and Demo Student)
    admin_pw = hash_password("admin123")
    student_pw = hash_password("student123")

    cursor.execute("""
        INSERT INTO users (full_name, email, password_hash, role)
        VALUES 
        ('System Administrator', 'admin@careerai.edu', ?, 'admin'),
        ('Alex Chen', 'student@careerai.edu', ?, 'student')
    """, (admin_pw, student_pw))

    alex_user_id = cursor.lastrowid

    # 2. Master Skills Taxonomy
    master_skills = [
        ('Python', 'Programming', 'Very High'),
        ('Java', 'Programming', 'High'),
        ('JavaScript', 'Programming', 'Very High'),
        ('TypeScript', 'Programming', 'High'),
        ('C++', 'Programming', 'Medium'),
        ('SQL', 'Database', 'Very High'),
        ('PostgreSQL', 'Database', 'High'),
        ('MySQL', 'Database', 'High'),
        ('MongoDB', 'Database', 'High'),
        ('Pandas', 'Data Science', 'High'),
        ('NumPy', 'Data Science', 'High'),
        ('Scikit-learn', 'Data Science', 'High'),
        ('TensorFlow', 'Data Science', 'Very High'),
        ('PyTorch', 'Data Science', 'Very High'),
        ('NLP', 'Data Science', 'High'),
        ('Deep Learning', 'Data Science', 'High'),
        ('Data Visualization', 'Data Science', 'High'),
        ('Tableau', 'Data Science', 'Medium'),
        ('Power BI', 'Data Science', 'High'),
        ('HTML5/CSS3', 'Web Development', 'High'),
        ('React', 'Web Development', 'Very High'),
        ('Node.js', 'Web Development', 'High'),
        ('Flask', 'Web Development', 'High'),
        ('Django', 'Web Development', 'High'),
        ('Spring Boot', 'Web Development', 'High'),
        ('REST APIs', 'Software Engineering', 'Very High'),
        ('Docker', 'Cloud & DevOps', 'Very High'),
        ('Kubernetes', 'Cloud & DevOps', 'High'),
        ('AWS', 'Cloud & DevOps', 'Very High'),
        ('Azure', 'Cloud & DevOps', 'High'),
        ('GCP', 'Cloud & DevOps', 'High'),
        ('CI/CD Pipelines', 'Cloud & DevOps', 'High'),
        ('Git/GitHub', 'Software Engineering', 'Very High'),
        ('System Design', 'Software Engineering', 'High'),
        ('Linux/Bash', 'Cloud & DevOps', 'High'),
        ('Network Security', 'Cybersecurity', 'High'),
        ('Ethical Hacking', 'Cybersecurity', 'High'),
        ('Cryptography', 'Cybersecurity', 'Medium'),
        ('Data Warehousing', 'Database', 'Medium'),
        ('Database Optimization', 'Database', 'Medium'),
        ('Business Intelligence', 'Data Science', 'Medium'),
        ('Requirements Gathering', 'Software Engineering', 'Medium')
    ]

    cursor.executemany("INSERT INTO skills (name, category, demand_level) VALUES (?, ?, ?)", master_skills)

    # 3. Master Job Roles (13 Roles with real industry requirements)
    job_roles_data = [
        (
            'Data Analyst',
            'Data & AI',
            'Collects, cleans, and interprets complex data sets to answer business questions, uncover trends, and create insightful dashboards.',
            'B.Tech / B.E., BCA, B.Sc CS, B.Sc Stats, MCA, M.Tech',
            6.5, 0.0,
            'Google Data Analytics Professional, Microsoft Certified Data Analyst, Tableau Desktop Specialist',
            'Junior Data Analyst -> Senior Data Analyst -> Analytics Manager -> Head of Business Intelligence',
            '$65,000 - $95,000 / year'
        ),
        (
            'Data Scientist',
            'Data & AI',
            'Leverages statistical analysis, predictive modeling, machine learning algorithms, and deep domain expertise to solve complex data challenges.',
            'B.Tech / B.E., M.Tech, M.Sc CS/Stats/Math, MCA',
            7.0, 0.5,
            'IBM Data Science Professional, AWS Certified Machine Learning, Coursera Deep Learning Specialization',
            'Junior Data Scientist -> Senior Data Scientist -> Lead AI/ML Scientist -> VP of Data Science',
            '$95,000 - $145,000 / year'
        ),
        (
            'Machine Learning Engineer',
            'Data & AI',
            'Designs, trains, and deploys scalable machine learning models into production software systems, optimizing throughput and inference latency.',
            'B.Tech / B.E., M.Tech, MCA, M.Sc CS',
            7.2, 0.5,
            'TensorFlow Developer Certificate, AWS Certified Machine Learning Specialty, Azure AI Engineer',
            'ML Engineer -> Senior ML Engineer -> Staff MLOps Engineer -> Director of Applied AI',
            '$105,000 - $160,000 / year'
        ),
        (
            'Python Developer',
            'Software Engineering',
            'Develops backend logic, microservices, automated pipelines, and web APIs using Python ecosystems and modern architectural principles.',
            'B.Tech / B.E., BCA, MCA, B.Sc CS',
            6.0, 0.0,
            'PCEP Certified Entry-Level Python Programmer, PCAP Certified Associate Python Programmer',
            'Junior Python Developer -> Senior Python Developer -> Tech Lead -> Engineering Manager',
            '$75,000 - $115,000 / year'
        ),
        (
            'Java Developer',
            'Software Engineering',
            'Builds robust, enterprise-grade distributed applications, microservices, and transaction management backends with Java and Spring frameworks.',
            'B.Tech / B.E., MCA, B.Sc CS, M.Tech',
            6.5, 0.0,
            'Oracle Certified Professional: Java SE Programmer, Spring Professional Certification',
            'Java Developer -> Senior Backend Engineer -> Principal Enterprise Architect',
            '$80,000 - $125,000 / year'
        ),
        (
            'Web Developer',
            'Web Development',
            'Creates responsive, user-friendly, and visually engaging web interfaces using HTML, CSS, JavaScript, and modern frontend tools.',
            'B.Tech / B.E., BCA, B.Sc CS, Diploma in CS/IT',
            6.0, 0.0,
            'Meta Front-End Developer Certificate, W3Cx Front-End Web Developer',
            'Junior Web Developer -> Senior Frontend Developer -> UI Architect -> Creative Tech Director',
            '$60,000 - $95,000 / year'
        ),
        (
            'Full Stack Developer',
            'Web Development',
            'Builds end-to-end web applications covering both interactive client-side interfaces and scalable server-side APIs with databases.',
            'B.Tech / B.E., MCA, BCA, B.Sc CS, M.Tech',
            6.5, 0.5,
            'Meta Full-Stack Engineer Certificate, AWS Certified Developer Associate',
            'Full Stack Engineer -> Senior Full Stack Engineer -> Lead Architect -> VP of Engineering',
            '$85,000 - $135,000 / year'
        ),
        (
            'Software Engineer',
            'Software Engineering',
            'Applies computer science fundamentals, algorithms, system design, and clean architecture to build reliable, high-performance software products.',
            'B.Tech / B.E., M.Tech, MCA, B.Sc CS',
            6.8, 0.0,
            'IEEE Certified Software Development Professional, AWS Solutions Architect Associate',
            'Software Engineer I -> Software Engineer II -> Senior Software Engineer -> Staff Engineer -> Principal Architect',
            '$85,000 - $140,000 / year'
        ),
        (
            'Business Analyst',
            'Business & Strategy',
            'Bridges the gap between business stakeholders and technology teams by analyzing processes, gathering requirements, and driving digital transformation.',
            'B.Tech / B.E., MBA, BBA, B.Com (IT), MCA, BCA',
            6.5, 0.0,
            'CBAP (Certified Business Analysis Professional), PMI-PBA, Scrum Product Owner (CSPO)',
            'Associate Business Analyst -> Lead Business Analyst -> Product Manager -> Director of Product',
            '$70,000 - $110,000 / year'
        ),
        (
            'Cloud Engineer',
            'Cloud & Infrastructure',
            'Architects, deploys, monitors, and optimizes cloud computing infrastructure and automated CI/CD pipelines across AWS, Azure, or GCP.',
            'B.Tech / B.E., MCA, B.Sc CS, M.Tech',
            6.5, 0.5,
            'AWS Certified Solutions Architect, Google Associate Cloud Engineer, Microsoft Azure Fundamentals/Administrator',
            'Cloud Engineer -> Senior DevOps Engineer -> Cloud Solutions Architect -> Chief Technology Officer',
            '$90,000 - $145,000 / year'
        ),
        (
            'Database Administrator',
            'Database & Data Engineering',
            'Ensures maximum availability, security, high performance, backup recovery, and optimal schema indexing of mission-critical relational and NoSQL databases.',
            'B.Tech / B.E., MCA, BCA, B.Sc CS',
            6.5, 0.5,
            'Oracle Certified Database Administrator, PostgreSQL Certified Associate, Microsoft Certified: Azure Database Administrator',
            'Junior DBA -> Senior DBA -> Lead Data Infrastructure Architect -> Head of Data Platforms',
            '$78,000 - $120,000 / year'
        ),
        (
            'AI Engineer',
            'Data & AI',
            'Develops production-ready generative AI, LLM applications, multimodal systems, and autonomous agent workflows integrating modern AI APIs.',
            'B.Tech / B.E., M.Tech, MCA, M.Sc CS',
            7.2, 0.5,
            'Google Cloud Certified Professional Machine Learning Engineer, NVIDIA Deep Learning Institute Certificate',
            'Applied AI Engineer -> Senior AI Research Engineer -> Principal AI Architect -> Chief AI Officer',
            '$115,000 - $175,000 / year'
        ),
        (
            'Cybersecurity Analyst',
            'Security & Operations',
            'Monitors, detects, investigates, and mitigates security threats, vulnerabilities, and unauthorized access across networks, servers, and applications.',
            'B.Tech / B.E., MCA, B.Sc CS, B.Sc IT',
            6.5, 0.0,
            'CompTIA Security+, Certified Ethical Hacker (CEH), CISSP, Cisco Certified CyberOps Associate',
            'Cybersecurity Analyst -> Threat Hunter -> Security Architect -> Chief Information Security Officer (CISO)',
            '$80,000 - $130,000 / year'
        )
    ]

    cursor.executemany("""
        INSERT INTO job_roles (
            title, domain, description, educational_requirements, 
            min_cgpa, min_experience_years, preferred_certifications, 
            career_growth_opportunities, salary_range
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, job_roles_data)

    # 4. Map Job Requirements (Skills, Weights, and Mandatory Status)
    # Fetch job role IDs
    cursor.execute("SELECT id, title FROM job_roles")
    role_map = {title: id for id, title in cursor.fetchall()}

    job_requirements_data = [
        # Data Analyst
        (role_map['Data Analyst'], 'SQL', 1, 1.5),
        (role_map['Data Analyst'], 'Python', 1, 1.3),
        (role_map['Data Analyst'], 'Data Visualization', 1, 1.4),
        (role_map['Data Analyst'], 'Tableau', 0, 1.0),
        (role_map['Data Analyst'], 'Power BI', 0, 1.2),
        (role_map['Data Analyst'], 'Pandas', 1, 1.2),

        # Data Scientist
        (role_map['Data Scientist'], 'Python', 1, 1.5),
        (role_map['Data Scientist'], 'Scikit-learn', 1, 1.4),
        (role_map['Data Scientist'], 'Pandas', 1, 1.3),
        (role_map['Data Scientist'], 'NumPy', 1, 1.2),
        (role_map['Data Scientist'], 'SQL', 1, 1.2),
        (role_map['Data Scientist'], 'Deep Learning', 0, 1.2),
        (role_map['Data Scientist'], 'NLP', 0, 1.1),

        # Machine Learning Engineer
        (role_map['Machine Learning Engineer'], 'Python', 1, 1.5),
        (role_map['Machine Learning Engineer'], 'TensorFlow', 1, 1.4),
        (role_map['Machine Learning Engineer'], 'PyTorch', 0, 1.3),
        (role_map['Machine Learning Engineer'], 'Scikit-learn', 1, 1.3),
        (role_map['Machine Learning Engineer'], 'Docker', 1, 1.2),
        (role_map['Machine Learning Engineer'], 'REST APIs', 1, 1.1),

        # Python Developer
        (role_map['Python Developer'], 'Python', 1, 1.8),
        (role_map['Python Developer'], 'Flask', 0, 1.3),
        (role_map['Python Developer'], 'Django', 0, 1.3),
        (role_map['Python Developer'], 'SQL', 1, 1.2),
        (role_map['Python Developer'], 'REST APIs', 1, 1.3),
        (role_map['Python Developer'], 'Git/GitHub', 1, 1.1),

        # Java Developer
        (role_map['Java Developer'], 'Java', 1, 1.8),
        (role_map['Java Developer'], 'Spring Boot', 1, 1.5),
        (role_map['Java Developer'], 'SQL', 1, 1.3),
        (role_map['Java Developer'], 'REST APIs', 1, 1.2),
        (role_map['Java Developer'], 'Git/GitHub', 1, 1.1),

        # Web Developer
        (role_map['Web Developer'], 'HTML5/CSS3', 1, 1.6),
        (role_map['Web Developer'], 'JavaScript', 1, 1.6),
        (role_map['Web Developer'], 'React', 0, 1.3),
        (role_map['Web Developer'], 'Git/GitHub', 1, 1.1),

        # Full Stack Developer
        (role_map['Full Stack Developer'], 'JavaScript', 1, 1.5),
        (role_map['Full Stack Developer'], 'React', 1, 1.4),
        (role_map['Full Stack Developer'], 'Node.js', 1, 1.4),
        (role_map['Full Stack Developer'], 'SQL', 1, 1.2),
        (role_map['Full Stack Developer'], 'REST APIs', 1, 1.3),
        (role_map['Full Stack Developer'], 'Docker', 0, 1.0),

        # Software Engineer
        (role_map['Software Engineer'], 'Python', 0, 1.3),
        (role_map['Software Engineer'], 'Java', 0, 1.3),
        (role_map['Software Engineer'], 'SQL', 1, 1.2),
        (role_map['Software Engineer'], 'System Design', 1, 1.4),
        (role_map['Software Engineer'], 'Git/GitHub', 1, 1.3),
        (role_map['Software Engineer'], 'REST APIs', 1, 1.2),

        # Business Analyst
        (role_map['Business Analyst'], 'SQL', 1, 1.3),
        (role_map['Business Analyst'], 'Tableau', 0, 1.2),
        (role_map['Business Analyst'], 'Power BI', 1, 1.4),
        (role_map['Business Analyst'], 'Requirements Gathering', 1, 1.6),
        (role_map['Business Analyst'], 'Business Intelligence', 1, 1.3),

        # Cloud Engineer
        (role_map['Cloud Engineer'], 'AWS', 1, 1.6),
        (role_map['Cloud Engineer'], 'Docker', 1, 1.4),
        (role_map['Cloud Engineer'], 'Kubernetes', 0, 1.3),
        (role_map['Cloud Engineer'], 'Linux/Bash', 1, 1.3),
        (role_map['Cloud Engineer'], 'CI/CD Pipelines', 1, 1.3),

        # Database Administrator
        (role_map['Database Administrator'], 'SQL', 1, 1.8),
        (role_map['Database Administrator'], 'PostgreSQL', 1, 1.5),
        (role_map['Database Administrator'], 'MySQL', 1, 1.4),
        (role_map['Database Administrator'], 'Database Optimization', 1, 1.5),
        (role_map['Database Administrator'], 'Linux/Bash', 0, 1.1),

        # AI Engineer
        (role_map['AI Engineer'], 'Python', 1, 1.6),
        (role_map['AI Engineer'], 'PyTorch', 1, 1.4),
        (role_map['AI Engineer'], 'Deep Learning', 1, 1.4),
        (role_map['AI Engineer'], 'NLP', 1, 1.3),
        (role_map['AI Engineer'], 'REST APIs', 1, 1.2),
        (role_map['AI Engineer'], 'Docker', 0, 1.1),

        # Cybersecurity Analyst
        (role_map['Cybersecurity Analyst'], 'Network Security', 1, 1.7),
        (role_map['Cybersecurity Analyst'], 'Linux/Bash', 1, 1.4),
        (role_map['Cybersecurity Analyst'], 'Ethical Hacking', 0, 1.3),
        (role_map['Cybersecurity Analyst'], 'Cryptography', 0, 1.2),
        (role_map['Cybersecurity Analyst'], 'Python', 0, 1.1)
    ]

    cursor.executemany("""
        INSERT INTO job_requirements (job_role_id, skill_name, is_mandatory, weight)
        VALUES (?, ?, ?, ?)
    """, job_requirements_data)

    # 5. Seed Alex's sample profile for testing
    cursor.execute("""
        INSERT INTO student_profiles (
            user_id, highest_qualification, degree, specialization, graduation_year,
            cgpa, technical_skills, programming_languages, database_skills,
            certifications, internship_experience, projects, work_experience_years,
            career_interests, preferred_location
        ) VALUES (
            ?, 'B.Tech / B.E.', 'Bachelor of Technology', 'Computer Science and Engineering', 2025,
            8.4, 'Python, SQL, Pandas, NumPy, Scikit-learn, HTML5/CSS3, Git/GitHub',
            'Python, JavaScript', 'PostgreSQL, MySQL',
            'Google Data Analytics Certificate, Coursera Machine Learning',
            '3 months Data Science Intern at TechCorp',
            'Predictive House Price Regression Model, Customer Segmentation Clustering App',
            0.5, 'Data Science, Machine Learning, AI', 'San Francisco / Remote'
        )
    """, (alex_user_id,))

    conn.commit()
    conn.close()
    print("Database initialization and dataset seeding completed successfully!")

if __name__ == '__main__':
    init_database()
