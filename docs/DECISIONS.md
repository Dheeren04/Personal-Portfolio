# Architecture & Design Decisions Log (ADR)

---

## Decision 01: Read-Only Assets Source & Synchronization Strategy
- **Context:** The workspace root contains a pre-existing `portfolio/assets/` folder with user assets (`hero-photo.jpg`, `Dheeren_Resume.pdf`, and `certificates/`). We must never rename, move, delete, or overwrite anything in `assets/`.
- **Decision:**
  - Build an idempotent build-time sync script: `scripts/sync-assets.mjs`.
  - Wire this script to both `npm run predev` and `npm run prebuild` in `package.json`.
  - The script scans `assets/certificates/` (with fallback to `assets/certifications/` if present), copies files to `public/certificates/`, copies `hero-photo.jpg` to `public/images/hero-photo.jpg`, copies the résumé PDF to `public/Dheeren_Resume.pdf`, and generates `content/certificates.generated.json`.
  - The original files in `assets/` are the permanent source.

---

## Decision 02: Folder Name Discrepancy Resolution (`certificates` vs `certifications`)
- **Context:** The brief referenced `assets/certifications/`, but actual inspection during Phase 1 revealed the folder on disk is named `assets/certificates/`.
- **Decision:** In accordance with Non-Negotiable Rule 1 ("Discover, don't assume"), we use the real folder name `assets/certificates/` as primary, while adding a fallback check for `assets/certifications/` in our sync script for future resilience.

---

## Decision 03: Profile Picture & Palette Sampling
- **Context:** The portrait file is named `hero-photo.jpg` (161KB) and features a warm studio backdrop.
- **Decision:**
  - Palette tokens are calibrated directly to harmonize with the warm cream backdrop:
    - Primary Canvas: `#F3EDE3`
    - Elevated Surface: `#FAF7F1`
    - Deep Ink: `#121212`
    - Terracotta Accent: `#B5532F`
  - Portrait image is served via `next/image` with responsive `sizes`, priority loading, and an editorial rounded mask.

---

## Decision 04: Next.js App Router Architecture
- **Context:** We need high performance, static generation capability, SEO meta optimization, and lightweight serverless contact handling.
- **Decision:**
  - Use Next.js App Router (`app/`).
  - Single-page anchor layout (`/#hero`, `/#about`, etc.) for seamless scrolling and zero page reloads.
  - Implement `/api/contact/route.ts` for automated form delivery with honeypot spam protection, rate limiting, and an automatic client-side `mailto:` fallback.

---

## Decision 05: Motion Stack Separation
- **Context:** Combining multiple animation systems on the same DOM element leads to frame drops and calculation conflicts.
- **Decision:**
  - **Lenis:** Dedicated solely to window-level smooth scrolling (`SmoothScroll.tsx`).
  - **Framer Motion:** Dedicated to component-level reveals, spring interactions, magnetic pull buttons, and the certificate lightbox modal.
  - **CSS Transitions:** Used for standard micro-interactions (chip underlines, borders, color transitions).

---

## Decision 06: Self-Hosted Font Architecture
- **Context:** External Google Fonts requests block rendering, trigger layout shifts, and add unnecessary network latency.
- **Decision:**
  - Load fonts using `next/font/google` configured with `display: 'swap'` and CSS variables (`--font-serif`, `--font-sans`, `--font-mono`).
  - Display Serif: `Instrument Serif`.
  - Body Sans: `Inter`.
  - Monospace Utility: `JetBrains Mono`.

---

## Decision 07: Single Typed Content Store (`content/site.ts`)
- **Context:** Content updates should not require editing React components.
- **Decision:**
  - All textual copy, links, contact details, project specifications, and education details are centralized in `content/site.ts`.

---

## Decision 08: Single Featured Case Study Architecture
- **Context:** Rather than maintaining unverified projects, Dheeren highlighted a single real-world commercial site: Yuvi Nature Products.
- **Decision:**
  - Redesign the Projects section into a single, high-impact Featured Case Study hero panel with live status indicator, four specific contribution bullets, and a browser-frame mockup.
  - Replaced multi-card stack, index numbers, and "3 projects" wording.

---

## Decision 09: Multi-Tier Education Timeline
- **Context:** User provided complete academic history across B.Tech (Expected 2028), 12th PU (2024), and 10th SSLC (2022).
- **Decision:**
  - Converted the education section into a vertical timeline with continuous scroll-drawn hairline and individual milestone nodes sorted newest first.
  - Set graduation year to 2028 across all sections and metadata.

---

## Decision 10: Skills Curation & Verified Accuracy
- **Context:** Unverified BI tools and spreadsheet software were removed from the candidate's active skill inventory.
- **Decision:**
  - Removed third-party BI software from skill clusters, marquee ticker, and meta tags.
  - Maintained core strengths in Python, SQL, Data Analysis, Statistical Analysis, and Web Development.


---

## Decision 11: Two-Stage Résumé Inspection & Download Gating
- **Context:** Rather than initiating an immediate file download upon clicking "Resume", the owner requested a two-stage UX:
  1. The user first inspects the résumé in a viewer.
  2. "View Résumé" remains constantly available.
  3. "Download Résumé" is only revealed once the user has inspected the document.
- **Decision:**
  - Implemented `ResumeProvider` (`ResumeContext.tsx`) and an embedded PDF inspection modal (`ResumeModal.tsx`).
  - Across Hero, Nav, Contact, and Mobile Menu: "View Résumé" is the persistent default action.
  - Once viewed, `hasViewedResume` is set (and retained in session storage), revealing the direct "Download Résumé (PDF)" action across the UI and in the modal toolbar.


---

## Decision 12: Two-Project Alternating Case Study Layout (GovBridge India & Yuvi Nature Products)
- **Context:** The portfolio was updated to showcase exactly two verified projects: GovBridge India (AI-powered government scheme matching platform, team project) and Yuvi Nature Products (commercial business website, Netlify deployment).
- **Decision:**
  - Designed an alternating 2-row featured case-study layout in `Projects.tsx` with browser-frame mockups, hover tilt, live status indicators, and smooth scroll-revealed bullet points.
  - Featured Project 1: GovBridge India — AI-Powered Government Scheme Platform (live on Vercel, repo on GitHub, LangChain GovBot chatbot, multilingual support across 6 Indian languages). Added a distinct 'Team project' badge without fabricating personal roles or metrics.
  - Featured Project 2: Yuvi Nature Products — Business Website · 2026 (commercial arecanut leaf plate manufacturer site, live on Netlify, WhatsApp integration).
  - Retained the quiet 'More projects coming soon' line and updated navigation to 'Projects' and hero CTA to 'View my projects'.
