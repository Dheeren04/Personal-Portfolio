export interface Project {
  id: string;
  title: string;
  category: string;
  year?: string;
  summary: string;
  bullets: string[];
  tags: string[];
  isTeam?: boolean;
  links: {
    live: string;
    github?: string;
  };
  featured: boolean;
  image?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status?: string;
  scoreLabel: string;
  scoreValue: string;
  details: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  positioning: string;
  urls: {
    linkedin: string;
    github: string;
    existingPortfolio: string;
    resume: string;
  };
  meta: {
    title: string;
    description: string;
    siteUrl: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    pullStatement: string;
    narrative: string[];
    quickFacts: {
      label: string;
      value: string;
      numericValue?: number;
      suffix?: string;
    }[];
  };
  skills: {
    eyebrow: string;
    heading: string;
    marquee: string[];
    categories: SkillCategory[];
  };
  projects: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    items: Project[];
  };
  education: {
    eyebrow: string;
    heading: string;
    items: EducationItem[];
  };
  certificates: {
    eyebrow: string;
    heading: string;
    note: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    subheading: string;
    toastCopySuccess: string;
  };
  footer: {
    timezone: string;
    copyrightYear: number;
    colophon: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Dheeren",
  role: "Data Science Undergraduate & Aspiring Data Analyst",
  location: "Bangalore, India",
  email: "dheeren438@gmail.com",
  phone: "+91 76249 56501",
  availability: "Open to Data Analyst / Data Science internships",
  positioning: "Data Science undergraduate who analyzes data and builds real-world web projects.",
  urls: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/dheerengowda/",
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
    existingPortfolio: "https://dheeren-portfolio.onrender.com/",
    resume: "/Dheeren_Resume.pdf",
  },
  meta: {
    title: "Dheeren — Data Science Student & Aspiring Data Analyst",
    description: "Data Science undergraduate turning raw data into decisions through statistical analysis and real-world web engineering.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://dheeren.dev",
  },
  about: {
    eyebrow: "01 — ABOUT",
    heading: "Analytical rigor meets pragmatic software execution.",
    pullStatement: "Data Science undergraduate (3rd year, CGPA 8.09) with hands-on experience in Python, SQL, and data analysis through applied job-simulation coursework.",
    narrative: [
      "Completed a Deloitte Data Analytics Job Simulation covering data analysis, data cleaning, and forensic technology techniques.",
      "Self-taught web developer who independently designed and built a full-stack personal portfolio using HTML, CSS, JavaScript, and a Node.js/Express backend, showing initiative and the ability to learn and ship technical projects independently.",
      "Seeking an entry-level Data Analyst / Data Science internship to apply statistical analysis and data visualization skills to real-world business problems.",
    ],
    quickFacts: [
      { label: "Degree", value: "B.Tech Data Science" },
      { label: "CGPA", value: "8.09 / 10", numericValue: 8.09, suffix: " / 10" },
      { label: "Graduation", value: "Expected 2028 (3rd Year)" },
      { label: "Location", value: "Bangalore, India" },
    ],
  },
  skills: {
    eyebrow: "02 — SKILLS",
    heading: "Core competencies & technical foundation",
    marquee: [
      "Python",
      "SQL",
      "Data Analysis",
      "Data Cleaning",
      "Statistical Analysis",
      "Data Handling",
      "Querying & Database Fundamentals",
      "Node.js",
      "Express.js",
      "JavaScript",
      "Git",
      "Database Fundamentals",
      "Forensic Technology",
      "Java",
      "C",
      "HTML",
      "CSS",
    ],
    categories: [
      {
        title: "Programming",
        description: "Core algorithmic thinking and structured querying languages.",
        skills: ["Python", "Java", "C", "SQL"],
      },
      {
        title: "Data",
        description: "Statistical modeling, transformation, data cleaning, and database fundamentals.",
        skills: [
          "Data Analysis",
          "Data Cleaning",
          "Statistical Analysis",
          "Data Handling",
          "Querying & Database Fundamentals",
        ],
      },
      {
        title: "Web Development",
        description: "Full-stack architectures, interactive frontend design, and REST APIs.",
        skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js (REST API basics)"],
      },
      {
        title: "Tools & Concepts",
        description: "Applied enterprise methodologies and version control workflows.",
        skills: [
          "Git version control",
          "Database Fundamentals",
          "Forensic Technology (applied, via Deloitte simulation)",
        ],
      },
    ],
  },
  projects: {
    eyebrow: "03 — SELECTED WORKS",
    heading: "Featured Projects",
    subtitle: "AI Platform & Commercial Web Deployments",
    items: [
      {
        id: "govbridge-india",
        title: "GovBridge India — AI-Powered Government Scheme Platform",
        category: "AI Platform · Team Project",
        year: "2026",
        isTeam: true,
        summary: "Worked in a team to build a personalized platform that helps citizens find, track, and apply for government schemes that match their profile.",
        bullets: [
          "Worked in a team to build a personalized platform that helps citizens find, track, and apply for government schemes that match their profile.",
          "Recommends schemes based on age, occupation, income, and state, with a dashboard showing qualifying, recommended, and applied schemes.",
          "Integrated GovBot, an AI chatbot (LangChain with Google Gemini / OpenAI) that answers questions on scheme eligibility and application steps.",
          "Added multilingual support for Kannada, Hindi, Telugu, Tamil, Malayalam, and English to make schemes accessible across regions.",
        ],
        tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Node.js", "Express.js", "Firebase", "LangChain"],
        links: {
          live: "https://gov-bridge-india.vercel.app",
          github: "https://github.com/MuralimithunCS/GovBridgeIndia",
        },
        featured: true,
      },
      {
        id: "yuvi-nature-products",
        title: "Yuvi Nature Products — Business Website",
        category: "Commercial Website · 2026",
        year: "2026",
        summary: "Designed and built a responsive business website for an eco-friendly arecanut leaf plate manufacturer, taking it from concept to a live, publicly accessible site.",
        bullets: [
          "Designed and built a responsive business website for an eco-friendly arecanut leaf plate manufacturer, taking it from concept to a live, publicly accessible site.",
          "Created a product catalog so customers can browse the manufacturer's range of eco-friendly plates on any device.",
          "Integrated a WhatsApp-linked enquiry form that sends customer enquiries directly to the business, simplifying how buyers get in touch.",
        ],
        tags: ["Responsive Design", "Product Catalog", "WhatsApp Integration", "Netlify"],
        links: {
          live: "https://yuvinature-products.netlify.app/",
        },
        featured: true,
      },
    ],
  },
  education: {
    eyebrow: "04 — ACADEMICS",
    heading: "Academic Background",
    items: [
      {
        id: "btech-data-science",
        degree: "B.Tech in Data Science",
        institution: "Nagarjuna College of Engineering and Technology",
        location: "Bangalore",
        period: "2024 — 2028",
        status: "Currently in 3rd year · Expected 2028",
        scoreLabel: "CGPA",
        scoreValue: "8.09 / 10",
        details: "Focusing on data modeling, statistical analysis, relational databases, algorithms, and computational data science.",
      },
      {
        id: "pre-university",
        degree: "Pre-University (12th)",
        institution: "Ambika PU College",
        location: "Puttur",
        period: "2022 — 2024",
        status: "Completed 2024 · Course: PCMC",
        scoreLabel: "Percentage",
        scoreValue: "93%",
        details: "Physics, Chemistry, Mathematics, and Computer Science (PCMC).",
      },
      {
        id: "sslc",
        degree: "SSLC (10th)",
        institution: "Kumaraswamy English Medium High School",
        location: "Subrahmanya",
        period: "2021 — 2022",
        status: "April 2022 · Karnataka Secondary Education Examination Board",
        scoreLabel: "Score",
        scoreValue: "95.36% (596 / 625)",
        details: "Karnataka Secondary Education Examination Board.",
      },
    ],
  },
  certificates: {
    eyebrow: "05 — CREDENTIALS",
    heading: "Verified Certifications & Job Simulations",
    note: "All credentials are auto-synced from verified institutional documentation.",
  },
  contact: {
    eyebrow: "06 — INITIATE CONTACT",
    heading: "Let's talk.",
    subheading: "Open to Data Analyst / Data Science internships, technical collaborations, and select web projects.",
    toastCopySuccess: "Email address copied to clipboard.",
  },
  footer: {
    timezone: "Asia/Kolkata",
    copyrightYear: 2026,
    colophon: "Designed & engineered by Dheeren with Next.js & Tailwind CSS.",
  },
};
