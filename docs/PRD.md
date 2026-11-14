# Product Requirements Document (PRD) — Dheeren's Portfolio Website (v2 Rebuild)

## 1. Executive Summary & Goals
- **Product Name:** Dheeren Personal Portfolio (v2 Rebuild)
- **Target Role:** Entry-level Data Analyst / Data Science Internship
- **Current Student Status:** 3rd-year B.Tech in Data Science, Nagarjuna College of Engineering and Technology, Bangalore (Expected 2028, CGPA 8.09 / 10).
- **Core Value Proposition:** A high-craft, studio-grade portfolio that pairs rigor in statistical data analysis (Python, SQL) with demonstrated initiative to engineer and build real-world websites.
- **Primary Goal:** Convert recruiter and hiring manager attention into interview invites within a 30–60 second skim.
- **Non-Goals:** Blog platform, dynamic CMS backend, user authentication, e-commerce, heavy unoptimized 3D/WebGL experiences that compromise loading speed or mobile battery.

---

## 2. Target Personas & User Stories

### Persona 1: Senior Technical Recruiter ("Elena")
- **Context:** Screens 80+ applicant profiles an hour for technical summer internships. Skims for 10–20 seconds.
- **Needs:** Immediate clarity on candidate location, expected graduation year (2028), core technical capabilities (Python, SQL, Web), and instant one-click access to the résumé PDF, LinkedIn (`dheerengowda`), and direct contact options.
- **User Story:** "As a recruiter, I want to immediately see who Dheeren is, what roles he is available for, his university status, and download his résumé with one click, so that I can evaluate his fit in under 15 seconds."
- **Acceptance Criteria:**
  - Hero section displays name, availability pill ("Open to Data Analyst / Data Science internships"), degree, CGPA, and one-click résumé download.
  - Quick-contact micro-row (Email, Phone, LinkedIn) visible without scrolling.
  - Fixed navigation bar keeps résumé button accessible at all scroll depths.

### Persona 2: Data Science / Analytics Hiring Manager ("Marcus")
- **Context:** Reviews shortlisted applicants before technical interview rounds. Wants evidence of real-world analytical reasoning and execution.
- **Needs:** Concrete project descriptions, authentic business problem framing, verified certifications (Deloitte job simulation, Cisco networking), and clean, bug-free implementation.
- **User Story:** "As a hiring manager, I want to inspect Dheeren's featured projects (GovBridge India and Yuvi Nature Products) and verified credentials with evidence of real-world problem solving, so that I can assess his technical depth."
- **Acceptance Criteria:**
  - GovBridge India AI platform and Yuvi Nature Products commercial web project showcased as featured case studies with live site access and clear bullet points.
  - Certificates section with interactive lightbox modal displaying authentic credential documentation.
  - Zero fabricated metrics or exaggerated claims; transparent technical stack tags.

### Persona 3: Peer / Prospective Freelance Client ("Arjun")
- **Context:** Seeks a reliable self-starter to design and launch clean business web applications (such as Yuvi Nature Products).
- **Needs:** Contact form, evidence of responsive web craft, proof of deployment on modern platforms (Netlify).
- **User Story:** "As a prospective client, I want to quickly reach out via a message form or WhatsApp/phone to discuss a web project."
- **Acceptance Criteria:**
  - Accessible contact form with validation and mailto fallback.
  - Demonstrates modern web development stack (Next.js, TypeScript, Tailwind, fluid animations).

---

## 3. Functional Requirements

| Module | ID | Requirement Description | Priority |
| :--- | :--- | :--- | :--- |
| **Intro Loader** | F-01 | Full-screen editorial sequence (2.8s–3.4s, hard timeout 3.5s) displaying counter 000→100, cultural greetings, contact reveal, and upward curtain exit. Runs once per session. | P0 |
| **Hero** | F-02 | Editorial two-column hero with large serif headline, status badge, primary CTAs (View my projects, Résumé viewer/downloader), contact row with copy-email toast, and warm studio profile photo. | P0 |
| **About** | F-03 | Pull statement, summary narrative, and at-a-glance factual strip with animated counter for CGPA (8.09) and graduation (2028). | P0 |
| **Skills** | F-04 | 4 distinct clusters (Programming, Data, Web Development, Tools & Concepts) rendered as interactive chips without bogus percentage bars, plus an infinite marquee. | P0 |
| **Projects** | F-05 | Two featured case studies in alternating layout: GovBridge India (AI Platform, LangChain bot, live on Vercel, GitHub repo) and Yuvi Nature Products (Business Website 2026, live on Netlify, WhatsApp integration) with browser mockups. | P0 |
| **Education** | F-06 | 3-milestone vertical timeline: B.Tech Data Science (Expected 2028), 12th Pre-University (2024), 10th SSLC (2022). | P0 |
| **Certificates** | F-07 | Dynamic gallery synced from `portfolio/assets/certificates/` with interactive modal/lightbox preview, title overrides, and full PDF view. | P0 |
| **Contact** | F-08 | Direct communication channel list (email, phone, LinkedIn, resume) + validated contact form with honeypot spam protection and mailto fallback. | P0 |
| **Navigation** | F-09 | Floating responsive nav with scroll progress bar, section highlighting, mobile drawer, and quick résumé action. | P0 |
| **Asset Sync** | F-10 | Automated build-time sync (`scripts/sync-assets.mjs`) extracting certificates, profile photo, and résumé without modifying source assets. | P0 |

---

## 4. Non-Functional Requirements

- **Performance:** Google Lighthouse desktop score ≥ 95 on all categories; Mobile Performance ≥ 90. LCP < 2.0s; CLS < 0.05.
- **Accessibility:** WCAG 2.2 AA compliant. 100% keyboard navigable with visible focus states, aria landmarks, and semantic HTML tags.
- **Motion & Ergonomics:** Lenis smooth scrolling with Framer Motion. Strictly respects `prefers-reduced-motion`.
- **Design Realism:** Palette derived from studio portrait background (`#F3EDE3` warm cream), restrained terracotta accent (`#B5532F`), hairline borders, and subtle grain texture.
