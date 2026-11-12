import React, { useState, useMemo } from 'react';
import {
  Brain,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sliders,
  Briefcase,
  Terminal,
  FileCode2,
  Database,
  Lock,
  User,
  Mail,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Layers,
  Search,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Lightbulb,
  Cpu,
  BookOpen,
  Award,
  Download,
  FolderArchive,
  Printer,
  Compass,
  FileText,
  UserCheck,
  Plus,
  Trash2,
  Filter,
  RefreshCw,
  Clock,
  ArrowUpRight,
  Target
} from 'lucide-react';

// Master Job Roles Dataset (13 Roles with industry qualification criteria and skill matrices)
export interface JobRequirement {
  skill: string;
  mandatory: boolean;
  weight: number;
}

export interface JobRole {
  id: number;
  title: string;
  domain: string;
  description: string;
  qualifications: string[];
  minCgpa: number;
  salaryRange: string;
  requirements: JobRequirement[];
  certifications: string;
  careerGrowth: string;
}

export const MASTER_JOB_ROLES: JobRole[] = [
  {
    id: 1,
    title: 'Data Analyst',
    domain: 'Data & AI',
    description: 'Collects, cleans, and interprets complex data sets to answer business questions, uncover trends, and create insightful dashboards.',
    qualifications: ['B.Tech / B.E.', 'BCA', 'B.Sc CS', 'MCA', 'M.Tech'],
    minCgpa: 6.5,
    salaryRange: '$65,000 - $95,000 / yr',
    requirements: [
      { skill: 'SQL', mandatory: true, weight: 1.5 },
      { skill: 'Python', mandatory: true, weight: 1.3 },
      { skill: 'Data Visualization', mandatory: true, weight: 1.4 },
      { skill: 'Pandas', mandatory: true, weight: 1.2 },
      { skill: 'Power BI', mandatory: false, weight: 1.2 },
      { skill: 'Tableau', mandatory: false, weight: 1.0 }
    ],
    certifications: 'Google Data Analytics Professional, Tableau Desktop Specialist',
    careerGrowth: 'Junior Data Analyst → Senior Data Analyst → Analytics Manager → Head of BI'
  },
  {
    id: 2,
    title: 'Data Scientist',
    domain: 'Data & AI',
    description: 'Leverages statistical analysis, predictive modeling, machine learning algorithms, and deep domain expertise to solve complex data challenges.',
    qualifications: ['B.Tech / B.E.', 'M.Tech', 'B.Sc CS', 'MCA'],
    minCgpa: 7.0,
    salaryRange: '$95,000 - $145,000 / yr',
    requirements: [
      { skill: 'Python', mandatory: true, weight: 1.5 },
      { skill: 'Scikit-learn', mandatory: true, weight: 1.4 },
      { skill: 'Pandas', mandatory: true, weight: 1.3 },
      { skill: 'NumPy', mandatory: true, weight: 1.2 },
      { skill: 'SQL', mandatory: true, weight: 1.2 },
      { skill: 'Deep Learning', mandatory: false, weight: 1.2 }
    ],
    certifications: 'IBM Data Science Professional, AWS Machine Learning Specialty',
    careerGrowth: 'Junior Data Scientist → Senior Data Scientist → Lead AI Scientist → VP Data Science'
  },
  {
    id: 3,
    title: 'Machine Learning Engineer',
    domain: 'Data & AI',
    description: 'Designs, trains, and deploys scalable machine learning models into production software systems, optimizing throughput and inference latency.',
    qualifications: ['B.Tech / B.E.', 'M.Tech', 'MCA'],
    minCgpa: 7.2,
    salaryRange: '$105,000 - $160,000 / yr',
    requirements: [
      { skill: 'Python', mandatory: true, weight: 1.5 },
      { skill: 'TensorFlow', mandatory: true, weight: 1.4 },
      { skill: 'PyTorch', mandatory: false, weight: 1.3 },
      { skill: 'Scikit-learn', mandatory: true, weight: 1.3 },
      { skill: 'Docker', mandatory: true, weight: 1.2 },
      { skill: 'REST APIs', mandatory: true, weight: 1.1 }
    ],
    certifications: 'TensorFlow Developer Certificate, Azure AI Engineer Associate',
    careerGrowth: 'ML Engineer → Senior ML Engineer → Staff MLOps Engineer → Director of Applied AI'
  },
  {
    id: 4,
    title: 'Python Developer',
    domain: 'Software Engineering',
    description: 'Develops backend logic, microservices, automated pipelines, and web APIs using Python ecosystems and modern architectural principles.',
    qualifications: ['B.Tech / B.E.', 'BCA', 'MCA', 'B.Sc CS'],
    minCgpa: 6.0,
    salaryRange: '$75,000 - $115,000 / yr',
    requirements: [
      { skill: 'Python', mandatory: true, weight: 1.8 },
      { skill: 'Flask', mandatory: false, weight: 1.3 },
      { skill: 'Django', mandatory: false, weight: 1.3 },
      { skill: 'SQL', mandatory: true, weight: 1.2 },
      { skill: 'REST APIs', mandatory: true, weight: 1.3 },
      { skill: 'Git/GitHub', mandatory: true, weight: 1.1 }
    ],
    certifications: 'PCAP Certified Associate Python Programmer, PCEP',
    careerGrowth: 'Junior Python Dev → Senior Backend Dev → Tech Lead → Engineering Manager'
  },
  {
    id: 5,
    title: 'Java Developer',
    domain: 'Software Engineering',
    description: 'Builds robust, enterprise-grade distributed applications, microservices, and transaction management backends with Java and Spring frameworks.',
    qualifications: ['B.Tech / B.E.', 'MCA', 'B.Sc CS', 'M.Tech'],
    minCgpa: 6.5,
    salaryRange: '$80,000 - $125,000 / yr',
    requirements: [
      { skill: 'Java', mandatory: true, weight: 1.8 },
      { skill: 'Spring Boot', mandatory: true, weight: 1.5 },
      { skill: 'SQL', mandatory: true, weight: 1.3 },
      { skill: 'REST APIs', mandatory: true, weight: 1.2 },
      { skill: 'Git/GitHub', mandatory: true, weight: 1.1 }
    ],
    certifications: 'Oracle Certified Professional Java SE, Spring Professional',
    careerGrowth: 'Java Developer → Senior Backend Engineer → Enterprise Architect'
  },
  {
    id: 6,
    title: 'Web Developer',
    domain: 'Web Development',
    description: 'Creates responsive, user-friendly, and visually engaging web interfaces using HTML, CSS, JavaScript, and modern frontend tools.',
    qualifications: ['B.Tech / B.E.', 'BCA', 'B.Sc CS'],
    minCgpa: 6.0,
    salaryRange: '$60,000 - $95,000 / yr',
    requirements: [
      { skill: 'HTML5/CSS3', mandatory: true, weight: 1.6 },
      { skill: 'JavaScript', mandatory: true, weight: 1.6 },
      { skill: 'React', mandatory: false, weight: 1.3 },
      { skill: 'Git/GitHub', mandatory: true, weight: 1.1 }
    ],
    certifications: 'Meta Front-End Developer Certificate, W3Cx Front-End Web Dev',
    careerGrowth: 'Junior Web Dev → Senior Frontend Dev → UI Architect → Creative Tech Lead'
  },
  {
    id: 7,
    title: 'Full Stack Developer',
    domain: 'Web Development',
    description: 'Builds end-to-end web applications covering both interactive client-side interfaces and scalable server-side APIs with databases.',
    qualifications: ['B.Tech / B.E.', 'MCA', 'BCA', 'B.Sc CS', 'M.Tech'],
    minCgpa: 6.5,
    salaryRange: '$85,000 - $135,000 / yr',
    requirements: [
      { skill: 'JavaScript', mandatory: true, weight: 1.5 },
      { skill: 'React', mandatory: true, weight: 1.4 },
      { skill: 'Node.js', mandatory: true, weight: 1.4 },
      { skill: 'SQL', mandatory: true, weight: 1.2 },
      { skill: 'REST APIs', mandatory: true, weight: 1.3 },
      { skill: 'Docker', mandatory: false, weight: 1.0 }
    ],
    certifications: 'Meta Full-Stack Engineer Certificate, AWS Certified Developer',
    careerGrowth: 'Full Stack Engineer → Senior Engineer → Lead Architect → VP Engineering'
  },
  {
    id: 8,
    title: 'Software Engineer',
    domain: 'Software Engineering',
    description: 'Applies computer science fundamentals, algorithms, system design, and clean architecture to build reliable, high-performance software products.',
    qualifications: ['B.Tech / B.E.', 'M.Tech', 'MCA', 'B.Sc CS'],
    minCgpa: 6.8,
    salaryRange: '$85,000 - $140,000 / yr',
    requirements: [
      { skill: 'System Design', mandatory: true, weight: 1.4 },
      { skill: 'Git/GitHub', mandatory: true, weight: 1.3 },
      { skill: 'SQL', mandatory: true, weight: 1.2 },
      { skill: 'REST APIs', mandatory: true, weight: 1.2 },
      { skill: 'Python', mandatory: false, weight: 1.3 },
      { skill: 'Java', mandatory: false, weight: 1.3 }
    ],
    certifications: 'IEEE Certified Software Development Professional, AWS Solutions Architect',
    careerGrowth: 'SWE I → SWE II → Senior Software Engineer → Staff Engineer → Principal Architect'
  },
  {
    id: 9,
    title: 'Business Analyst',
    domain: 'Business & Strategy',
    description: 'Bridges the gap between business stakeholders and technology teams by analyzing processes, gathering requirements, and driving digital transformation.',
    qualifications: ['B.Tech / B.E.', 'BCA', 'MCA', 'B.Sc CS'],
    minCgpa: 6.5,
    salaryRange: '$70,000 - $110,000 / yr',
    requirements: [
      { skill: 'Requirements Gathering', mandatory: true, weight: 1.6 },
      { skill: 'Power BI', mandatory: true, weight: 1.4 },
      { skill: 'SQL', mandatory: true, weight: 1.3 },
      { skill: 'Business Intelligence', mandatory: true, weight: 1.3 },
      { skill: 'Tableau', mandatory: false, weight: 1.2 }
    ],
    certifications: 'CBAP (Certified Business Analysis Professional), PMI-PBA',
    careerGrowth: 'Associate BA → Senior Business Analyst → Product Manager → Director of Product'
  },
  {
    id: 10,
    title: 'Cloud Engineer',
    domain: 'Cloud & Infrastructure',
    description: 'Architects, deploys, monitors, and optimizes cloud computing infrastructure and automated CI/CD pipelines across AWS, Azure, or GCP.',
    qualifications: ['B.Tech / B.E.', 'MCA', 'B.Sc CS', 'M.Tech'],
    minCgpa: 6.5,
    salaryRange: '$90,000 - $145,000 / yr',
    requirements: [
      { skill: 'AWS', mandatory: true, weight: 1.6 },
      { skill: 'Docker', mandatory: true, weight: 1.4 },
      { skill: 'Linux/Bash', mandatory: true, weight: 1.3 },
      { skill: 'CI/CD Pipelines', mandatory: true, weight: 1.3 },
      { skill: 'Kubernetes', mandatory: false, weight: 1.3 }
    ],
    certifications: 'AWS Certified Solutions Architect, Google Associate Cloud Engineer',
    careerGrowth: 'Cloud Engineer → Senior DevOps Engineer → Cloud Architect → CTO'
  },
  {
    id: 11,
    title: 'Database Administrator',
    domain: 'Database & Infrastructure',
    description: 'Ensures maximum availability, security, high performance, backup recovery, and optimal schema indexing of mission-critical relational databases.',
    qualifications: ['B.Tech / B.E.', 'MCA', 'BCA', 'B.Sc CS'],
    minCgpa: 6.5,
    salaryRange: '$78,000 - $120,000 / yr',
    requirements: [
      { skill: 'SQL', mandatory: true, weight: 1.8 },
      { skill: 'PostgreSQL', mandatory: true, weight: 1.5 },
      { skill: 'MySQL', mandatory: true, weight: 1.4 },
      { skill: 'Database Optimization', mandatory: true, weight: 1.5 },
      { skill: 'Linux/Bash', mandatory: false, weight: 1.1 }
    ],
    certifications: 'Oracle Certified DBA, PostgreSQL Certified Associate, Azure Database Admin',
    careerGrowth: 'Junior DBA → Senior DBA → Data Infrastructure Architect → Head of Data'
  },
  {
    id: 12,
    title: 'AI Engineer',
    domain: 'Data & AI',
    description: 'Develops production-ready generative AI, LLM applications, multimodal systems, and autonomous agent workflows integrating modern AI APIs.',
    qualifications: ['B.Tech / B.E.', 'M.Tech', 'MCA'],
    minCgpa: 7.2,
    salaryRange: '$115,000 - $175,000 / yr',
    requirements: [
      { skill: 'Python', mandatory: true, weight: 1.6 },
      { skill: 'PyTorch', mandatory: true, weight: 1.4 },
      { skill: 'Deep Learning', mandatory: true, weight: 1.4 },
      { skill: 'NLP', mandatory: true, weight: 1.3 },
      { skill: 'REST APIs', mandatory: true, weight: 1.2 },
      { skill: 'Docker', mandatory: false, weight: 1.1 }
    ],
    certifications: 'Google Cloud Professional ML Engineer, NVIDIA Deep Learning Institute',
    careerGrowth: 'Applied AI Engineer → Senior AI Research Engineer → Principal AI Architect'
  },
  {
    id: 13,
    title: 'Cybersecurity Analyst',
    domain: 'Security & Operations',
    description: 'Monitors, detects, investigates, and mitigates security threats, vulnerabilities, and unauthorized access across networks, servers, and applications.',
    qualifications: ['B.Tech / B.E.', 'MCA', 'B.Sc CS'],
    minCgpa: 6.5,
    salaryRange: '$80,000 - $130,000 / yr',
    requirements: [
      { skill: 'Network Security', mandatory: true, weight: 1.7 },
      { skill: 'Linux/Bash', mandatory: true, weight: 1.4 },
      { skill: 'Ethical Hacking', mandatory: false, weight: 1.3 },
      { skill: 'Python', mandatory: false, weight: 1.1 }
    ],
    certifications: 'CompTIA Security+, Certified Ethical Hacker (CEH), CISSP',
    careerGrowth: 'Security Analyst → Threat Hunter → Security Architect → CISO'
  }
];

