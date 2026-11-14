# Master Task Plan — Dheeren's Portfolio Rebuild

**Status Overview:**
- [x] Phase 1: Planning Documentation (PRD, UIUX, Design System, Motion, Content, Architecture, Tasks, QA, Decisions, Open Items, Asset Inventory, README)
- [x] Phase 2: Technical Foundation & Scaffolding
- [x] Phase 3: Intro Loader & Hero Experience
- [x] Phase 4: Core Sections Implementation
- [x] Phase 5: Motion Polish & Micro-interactions
- [x] Phase 6: QA, Verification & Production Readiness

---

## Phase 1: Planning & Specifications (Completed)
- [x] **T1.1:** Discover existing assets in `portfolio/assets/` and produce `/docs/ASSET_INVENTORY.md`.
- [x] **T1.2:** Author `/docs/PRD.md` with personas, user stories, acceptance criteria, and metrics.
- [x] **T1.3:** Author `/docs/UIUX_SPEC.md` with sitemap, user flows, ASCII wireframes, and component inventory.
- [x] **T1.4:** Author `/docs/DESIGN_SYSTEM.md` with color tokens, typography scales, spacing, and constraints.
- [x] **T1.5:** Author `/docs/MOTION_SPEC.md` with loader storyboard, easing tables, and reduced-motion rules.
- [x] **T1.6:** Author `/docs/CONTENT.md` compiling all verified résumé content, project specs, and microcopy.
- [x] **T1.7:** Author `/docs/ARCHITECTURE.md` detailing tech stack, directory structure, sync script, and security.
- [x] **T1.8:** Author `/docs/TASKS.md` with granular checklist and estimates.
- [x] **T1.9:** Author `/docs/QA_CHECKLIST.md` converting acceptance criteria into runnable tests.
- [x] **T1.10:** Author `/docs/DECISIONS.md` and `/docs/OPEN_ITEMS.md`.
- [x] **T1.11:** Author initial `/docs/README.md`.

---

## Phase 2: Foundation & Scaffolding (Completed)
- [x] **T2.1:** Scaffold Next.js (App Router) + TypeScript + Tailwind CSS directly in `portfolio/` without modifying `assets/`.
- [x] **T2.2:** Configure `package.json` scripts (`predev`, `prebuild`, `dev`, `build`, `lint`).
- [x] **T2.3:** Implement `scripts/sync-assets.mjs` to copy portrait, résumé, certificates, and generate `content/certificates.generated.json`.
- [x] **T2.4:** Configure Tailwind theme, CSS custom properties (`--bg`, `--ink`, `--accent`, etc.), and static film grain overlay.
- [x] **T2.5:** Setup self-hosted fonts (`Instrument Serif` / `Fraunces`, `Inter`, `Geist Mono`) via `next/font`.
- [x] **T2.6:** Create typed `/content/site.ts` housing all verified site data and configuration.
- [x] **T2.7:** Integrate Lenis smooth scrolling provider (`components/layout/SmoothScroll.tsx`).

---

## Phase 3: Intro Loader & Hero Experience (Completed)
- [x] **T3.1:** Build `components/loader/IntroLoader.tsx`:
  - 0.0–0.4s: Corner labels fade in
  - 0.2–2.2s: Tabular counter (000 -> 100) and bottom progress line
  - 0.6–1.8s: Greetings cycle ("Hello" -> "Namaste" -> "ನಮಸ್ಕಾರ" -> "Dheeren.")
  - 1.6–2.4s: Contact micro-row reveal (Email, LinkedIn, Phone) + location
  - 2.4–3.2s: Upward curtain wipe exit
  - `sessionStorage` guard (play once per session) + Skip button + reduced-motion fallback.
- [x] **T3.2:** Build `components/layout/Nav.tsx`:
  - Fixed header, scroll direction reveal, backdrop blur after 40px, scroll progress bar, mobile menu drawer.
- [x] **T3.3:** Build `components/sections/Hero.tsx`:
  - Split editorial layout, large serif name headline, role statement, availability badge, magnetic CTA buttons, portrait container with parallax.
- [x] **T3.4:** Build quick-contact micro-row with copy-to-clipboard email toast.

---

## Phase 4: Core Sections Implementation (Completed)
- [x] **T4.1:** Build `components/sections/About.tsx`:
  - Pull statement, narrative text, and animated count-up at-a-glance stat grid (CGPA 8.09, Degree, Graduation, Location).
- [x] **T4.2:** Build `components/sections/Skills.tsx`:
  - Infinite auto-scrolling marquee of key technical skills.
  - 4 grouped skill clusters (Programming, Data, Web Development, Tools & Concepts) with lift and underline hover effects.
- [x] **T4.3:** Build `components/sections/Projects.tsx`:
  - Alternating 2-row featured case studies: GovBridge India (team AI project, LangChain bot, live on Vercel, repo on GitHub) and Yuvi Nature Products (commercial business website, Netlify deployment) with browser mockups, live indicators, and bullet scroll-reveal.
- [x] **T4.4:** Build `components/sections/Education.tsx`:
  - 3-tier academic timeline (B.Tech 2028, 12th 2024, 10th 2022) with animated vertical scroll-drawn hairline.
- [x] **T4.5:** Build `components/sections/Certificates.tsx`:
  - Dynamic card grid reading `content/certificates.generated.json`.
  - Accessible Lightbox Modal (`components/ui/Modal.tsx`) with keyboard trap, Esc key close, and full PDF/image view.
- [x] **T4.6:** Build `components/sections/Contact.tsx`:
  - Channel list with left slide-in accent hover effect.
  - Contact form with name, email, message fields, Zod validation, honeypot, and mailto fallback.
- [x] **T4.7:** Build `components/layout/Footer.tsx`:
  - Live Bangalore IST clock, back-to-top button, and copyright notice.

---

## Phase 5: Motion Polish & Ergonomics (Completed)
- [x] **T5.1:** Implement custom magnetic cursor (`components/layout/Cursor.tsx`) disabled on touch devices and reduced-motion mode.
- [x] **T5.2:** Fine-tune scroll reveals and staggered text masks across all sections.
- [x] **T5.3:** Create custom 404 page (`app/not-found.tsx`) matching the quiet editorial design system.
- [x] **T5.4:** Verify `prefers-reduced-motion` compliance across all components.

---

## Phase 6: QA, Verification & Documentation (Completed)
- [x] **T6.1:** Run `npm run build` to verify zero TypeScript and ESLint errors.
- [x] **T6.2:** Execute full QA Checklist (Section 13) across mobile and desktop viewports.
- [x] **T6.3:** Verify SEO elements: JSON-LD Person schema, OpenGraph tags, `robots.txt`, and `sitemap.ts`.
- [x] **T6.4:** Record all resolved decisions in `/docs/DECISIONS.md` and pending external URLs in `/docs/OPEN_ITEMS.md`.
- [x] **T6.5:** Prepare user handoff summary with local test preview and editing instructions.
