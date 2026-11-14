# Quality Assurance (QA) Checklist — Dheeren's Portfolio Rebuild

This checklist formalizes the acceptance criteria from Section 13 of the project specification into testable verification steps.

---

## 1. Intro Sequence & Loading Experience
- [x] **QA-01 (Session Guard):** Intro loader plays once per session. Refreshing within the same browser session skips the sequence and loads directly to the hero within 400ms.
- [x] **QA-02 (Contact Information Display):** During the loader sequence (at ~1.6s–2.4s), the candidate's email (`dheeren438@gmail.com`), LinkedIn, and phone (`+91 76249 56501`) are clearly displayed before the curtain wipe.
- [x] **QA-03 (Skip Functionality):** A "Skip" link appears within 0.8s and pressing `ESC` or clicking "Skip" immediately triggers the curtain exit.
- [x] **QA-04 (Reduced Motion Support):** In browsers with `prefers-reduced-motion: reduce` enabled, the complex counter and greetings are replaced with a simple static 400ms fade.
- [x] **QA-05 (Hard Timeout):** The loader never blocks page interaction for longer than 3.5s under any network condition.

---

## 2. Information Architecture & Navigation
- [x] **QA-06 (All Sections Present):** The document contains `#hero`, `#about`, `#skills`, `#projects`, `#education`, `#certificates`, `#contact`, and footer in correct semantic order.
- [x] **QA-07 (Fixed Navigation Behavior):** The header is transparent at the top, gains a blurred cream background + hairline border after 40px of scrolling, hides on fast scroll down, and reveals on scroll up.
- [x] **QA-08 (Smooth Anchor Scrolling):** Clicking any navigation link smoothly scrolls to the target anchor with a proper vertical offset so titles are not obscured by the fixed header.
- [x] **QA-09 (Active Section Highlight):** The navigation link corresponding to the section currently in viewport is visibly highlighted.
- [x] **QA-10 (Mobile Drawer):** On screens <768px, the hamburger menu toggles a full-screen drawer with trapped focus, animated link reveals, and body scroll lock.

---

## 3. Content Fidelity & Asset Management
- [x] **QA-11 (Source Asset Integrity):** Nothing inside `portfolio/assets/` was renamed, moved, modified, or deleted.
- [x] **QA-12 (Asset Inventory Match):** The files referenced in `ASSET_INVENTORY.md` (`hero-photo.jpg`, `dheeren_resume.pdf`, `Deloitte_Certificate.jpg`, `cisco-networking-essentials.jpg`) match the real files.
- [x] **QA-13 (Résumé Download):** Clicking any "Download Résumé" button across the hero, nav, contact section, or footer opens/downloads the synced PDF (`/Dheeren_Resume.pdf`).
- [x] **QA-14 (Profile Picture Treatment):** Hero portrait renders the real image from `assets/hero-photo.jpg` with a warm studio tone, responsive aspect ratio, and no distortion.
- [x] **QA-15 (No Fabricated Content):** Zero invented employers, metrics, or awards appear in the code. All verified links (LinkedIn, Yuvi live) are active.
- [x] **QA-16 (Skill Clusters):** Skills are organized strictly into the 4 required clusters without artificial percentage bars or sliders.
- [x] **QA-17 (Skills Marquee):** Infinite marquee scrolls continuously, pauses when hovered, and halts under reduced motion.
- [x] **QA-18 (Project Section Integrity):** Alternating 2-row featured case studies: GovBridge India (team AI project, LangChain bot, live on Vercel, repo on GitHub) and Yuvi Nature Products (commercial business website, Netlify deployment) with browser mockups, live badges, and bullet scroll-reveal.
- [x] **QA-19 (Education Timeline):** 3-milestone vertical timeline (B.Tech 2028, 12th 2024, 10th 2022) with animated line-draw on scroll.

---

## 5. Certificates & Dynamic Gallery
- [x] **QA-19 (Build-Time Synchronization):** Running `scripts/sync-assets.mjs` generates `content/certificates.generated.json` and copies certificates to `public/certificates/`.
- [x] **QA-20 (Deloitte & Cisco Mapping):** Both Deloitte and Cisco certificates are correctly mapped to their respective titles, issuers, and years.
- [x] **QA-21 (Lightbox / Modal):** Clicking any certificate card opens an accessible modal with high-resolution image preview, descriptive metadata, and an external view link.
- [x] **QA-22 (Keyboard Modal Dismiss):** Pressing the `Escape` key closes the certificate modal and returns focus to the triggering card.

---

## 6. Contact Channels & Form
- [x] **QA-23 (Direct Channels):**
  - `mailto:dheeren438@gmail.com` launches default mail client.
  - `tel:+917624956501` initiates telephone dialer on mobile devices.
  - Email copy button copies address to clipboard and displays an acknowledgment toast.
- [x] **QA-24 (Form Validation):** Blank submissions or malformed email addresses produce accessible inline validation errors.
- [x] **QA-25 (Honeypot & Anti-Spam):** Hidden honeypot input field rejects bot submissions without false positives.
- [x] **QA-26 (Mailto Fallback):** If API submission is offline or fails, an immediate one-click mailto fallback link is provided with user-entered values populated.

---

## 7. Performance & Accessibility (WCAG 2.2 AA)
- [x] **QA-27 (Lighthouse Audit):** Desktop performance ≥ 95, accessibility ≥ 95, best practices ≥ 95, SEO ≥ 95; Mobile performance ≥ 90.
- [x] **QA-28 (Core Web Vitals):** LCP < 2.0s; CLS < 0.05.
- [x] **QA-29 (Color Contrast):** All text elements pass WCAG AA contrast ratio (≥ 4.5:1 for normal text, ≥ 3:1 for large text).
- [x] **QA-30 (Keyboard Only Navigation):** The entire site is operable without a mouse. All interactive elements show clear `:focus-visible` styling.
- [x] **QA-31 (Semantic Structure):** Exactly one `<h1>`, sequential heading levels (`<h2>`, `<h3>`), semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).

---

## 8. Cross-Device & Responsive Verification
- [x] **QA-32 (Viewport Testing):** Zero horizontal scrollbars or element collisions at 360px, 480px, 768px, 1024px, 1280px, and 1536px widths.
- [x] **QA-33 (Touch Devices):** Custom magnetic cursor is completely disabled on touch screens (`pointer: coarse`). Touch targets are at least 44×44px.
- [x] **QA-34 (Local Time Widget):** Bengaluru local time in footer displays accurate IST time (`Asia/Kolkata` timezone).
- [x] **QA-35 (404 Page):** Accessing an invalid route renders the custom 404 page matching the design system with a return-home action.

---

## 9. Build & Deployment
- [x] **QA-36 (Zero Compile Errors):** `npm run build` completes with 0 TypeScript and ESLint warnings/errors.
- [x] **QA-37 (Console Cleanliness):** Browser developer tools show 0 runtime exceptions or hydration errors.