export const AVAILABLE_SKILLS = [
  'Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch',
  'JavaScript', 'React', 'Node.js', 'HTML5/CSS3', 'Flask', 'Django', 'Java',
  'Spring Boot', 'AWS', 'Docker', 'Kubernetes', 'Linux/Bash', 'REST APIs',
  'Git/GitHub', 'Power BI', 'Tableau', 'Network Security', 'PostgreSQL',
  'Database Optimization', 'System Design', 'Requirements Gathering', 'Deep Learning', 'NLP'
];

export interface StudentProfileData {
  fullName: string;
  email: string;
  highestQualification: string;
  degree: string;
  specialization: string;
  graduationYear: number;
  cgpa: number;
  technicalSkills: string[];
  programmingLanguages: string[];
  databaseSkills: string[];
  certifications: string;
  internshipExperience: string;
  projects: string;
  workExperienceYears: number;
  careerInterests: string[];
  preferredLocation: string;
}

export const DEFAULT_STUDENT_PROFILE: StudentProfileData = {
  fullName: 'Alex Chen',
  email: 'student@careerai.edu',
  highestQualification: 'B.Tech / B.E.',
  degree: 'Bachelor of Technology',
  specialization: 'Computer Science and Engineering',
  graduationYear: 2025,
  cgpa: 8.4,
  technicalSkills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'Git/GitHub'],
  programmingLanguages: ['Python', 'JavaScript'],
  databaseSkills: ['PostgreSQL', 'MySQL'],
  certifications: 'Google Data Analytics Professional, Coursera Machine Learning',
  internshipExperience: '3 months Data Science Intern at TechCorp (EDA, churn prediction)',
  projects: 'Predictive House Price Regression Model, Customer Segmentation Clustering App',
  workExperienceYears: 0.5,
  careerInterests: ['Data Science', 'Machine Learning', 'AI Engineering'],
  preferredLocation: 'Remote / Bangalore / San Francisco'
};

