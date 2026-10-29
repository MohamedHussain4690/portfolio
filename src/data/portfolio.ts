export interface CertificationItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  badge: string;
  verifyUrl?: string;
}

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export interface SkillItem {
  name: string;
  level: string;
  tag: string;
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export const portfolioData = {
  personal: {
    name: 'Mohamed Hussain N',
    role: 'Final-year CSE Student · AI + Full-Stack Developer',
    location: 'Chennai, IN',
    email: 'mhhussain4690@gmail.com',
    github: 'https://github.com/MohamedHussain4690',
    linkedin: 'https://www.linkedin.com/in/mohamed-hussain-n-/',
    avatar: '/profile.png',
  },
  nav: ['HOME/', 'ABOUT/', 'PROJECTS/', 'SKILLS/', 'JOURNEY/', 'CONTACT/'],
  projects: [
    {
      id: 'uk-rail',
      number: '001',
      title: 'UK National Rail Reservation System',
      subtitle: 'Full-Stack Transit Infrastructure & Ticketing Engine',
      year: '2026/',
      description:
        'A production-grade full-stack MERN rail booking platform. Features live National Rail CRS station schedules, Train Operating Company (TOC) filters, interactive 2+2/2+1 carriage seat selection with USB power and orientation indicators, automated split-ticketing savings, Railcard discount calculation, and secure scrypt-hashed authentication with TTL session cookies.',
      tags: ['Next.js / React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'TTL Sessions', 'Tailwind'],
      github: 'https://github.com/MohamedHussain4690/uk-rail-reservation',
      live: 'https://uk-rail-reservation.onrender.com/',
      featured: true,
    },
    {
      id: 'ai-summarizer',
      number: '002',
      title: 'AI-Powered Text Summarizer',
      subtitle: 'Transformer-Based NLP & Summarization Pipeline',
      year: '2025/',
      description:
        'An advanced full-stack text summarization platform leveraging Hugging Face transformer models (such as DistilBART) and Flask backend services. Built to process massive articles, technical papers, and long-form study notes into concise, structured key takeaways.',
      tags: ['Python', 'Flask', 'Hugging Face', 'DistilBART', 'Preprocessing Pipeline'],
      github: 'https://github.com/MohamedHussain4690/AI-Powered-Text-Summarizer',
      featured: true,
    },
    {
      id: 'flashmind',
      number: '003',
      title: 'FlashMind-AI',
      subtitle: 'Multimodal RAG & Flashcard Generation Engine',
      year: '2025/',
      description:
        'AI flashcard generator powered by Google Gemini. Upload PDFs or DOCX files to automatically generate interactive study flashcards with smart spaced repetition formatting.',
      tags: ['React', 'Vite', 'Flask', 'Google Gemini API', 'Tailwind'],
      github: 'https://github.com/MohamedHussain4690/FlashMind-AI',
      featured: true,
    },
    {
      id: 'solestyle',
      number: '004',
      title: 'SoleStyle',
      subtitle: 'Responsive E-Commerce & Cart State Management',
      year: '2025/',
      description:
        'Feature-rich frontend e-commerce web application with dynamic category filtering, shopping cart state management, responsive grid layouts, and user profile views.',
      tags: ['JavaScript', 'HTML5 / CSS3', 'Tailwind CSS', 'State Management'],
      github: 'https://github.com/MohamedHussain4690/footwear_ecommerce',
      live: 'https://mohamedhussain4690.github.io/footwear_ecommerce/',
      featured: true,
    },
  ],
  skills: [
    {
      category: 'FRONTEND_CORE',
      skills: [
        { name: 'React / Next.js 14', level: 'ADVANCED', tag: 'VIRTUAL_DOM' },
        { name: 'TypeScript', level: 'EXPERT', tag: 'STRICT_TYPES' },
        { name: 'Tailwind CSS', level: 'EXPERT', tag: 'UTILITY_JIT' },
        { name: 'HTML5 / CSS3', level: 'EXPERT', tag: 'SEMANTIC' },
      ],
    },
    {
      category: 'AI_ORCHESTRATION',
      skills: [
        { name: 'Python / Flask', level: 'ADVANCED', tag: 'CPYTHON' },
        { name: 'Hugging Face Transformers', level: 'ADVANCED', tag: 'DISTILBART' },
        { name: 'Google Gemini API', level: 'ADVANCED', tag: 'MULTIMODAL' },
        { name: 'LangChain / RAG', level: 'INTERMEDIATE', tag: 'VECTORS' },
      ],
    },
    {
      category: 'SYSTEMS_INFRA',
      skills: [
        { name: 'Node.js & Express', level: 'ADVANCED', tag: 'V8_ENGINE' },
        { name: 'MongoDB & Mongoose', level: 'ADVANCED', tag: 'TTL_SESSIONS' },
        { name: 'Git & GitHub Workflows', level: 'ADVANCED', tag: 'VERSION_CTRL' },
        { name: 'Docker / Containers', level: 'INTERMEDIATE', tag: 'ISOLATION' },
      ],
    },
  ] as SkillCategory[],
  journey: [
    {
      id: 'm1',
      period: '2022 — 2026',
      category: 'EDUCATION',
      title: 'B.E. Computer Science and Engineering',
      organization: 'Affiliated Engineering College, Chennai',
      description: 'Focused on core data structures, algorithms, distributed systems, and machine learning foundations.',
      badge: 'B.E. CSE',
    },
    {
      id: 'm2',
      period: '2025 / PRESENT',
      category: 'EXPERIENCE',
      title: 'AI & Full-Stack Developer Lab',
      organization: 'Independent Open Source & Client Projects',
      description: 'Building production-ready web apps, transit ticketing systems, and multimodal RAG pipelines.',
      badge: 'FULL-STACK',
    },
    {
      id: 'm3',
      period: '2024 — 2025',
      category: 'CERTIFICATION',
      title: 'Advanced AI & Machine Learning Specs',
      organization: 'Hugging Face & Google Cloud',
      description: 'Certified proficiency in transformer fine-tuning, vector embeddings, and LLM agent orchestration.',
      badge: 'AI CERTIFIED',
    },
    {
      id: 'm4',
      period: '2024',
      category: 'ACHIEVEMENT',
      title: 'Full-Stack Hackathon Finalist',
      organization: 'Regional Tech Innovation Challenge',
      description: 'Architected and deployed a real-time collaborative flashcard generation app utilizing Google Gemini APIs.',
      badge: 'FINALIST',
    },
  ],
  certifications: [
    {
      id: 'c1',
      title: 'AI & MACHINE LEARNING INTERNSHIP',
      organization: '8Queens Software Technologies',
      year: '2026/',
      description: 'Hands-on internship in Artificial Intelligence and Machine Learning solutions, covering advanced neural network architectures, data processing, and enterprise deployment.',
      badge: 'INTERNSHIP',
      verifyUrl: 'https://drive.google.com/file/d/1NB7rY0MR23jZntsP85qVq1JcvTPuyXA5/view?usp=sharing',
    },
    {
      id: 'c2',
      title: 'DEVELOPING AI APPLICATIONS WITH PYTHON & FLASK',
      organization: 'IBM & Coursera',
      year: '2025/',
      description: 'Built and deployed AI-powered web applications utilizing Python, Flask, and RESTful microservices.',
      badge: 'IBM CERTIFIED',
      verifyUrl: 'https://coursera.org/verify/M2TT1PRWF4H5',
    },
    {
      id: 'c3',
      title: 'MACHINE LEARNING WITH PYTHON',
      organization: 'IBM & Coursera',
      year: '2025/',
      description: 'Applied regression, classification, clustering, and deep learning algorithms using Scikit-Learn and Python.',
      badge: 'IBM CERTIFIED',
      verifyUrl: 'https://coursera.org/verify/AWJIMZN52108',
    },
    {
      id: 'c4',
      title: 'PYTHON FOR DATA SCIENCE, AI & DEVELOPMENT',
      organization: 'IBM & Coursera',
      year: '2025/',
      description: 'Core Python programming, data structures, working with APIs, and pandas/numpy data analysis pipelines.',
      badge: 'IBM CERTIFIED',
      verifyUrl: 'https://coursera.org/verify/F4IFWO3M67L7',
    },
    {
      id: 'c5',
      title: 'PAYROLL MANAGEMENT SYSTEM INTERNSHIP',
      organization: 'AdroIT Technologies',
      year: '2026/',
      description: 'Developed robust database schemas, secure employee record management, and automated payroll calculation workflows.',
      badge: 'INTERNSHIP',
      verifyUrl: 'https://drive.google.com/file/d/1sGOAbqxzo0m_m0Blyz7gDiv00ST5l8LK/view?usp=drive_link',
    },
    {
      id: 'c6',
      title: 'HACKHUSTLE 2024 CYBERSECURITY HACKATHON',
      organization: 'HackHustle',
      year: '2024/',
      description: 'Participated in competitive cybersecurity challenges, vulnerability analysis, and secure code implementation.',
      badge: 'COMPETITION',
    },
  ] as CertificationItem[],
  workshops: [
    {
      id: 'w1',
      title: 'WEB DEVELOPMENT TRAINING — ADAOVI',
      organization: 'Adaovi Tech',
      year: '2024/',
      description: 'Intensive training on modern web development workflows, responsive UI design, and JavaScript fundamentals.',
      badge: 'TRAINING',
      verifyUrl: 'https://drive.google.com/file/d/1sGOAbqxzo0m_m0Blyz7gDiv00ST5l8LK/view?usp=drive_link',
    },
    {
      id: 'w2',
      title: 'AI TOOLS & CHATGPT WORKSHOP',
      organization: 'Professional Workshop',
      year: '2024/',
      description: 'Explored prompt engineering, large language model integration, and automated content generation workflows.',
      badge: 'WORKSHOP',
    },
    {
      id: 'w3',
      title: 'POWER BI WORKSHOP',
      organization: 'Data Analytics Workshop',
      year: '2024/',
      description: 'Designed interactive dashboards, data visualisations, and business intelligence reporting models.',
      badge: 'WORKSHOP',
    },
  ] as CertificationItem[],
  faq: [
    {
      id: 'f1',
      number: '01/',
      question: 'WHAT ENGINEERING ROLES ARE YOU TARGETING?',
      answer: 'I am actively targeting Full-Stack Engineer, AI Application Engineer, and Frontend Engineer roles where I can build production-ready web apps and robust AI/RAG workflows.',
    },
    {
      id: 'f2',
      number: '02/',
      question: 'WHAT TECH STACK DO YOU BUILD WITH MOST?',
      answer: 'My core stack is React / Next.js 14, TypeScript, Tailwind CSS, Node.js, Express, Python/Flask, and MongoDB/PostgreSQL, augmented with Hugging Face transformers and Google Gemini APIs.',
    },
    {
      id: 'f3',
      number: '03/',
      question: 'ARE YOU OPEN TO RELOCATION OR REMOTE OPPORTUNITIES?',
      answer: 'Yes, I am fully open to on-site or hybrid opportunities in Chennai and Bengaluru, as well as global remote engineering positions.',
    },
    {
      id: 'f4',
      number: '04/',
      question: 'WHICH PROJECT BEST DEMONSTRATES YOUR ENGINEERING CAPABILITY?',
      answer: 'The UK National Rail Reservation System best demonstrates my full-stack capability, featuring live CRS timetables, TOC operator tagging, interactive 2+2/2+1 carriage seat pickers, and secure scrypt auth with TTL sessions.',
    },
    {
      id: 'f5',
      number: '05/',
      question: 'HOW DO YOU EVALUATE AND INTEGRATE EMERGING AI MODELS?',
      answer: 'I benchmark inference latency, optimize token payload structures, implement robust prompt guardrails, and structure clean tool-calling agent loops using Python and LangChain/Flask.',
    },
    {
      id: 'f6',
      number: '06/',
      question: 'HOW CAN HIRING TEAMS REACH YOU QUICKLY?',
      answer: 'You can reach me directly via email at mohamedhussain4690@gmail.com, connect on GitHub, or send a message using the interactive contact form below.',
    },
  ] as FaqItem[],
};