export type ActiveView = 'home' | 'profile' | 'recommendations' | 'dashboard' | 'whatif' | 'roadmap' | 'admin' | 'report';

export default function App() {
  // Navigation / Direct View Routing
  const [activeView, setActiveView] = useState<ActiveView>('home');

  // Student Profile State
  const [profile, setProfile] = useState<StudentProfileData>(DEFAULT_STUDENT_PROFILE);

  // Filter & UI States
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('All');
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobRole | null>(null);

  // What-If Simulator State
  const [whatIfTargetRole, setWhatIfTargetRole] = useState<string>('Machine Learning Engineer');
  const [hypotheticalSkills, setHypotheticalSkills] = useState<string[]>(['TensorFlow', 'Docker']);

  // Modals & User
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string }>({
    name: 'Alex Chen',
    email: 'student@careerai.edu',
    role: 'student'
  });

  // Calculate Real Matching Scores based on profile
  const calculatedMatches = useMemo(() => {
    return MASTER_JOB_ROLES.map(role => {
      // 1. Qualification criteria check
      const qualMatch = role.qualifications.includes(profile.highestQualification);
      const cgpaEligible = profile.cgpa >= role.minCgpa;
      const qualScore = qualMatch && cgpaEligible ? 100 : qualMatch ? 85 : 50;

      // 2. Skill weight calculation
      let totalWeight = 0;
      let matchedWeight = 0;
      const matchedSkills: string[] = [];
      const missingSkills: string[] = [];

      role.requirements.forEach(req => {
        totalWeight += req.weight;
        // Check if student has skill
        if (profile.technicalSkills.includes(req.skill)) {
          matchedSkills.push(req.skill);
          matchedWeight += req.weight;
        } else {
          missingSkills.push(req.skill);
        }
      });

      const skillScore = totalWeight > 0 ? (matchedWeight / totalWeight) * 100 : 0;
      // Formula: 60% skills + 40% qualification match
      const overallMatch = Math.round((0.6 * skillScore) + (0.4 * qualScore));

      let explanation = '';
      if (overallMatch >= 80) {
        explanation = `Outstanding fit for ${role.title}! Strong academic qualification match (${profile.highestQualification}) with ${matchedSkills.length} key technical skills verified.`;
      } else if (overallMatch >= 60) {
        explanation = `Promising alignment. Core education matches, but recommended to bridge ${missingSkills.slice(0, 2).join(', ')} to maximize hiring potential.`;
      } else {
        explanation = `Foundational gap in ${missingSkills.slice(0, 2).join(', ')}. Target prerequisites before targeting senior postings.`;
      }

      return {
        ...role,
        matchScore: overallMatch,
        qualScore,
        skillScore: Math.round(skillScore),
        matchedSkills,
        missingSkills,
        explanation
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [profile]);

  // What-If Calculations
  const whatIfCalculation = useMemo(() => {
    const role = MASTER_JOB_ROLES.find(r => r.title === whatIfTargetRole) || MASTER_JOB_ROLES[2];
    const qualMatch = role.qualifications.includes(profile.highestQualification);
    const qualScore = qualMatch ? 100 : 50;

    const currentSkills = profile.technicalSkills;
    const combinedSkills = Array.from(new Set([...currentSkills, ...hypotheticalSkills]));

    let totalWeight = 0;
    let baseMatchedWeight = 0;
    let simulatedMatchedWeight = 0;

    role.requirements.forEach(req => {
      totalWeight += req.weight;
      if (currentSkills.includes(req.skill)) {
        baseMatchedWeight += req.weight;
      }
      if (combinedSkills.includes(req.skill)) {
        simulatedMatchedWeight += req.weight;
      }
    });

    const baseSkillScore = totalWeight > 0 ? (baseMatchedWeight / totalWeight) * 100 : 0;
    const baseOverall = Math.round((0.6 * baseSkillScore) + (0.4 * qualScore));

    const simulatedSkillScore = totalWeight > 0 ? (simulatedMatchedWeight / totalWeight) * 100 : 0;
    const simulatedOverall = Math.round((0.6 * simulatedSkillScore) + (0.4 * qualScore));

    const boost = Math.max(0, simulatedOverall - baseOverall);

    return {
      role,
      baseOverall,
      simulatedOverall,
      boost,
      missingAfterSim: role.requirements.filter(r => !combinedSkills.includes(r.skill)).map(r => r.skill)
    };
  }, [profile, whatIfTargetRole, hypotheticalSkills]);

  // Navigation Helper
  const navigateTo = (view: ActiveView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skill toggle in Profile Form
  const toggleProfileSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.includes(skill)
        ? prev.technicalSkills.filter(s => s !== skill)
        : [...prev.technicalSkills, skill]
    }));
  };

  const toggleHypotheticalSkill = (skill: string) => {
    setHypotheticalSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* 1. TOP LIVE APP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white text-xs py-2 px-4 border-b border-indigo-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Cloud App
            </span>
            <span className="text-slate-200">
              Direct In-Browser Platform • No Download Required • Interactive Student Modules
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('profile')}
              className="text-blue-200 hover:text-white font-semibold underline flex items-center gap-1 cursor-pointer"
            >
              <span>Direct Student Evaluation</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. DIRECT GLOBAL APP NAVBAR WITH SEAMLESS VIEW SWITCHING */}
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo - Direct Home redirect */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                  CareerAI
                </span>
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-1.5 py-0.2 rounded">
                  DIRECT
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-none">Job Recommendation Platform</p>
            </div>
          </button>

          {/* Direct Navigation Links for all 8 Core Modules */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-300">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeView === 'home' ? 'bg-slate-800 text-blue-400 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigateTo('profile')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeView === 'profile' ? 'bg-slate-800 text-blue-400 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Profile</span>
            </button>

            <button
              onClick={() => navigateTo('recommendations')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeView === 'recommendations' ? 'bg-slate-800 text-blue-400 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>AI Recommendations</span>
            </button>

            <button
              onClick={() => navigateTo('dashboard')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeView === 'dashboard' ? 'bg-slate-800 text-blue-400 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => navigateTo('whatif')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeView === 'whatif' ? 'bg-slate-800 text-blue-400 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>What-If</span>
            </button>

            <button
              onClick={() => navigateTo('roadmap')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeView === 'roadmap' ? 'bg-slate-800 text-blue-400 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Roadmap</span>
            </button>

            <button
              onClick={() => navigateTo('admin')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeView === 'admin' ? 'bg-slate-800 text-blue-400 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => navigateTo('report')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                activeView === 'report' ? 'bg-slate-800 text-blue-400 font-bold' : 'hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Report</span>
            </button>
          </div>

          {/* User / Direct Action Profile Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('profile')}
              className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full text-xs hover:border-blue-500 transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-semibold text-slate-200">{currentUser.name}</span>
              <span className="bg-purple-600/30 text-purple-300 px-1.5 py-0.2 rounded text-[10px] uppercase font-bold">
                {currentUser.role}
              </span>
            </button>

            <button
              onClick={() => navigateTo('recommendations')}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>View Matches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile View Sub-Bar */}
        <div className="lg:hidden flex items-center justify-around bg-slate-950 px-2 py-2 border-t border-slate-800 text-[11px] overflow-x-auto gap-2">
          <button onClick={() => navigateTo('home')} className={`px-2 py-1 rounded ${activeView === 'home' ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>Home</button>
          <button onClick={() => navigateTo('profile')} className={`px-2 py-1 rounded ${activeView === 'profile' ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>Profile</button>
          <button onClick={() => navigateTo('recommendations')} className={`px-2 py-1 rounded ${activeView === 'recommendations' ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>Jobs</button>
          <button onClick={() => navigateTo('dashboard')} className={`px-2 py-1 rounded ${activeView === 'dashboard' ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>Dashboard</button>
          <button onClick={() => navigateTo('whatif')} className={`px-2 py-1 rounded ${activeView === 'whatif' ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>What-If</button>
          <button onClick={() => navigateTo('roadmap')} className={`px-2 py-1 rounded ${activeView === 'roadmap' ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>Roadmap</button>
          <button onClick={() => navigateTo('admin')} className={`px-2 py-1 rounded ${activeView === 'admin' ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>Admin</button>
        </div>
      </nav>

      {/* 3. MAIN DYNAMIC VIEW ROUTER */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {activeView === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white pt-16 pb-20 border-b border-slate-800">
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-blue-300">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="font-semibold">AI-Powered Direct Career Guidance</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                      AI-Based Job Recommendation Based on{' '}
                      <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                        Educational Qualifications
                      </span>
                    </h1>

                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                      Experience direct, transparent career matching. Enter your academic qualifications, degree, and skills to discover suitable technology roles with deterministic mathematical match scores and custom learning roadmaps.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => navigateTo('profile')}
                        className="px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-4 h-4" />
                        <span>Start Student Evaluation (Direct)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => navigateTo('recommendations')}
                        className="px-6 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Target className="w-4 h-4 text-emerald-400" />
                        <span>Browse 13 Recommended Roles</span>
                      </button>

                      <button
                        onClick={() => navigateTo('whatif')}
                        className="px-5 py-3.5 rounded-full bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 font-semibold text-sm border border-indigo-700/60 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Sliders className="w-4 h-4 text-purple-300" />
                        <span>What-If Simulator</span>
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 max-w-lg">
                      <div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-white">13</div>
                        <div className="text-xs text-slate-400 font-medium">Curated Tech Roles</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">100%</div>
                        <div className="text-xs text-slate-400 font-medium">Transparent Scoring</div>
                      </div>
                      <div>
                        <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">7</div>
                        <div className="text-xs text-slate-400 font-medium">Relational Tables</div>
                      </div>
                    </div>
                  </div>

                  {/* Top Candidate Snapshot Preview */}
                  <div className="lg:col-span-5">
                    <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                          <span className="text-xs font-bold text-white uppercase tracking-wider">Candidate Profile</span>
                        </div>
                        <button
                          onClick={() => navigateTo('profile')}
                          className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
                        >
                          Edit Profile →
                        </button>
                      </div>

                      <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-sm text-white">{profile.fullName}</span>
                          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono">
                            {profile.highestQualification} ({profile.cgpa} CGPA)
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">{profile.specialization} • Graduating {profile.graduationYear}</p>
                        <div className="flex flex-wrap gap-1">
                          {profile.technicalSkills.slice(0, 5).map(s => (
                            <span key={s} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                              {s}
                            </span>
                          ))}
                          {profile.technicalSkills.length > 5 && (
                            <span className="text-[10px] text-slate-400 px-1 py-0.5">+{profile.technicalSkills.length - 5} more</span>
                          )}
                        </div>
                      </div>

                      {/* Top Match Result Preview */}
                      <div className="p-4 bg-slate-900/90 rounded-xl border border-indigo-500/40 relative">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">Top Matched Role</span>
                            <h4 className="font-bold text-white text-base">{calculatedMatches[0]?.title}</h4>
                            <span className="text-xs text-slate-400">{calculatedMatches[0]?.domain} • {calculatedMatches[0]?.salaryRange}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-black text-emerald-400">{calculatedMatches[0]?.matchScore}%</span>
                            <div className="text-[10px] text-slate-400 uppercase">Match Score</div>
                          </div>
                        </div>

                        <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
                          <div className="bg-emerald-400 h-2 rounded-full" style={{ width: `${calculatedMatches[0]?.matchScore}%` }}></div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {calculatedMatches[0]?.matchedSkills.length} Matched
                          </span>
                          <button
                            onClick={() => navigateTo('recommendations')}
                            className="font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                          >
                            <span>Explore All Roles</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Direct Feature Highlights Section */}
            <section className="py-16 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Direct Navigation Modules
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                    Click Any Feature to Access Instantly
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      view: 'profile' as ActiveView,
                      icon: GraduationCap,
                      color: 'from-blue-600 to-indigo-600',
                      title: 'Student Profile Form',
                      desc: 'Edit degrees, CGPA, programming languages, databases, certifications, projects, and work experience.'
                    },
                    {
                      view: 'recommendations' as ActiveView,
                      icon: Target,
                      color: 'from-indigo-600 to-purple-600',
                      title: '13 AI Job Recommendations',
                      desc: 'Real industry requirement matching with qualification verification, skill weights, and explanations.'
                    },
                    {
                      view: 'dashboard' as ActiveView,
                      icon: BarChart3,
                      color: 'from-purple-600 to-pink-600',
                      title: 'Career Readiness Dashboard',
                      desc: 'Skill distribution breakdowns, skill gap prioritizations, and domain alignment analytics.'
                    },
                    {
                      view: 'whatif' as ActiveView,
                      icon: Sliders,
                      color: 'from-emerald-600 to-teal-600',
                      title: 'What-If Career Simulator',
                      desc: 'Add hypothetical skills (e.g. Docker, PyTorch) and simulate your match score boost in real-time.'
                    }
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={idx}
                        onClick={() => navigateTo(item.view)}
                        className="bg-slate-50 border border-slate-200 hover:border-blue-400 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} text-white flex items-center justify-center mb-4 shadow-md`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                        </div>
                        <div className="text-xs font-bold text-blue-600 flex items-center gap-1">
                          <span>Open View Directly</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: STUDENT PROFILE FORM (MODULE 3) */}
        {activeView === 'profile' && (
          <section className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2">
                    <User className="w-3.5 h-3.5" />
                    <span>Module 3: Student Academic & Technical Profile</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900">Configure Your Career Profile</h2>
                  <p className="text-slate-600 text-sm mt-1">
                    All recommendation scores calculate directly against these academic qualifications and skill inputs.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setProfile(DEFAULT_STUDENT_PROFILE)}
                    className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Demo Profile</span>
                  </button>

                  <button
                    onClick={() => navigateTo('recommendations')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <span>Compute Recommendations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Profile Form Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
                {/* 1. Basic Info */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 pb-2 border-b">
                    1. Student Identity & Contact
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={e => setProfile({ ...profile, fullName: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={e => setProfile({ ...profile, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Educational Qualifications */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 pb-2 border-b">
                    2. Educational Qualifications & Academics
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Highest Qualification</label>
                      <select
                        value={profile.highestQualification}
                        onChange={e => setProfile({ ...profile, highestQualification: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                      >
                        <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                        <option value="MCA">MCA (Master of Computer Apps)</option>
                        <option value="B.Sc CS">B.Sc Computer Science</option>
                        <option value="M.Tech">M.Tech / M.S. in CS</option>
                        <option value="BCA">BCA (Bachelor of Computer Apps)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Degree Title</label>
                      <input
                        type="text"
                        value={profile.degree}
                        onChange={e => setProfile({ ...profile, degree: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Graduation Year</label>
                      <input
                        type="number"
                        value={profile.graduationYear}
                        onChange={e => setProfile({ ...profile, graduationYear: parseInt(e.target.value) || 2025 })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CGPA / Percentage</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={profile.cgpa}
                        onChange={e => setProfile({ ...profile, cgpa: parseFloat(e.target.value) || 8.0 })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Specialization / Department</label>
                    <input
                      type="text"
                      value={profile.specialization}
                      onChange={e => setProfile({ ...profile, specialization: e.target.value })}
                      placeholder="e.g. Computer Science, Artificial Intelligence, Data Engineering"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 3. Technical Skills Multi-Selector */}
                <div>
                  <div className="flex justify-between items-center mb-2 pb-2 border-b">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      3. Technical Skills & Tools (Click to toggle)
                    </h3>
                    <span className="text-xs font-bold text-blue-600">{profile.technicalSkills.length} Selected</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {AVAILABLE_SKILLS.map(skill => {
                      const selected = profile.technicalSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleProfileSkill(skill)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                            selected
                              ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          {selected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-slate-400" />}
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Projects, Experience & Preferences */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 pb-2 border-b">
                    4. Projects, Certifications & Preferences
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Key Academic / Personal Projects</label>
                      <textarea
                        rows={3}
                        value={profile.projects}
                        onChange={e => setProfile({ ...profile, projects: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Professional Certifications</label>
                      <textarea
                        rows={3}
                        value={profile.certifications}
                        onChange={e => setProfile({ ...profile, certifications: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Internship / Work Experience</label>
                      <input
                        type="text"
                        value={profile.internshipExperience}
                        onChange={e => setProfile({ ...profile, internshipExperience: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Location</label>
                      <input
                        type="text"
                        value={profile.preferredLocation}
                        onChange={e => setProfile({ ...profile, preferredLocation: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    Profile saved in local state. Click below to view evaluated recommendations.
                  </span>
                  <button
                    onClick={() => navigateTo('recommendations')}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
                  >
                    <span>View AI Job Recommendations</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 3: AI JOB RECOMMENDATION ENGINE (MODULE 4 & 5) */}
        {activeView === 'recommendations' && (
          <section className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                    <Target className="w-3.5 h-3.5" />
                    <span>Modules 4 & 5: AI Job Matching Engine</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900">
                    Personalized Job Recommendations
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Evaluated for <strong>{profile.fullName}</strong> • {profile.highestQualification} ({profile.cgpa} CGPA) • {profile.technicalSkills.length} verified technical skills.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {['All', 'Data & AI', 'Software Engineering', 'Web Development', 'Cloud & Infrastructure', 'Security & Operations'].map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDomainFilter(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedDomainFilter === d
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recommendations Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calculatedMatches
                  .filter(r => selectedDomainFilter === 'All' || r.domain === selectedDomainFilter)
                  .map(role => {
                    const scoreColor =
                      role.matchScore >= 80 ? 'text-emerald-600' : role.matchScore >= 60 ? 'text-blue-600' : 'text-amber-600';
                    const progressColor =
                      role.matchScore >= 80 ? 'bg-emerald-500' : role.matchScore >= 60 ? 'bg-blue-600' : 'bg-amber-500';

                    return (
                      <div
                        key={role.id}
                        className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {role.domain}
                            </span>
                            <span className={`text-xl font-black ${scoreColor}`}>
                              {role.matchScore}%
                            </span>
                          </div>

                          <h3 className="font-bold text-slate-900 text-lg mb-1">{role.title}</h3>
                          <span className="text-xs font-semibold text-slate-600 block mb-2">{role.salaryRange}</span>
                          <p className="text-xs text-slate-600 mb-4 line-clamp-2">{role.description}</p>

                          {/* Progress bar */}
                          <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                            <div className={`h-2 rounded-full ${progressColor}`} style={{ width: `${role.matchScore}%` }}></div>
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400 mb-4">
                            <span>Qual Match: {role.qualScore}%</span>
                            <span>Skill Weight: {role.skillScore}%</span>
                          </div>

                          {/* Matched vs Missing */}
                          <div className="space-y-2 text-xs mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-emerald-800">Matched ({role.matchedSkills.length}): </span>
                                <span className="text-slate-700">{role.matchedSkills.join(', ') || 'None yet'}</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-rose-800">Gap ({role.missingSkills.length}): </span>
                                <span className="text-slate-700">{role.missingSkills.join(', ') || 'Fully Matched!'}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-500 italic mb-4">
                            "{role.explanation}"
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => setSelectedJobForModal(role)}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                          >
                            <span>Full Role Details</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => {
                              setWhatIfTargetRole(role.title);
                              navigateTo('whatif');
                            }}
                            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
                          >
                            What-If Sim
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        )}

        {/* VIEW 4: CAREER DASHBOARD & SKILL GAP (MODULE 6, 7 & 9) */}
        {activeView === 'dashboard' && (
          <section className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-3 py-1 rounded-full border border-purple-200 mb-2">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Module 9: Interactive Career Analytics Dashboard</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900">Career Readiness & Skill Gap Analysis</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Synthesized comparison of academic eligibility, industry skill expectations, and highest-priority gaps.
                </p>
              </div>

              {/* Student Readiness Banner */}
              <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2 space-y-2">
                    <span className="text-xs uppercase tracking-wider text-blue-300 font-bold">Candidate Evaluation</span>
                    <h3 className="text-2xl font-black">{profile.fullName}</h3>
                    <p className="text-xs text-slate-300">
                      {profile.degree} in {profile.specialization} • {profile.highestQualification} ({profile.cgpa} CGPA) • Graduating {profile.graduationYear}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium">
                        Target: {profile.careerInterests.join(', ')}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium">
                        Location: {profile.preferredLocation}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center">
                    <div className="text-3xl font-black text-emerald-400">{calculatedMatches[0]?.matchScore}%</div>
                    <div className="text-xs font-bold text-slate-200 uppercase tracking-wider mt-1">Highest Match Fit</div>
                    <div className="text-xs text-blue-200 font-semibold">{calculatedMatches[0]?.title}</div>
                  </div>
                </div>
              </div>

              {/* Top 3 Matched Breakdown & Gap Matrix */}
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Top Roles Comparison */}
                <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span>Top 5 Recommended Roles Matrix</span>
                  </h3>
                  <div className="space-y-4">
                    {calculatedMatches.slice(0, 5).map(role => (
                      <div key={role.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-slate-900 text-sm">{role.title}</span>
                          <span className="font-extrabold text-blue-600 text-sm">{role.matchScore}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${role.matchScore}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500">
                          <span>Matched: {role.matchedSkills.length} skills</span>
                          <span className="text-rose-600">Missing: {role.missingSkills.length} skills</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Priority Skill Gap Analysis */}
                <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-600" />
                    <span>Skill Gap Prioritization (Demand-Based)</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                      <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-2">
                        <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                        <span>HIGH PRIORITY (Blocks #1 & #2 Job Matches)</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['Deep Learning', 'TensorFlow', 'Docker'].map(s => (
                          <span key={s} className="px-2.5 py-1 rounded-lg bg-white text-rose-700 text-xs font-semibold border border-rose-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                      <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-2">
                        <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                        <span>MEDIUM PRIORITY (Broadens Multi-Domain Reach)</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {['AWS', 'REST APIs', 'PyTorch', 'Power BI'].map(s => (
                          <span key={s} className="px-2.5 py-1 rounded-lg bg-white text-amber-700 text-xs font-semibold border border-amber-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        <span>ACQUIRED COMPETENCIES (Core Strengths)</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.technicalSkills.map(s => (
                          <span key={s} className="px-2.5 py-1 rounded-lg bg-white text-emerald-700 text-xs font-semibold border border-emerald-200">
                            ✓ {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t text-right">
                    <button
                      onClick={() => navigateTo('roadmap')}
                      className="text-xs font-bold text-purple-600 hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Personalized Learning Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 5: WHAT-IF CAREER SIMULATOR (MODULE 10) */}
        {activeView === 'whatif' && (
          <section className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 mb-2">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Module 10: What-If Skill Impact Simulator</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900">What-If Career Simulator</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Simulate acquiring hypothetical skills and watch your job match score surge in real time.
                </p>
              </div>

              {/* Simulator Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Role to Simulate</label>
                  <select
                    value={whatIfTargetRole}
                    onChange={e => setWhatIfTargetRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    {MASTER_JOB_ROLES.map(r => (
                      <option key={r.id} value={r.title}>{r.title} ({r.domain})</option>
                    ))}
                  </select>
                </div>

                {/* Score Comparison Visual */}
                <div className="grid sm:grid-cols-3 gap-4 p-6 bg-slate-900 text-white rounded-2xl">
                  <div className="text-center p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                    <div className="text-xs text-slate-400 mb-1">Current Baseline Score</div>
                    <div className="text-3xl font-black text-slate-200">{whatIfCalculation.baseOverall}%</div>
                    <span className="text-[10px] text-slate-400">Based on existing profile</span>
                  </div>

                  <div className="text-center p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40">
                    <div className="text-xs text-emerald-300 mb-1">Simulated Match Score</div>
                    <div className="text-3xl font-black text-emerald-400">{whatIfCalculation.simulatedOverall}%</div>
                    <span className="text-[10px] text-emerald-200 font-semibold">With hypothetical skills</span>
                  </div>

                  <div className="text-center p-3 bg-indigo-950/60 rounded-xl border border-indigo-500/40">
                    <div className="text-xs text-indigo-300 mb-1">Marginal Boost</div>
                    <div className="text-3xl font-black text-indigo-400">+{whatIfCalculation.boost}%</div>
                    <span className="text-[10px] text-indigo-200 font-semibold">Hiring advantage gained</span>
                  </div>
                </div>

                {/* Hypothetical Skills Selector */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Toggle Hypothetical Skills (Simulate learning them)
                    </span>
                    <span className="text-xs font-bold text-indigo-600">{hypotheticalSkills.length} Simulated</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['TensorFlow', 'Docker', 'Deep Learning', 'PyTorch', 'AWS', 'Kubernetes', 'Power BI', 'Tableau', 'Node.js', 'React'].map(skill => {
                      const active = hypotheticalSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleHypotheticalSkill(skill)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                            active
                              ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {active ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-slate-400" />}
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Remaining Gaps */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600">
                  <span className="font-bold text-slate-700 block mb-1">Remaining Gaps After Simulation:</span>
                  <div>
                    {whatIfCalculation.missingAfterSim.length > 0 ? (
                      whatIfCalculation.missingAfterSim.join(', ')
                    ) : (
                      <span className="text-emerald-600 font-bold">🎉 Zero gaps remaining! 100% skill match criteria achieved!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 6: PERSONALIZED LEARNING ROADMAP (MODULE 8) */}
        {activeView === 'roadmap' && (
          <section className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Header */}
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Module 8: Actionable Career Roadmap</span>
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900">4-Week Personalized Learning Plan</h2>
                <p className="text-slate-600 text-sm mt-1">
                  Curated study plan targeting missing skills for your top fit: <strong>{calculatedMatches[0]?.title}</strong>.
                </p>
              </div>

              {/* Weekly Timeline */}
              <div className="space-y-6">
                {[
                  {
                    week: 'Week 1: Foundational Deep Dive',
                    topic: 'Advanced SQL Query Optimization & Feature Engineering',
                    courses: ['Coursera: Advanced Relational Databases & Indexing', 'freeCodeCamp: SQL for Data Analytics'],
                    project: 'Build an optimized customer transactional analytical warehouse schema.',
                    cert: 'PostgreSQL Associate certification exam practice.'
                  },
                  {
                    week: 'Week 2: Machine Learning Modeling',
                    topic: 'Supervised & Unsupervised Scikit-Learn Pipelines',
                    courses: ['Harvard CS50: Introduction to Artificial Intelligence', 'Kaggle: Machine Learning Foundations'],
                    project: 'End-to-end churn prediction model with Cross-Validation and ROC-AUC tuning.',
                    cert: 'IBM Machine Learning Professional Certificate'
                  },
                  {
                    week: 'Week 3: Deep Learning & NLP Fundamentals',
                    topic: 'Neural Networks with PyTorch / TensorFlow',
                    courses: ['DeepLearning.AI: Neural Networks and Deep Learning Specialization'],
                    project: 'Fine-tune a sentiment analysis text classification transformer.',
                    cert: 'TensorFlow Developer Certificate'
                  },
                  {
                    week: 'Week 4: Deployment & Portfolio Presentation',
                    topic: 'Containerization with Docker & REST API Delivery',
                    courses: ['Docker for Developers (Official Documentation)', 'Flask & FastAPI Model Serving'],
                    project: 'Package your ML model in Docker and deploy to Cloud Run with live endpoints.',
                    cert: 'AWS Certified Cloud Practitioner'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
                    <div className="md:w-56 shrink-0">
                      <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">
                        Phase {idx + 1}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base">{item.week}</h4>
                    </div>

                    <div className="flex-1 space-y-3 text-xs text-slate-600">
                      <div>
                        <span className="font-bold text-slate-800 block mb-1">Core Focus:</span>
                        <p>{item.topic}</p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-800 block mb-1">Recommended Free/Pro Courses:</span>
                        <ul className="list-disc pl-4 space-y-0.5">
                          {item.courses.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <span className="font-bold text-purple-700 block mb-0.5">Capstone Practice Project:</span>
                        <p className="text-slate-700">{item.project}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* VIEW 7: ADMIN PANEL (MODULE 11) */}
        {activeView === 'admin' && (
          <section className="py-12 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider bg-slate-200 px-3 py-1 rounded-full mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Module 11: University Administrator Studio</span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900">Career Dataset Administration</h2>
                  <p className="text-slate-600 text-sm mt-1">Manage student profiles, calibrated role requirements, and placement statistics.</p>
                </div>

                <div className="text-right">
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                    SQLite Database Connected
                  </span>
                </div>
              </div>

              {/* Roster Table */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-x-auto">
                <h3 className="font-bold text-slate-900 text-sm mb-4">Registered Students Roster</h3>
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 border-b text-slate-700 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Degree & Qualification</th>
                      <th className="py-3 px-4">CGPA</th>
                      <th className="py-3 px-4">Top Match</th>
                      <th className="py-3 px-4">Score</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">{profile.fullName}</td>
                      <td className="py-3 px-4">{profile.highestQualification} ({profile.specialization})</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-600">{profile.cgpa}</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{calculatedMatches[0]?.title}</td>
                      <td className="py-3 px-4 font-bold text-blue-600">{calculatedMatches[0]?.matchScore}%</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => navigateTo('report')}
                          className="text-blue-600 hover:text-blue-800 font-bold underline"
                        >
                          Report
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Maya Sharma</td>
                      <td className="py-3 px-4">MCA (Data Science)</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-600">8.9</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">AI Engineer</td>
                      <td className="py-3 px-4 font-bold text-blue-600">95%</td>
                      <td className="py-3 px-4 text-slate-400">Archived</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-bold text-slate-900">Rohan Verma</td>
                      <td className="py-3 px-4">B.Tech (IT)</td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-600">7.6</td>
                      <td className="py-3 px-4 font-semibold text-slate-800">Cloud Engineer</td>
                      <td className="py-3 px-4 font-bold text-blue-600">87%</td>
                      <td className="py-3 px-4 text-slate-400">Archived</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 8: DOWNLOAD CAREER REPORT (MODULE 12) */}
        {activeView === 'report' && (
          <section className="py-12 bg-slate-100 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {/* Print Action Bar */}
              <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Download Career Recommendation Report</h3>
                  <p className="text-xs text-slate-500">Official printable summary based on educational qualifications</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/30 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
              </div>

              {/* Printable Document Paper Card */}
              <div className="bg-white border border-slate-300 rounded-3xl p-8 sm:p-12 shadow-md space-y-6 text-slate-800">
                <div className="flex justify-between items-start pb-6 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black">
                        <Brain className="w-4 h-4" />
                      </div>
                      <span className="font-black text-xl text-slate-900">CareerAI Recommendation Report</span>
                    </div>
                    <span className="text-xs text-slate-500">Educational Qualification Matching Engine</span>
                  </div>
                  <div className="text-right text-xs text-slate-500 font-mono">
                    <div>Date: {new Date().toLocaleDateString()}</div>
                    <div>Status: VERIFIED</div>
                  </div>
                </div>

                {/* Candidate Overview */}
                <div className="grid sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block">Candidate Name:</span>
                    <strong className="text-slate-900 text-sm">{profile.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Degree & Qualification:</span>
                    <strong className="text-slate-900 text-sm">{profile.highestQualification} ({profile.degree})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Specialization & CGPA:</span>
                    <strong className="text-slate-900">{profile.specialization} (CGPA: {profile.cgpa})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Graduation Year:</span>
                    <strong className="text-slate-900">{profile.graduationYear}</strong>
                  </div>
                </div>

                {/* Top Job Matches */}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-3">Top Recommended Technology Roles</h4>
                  <div className="space-y-3">
                    {calculatedMatches.slice(0, 3).map((r, i) => (
                      <div key={r.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                        <div>
                          <div className="font-bold text-slate-900">#{i + 1} {r.title} ({r.domain})</div>
                          <div className="text-slate-500 text-[11px]">{r.salaryRange} • Matched: {r.matchedSkills.join(', ')}</div>
                        </div>
                        <div className="text-right font-black text-blue-600 text-base">{r.matchScore}%</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* High Priority Skills to Acquire */}
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900">
                  <strong className="block mb-1">Recommended Skill Acquisition Priorities:</strong>
                  <p>{calculatedMatches[0]?.missingSkills.join(', ') || 'Fully qualified for top roles!'}</p>
                </div>

                <div className="pt-6 border-t border-slate-200 text-center text-[10px] text-slate-400">
                  Generated autonomously via AI-Based Job Recommendation System based on Educational Qualifications.
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* MODAL: FULL JOB DETAILS */}
      {selectedJobForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedJobForModal(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold"
            >
              ✕
            </button>

            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              {selectedJobForModal.domain}
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">{selectedJobForModal.title}</h3>
            <span className="text-sm font-bold text-slate-700 block mb-4">{selectedJobForModal.salaryRange}</span>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">{selectedJobForModal.description}</p>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border">
                <strong className="text-slate-900 block mb-1">Eligible Educational Qualifications:</strong>
                <p className="text-slate-700">{selectedJobForModal.qualifications.join(', ')}</p>
                <span className="text-[10px] text-slate-500 mt-1 block">Minimum Academic CGPA: {selectedJobForModal.minCgpa}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border">
                <strong className="text-slate-900 block mb-1">Required Industry Skills:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedJobForModal.requirements.map(req => (
                    <span
                      key={req.skill}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        req.mandatory ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {req.skill} {req.mandatory && '★'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border">
                <strong className="text-slate-900 block mb-1">Career Growth Pathway:</strong>
                <p className="text-slate-700">{selectedJobForModal.careerGrowth}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border">
                <strong className="text-slate-900 block mb-1">Recommended Industry Certifications:</strong>
                <p className="text-slate-700">{selectedJobForModal.certifications}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex justify-between">
              <button
                onClick={() => setSelectedJobForModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setWhatIfTargetRole(selectedJobForModal.title);
                  setSelectedJobForModal(null);
                  navigateTo('whatif');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
              >
                Simulate in What-If
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white">
              <Brain className="w-3.5 h-3.5" />
            </div>
            <span className="font-extrabold text-white">CareerAI</span>
            <span className="text-slate-500">• AI-Based Job Recommendation Platform</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => navigateTo('home')} className="hover:text-white">Home</button>
            <button onClick={() => navigateTo('profile')} className="hover:text-white">Profile</button>
            <button onClick={() => navigateTo('recommendations')} className="hover:text-white">Recommendations</button>
            <button onClick={() => navigateTo('dashboard')} className="hover:text-white">Dashboard</button>
            <button onClick={() => navigateTo('roadmap')} className="hover:text-white">Roadmap</button>
            <button onClick={() => navigateTo('report')} className="hover:text-white">Report</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
