# Technical Architecture — Dheeren's Portfolio (v2 Rebuild)

## 1. System Architecture Overview

Dheeren's portfolio v2 is built as a modern, high-performance web application utilizing **Next.js (App Router)** with TypeScript, Tailwind CSS, Lenis, and Framer Motion. It bridges static efficiency with dynamic, automated asset ingestion.

```
                           +--------------------------------------+
                           |  portfolio/assets/ (READ-ONLY)       |
                           |  - hero-photo.jpg                    |
                           |  - dheeren_resume.pdf                |
                           |  - certificates/                     |
                           +------------------+-------------------+
                                              |
                                     (npm run prebuild /
                                      scripts/sync-assets.mjs)
                                              |
                   +--------------------------+--------------------------+
                   |                                                     |
                   v                                                     v
+--------------------------------------+             +--------------------------------------+
| public/                              |             | content/                             |
| - images/hero-photo.jpg              |             | - site.ts (Typed single source)      |
| - Dheeren_Resume.pdf                 |             | - certificates.generated.json        |
| - certificates/*.jpg                 |             +-------------------+------------------+
+------------------+-------------------+                                 |
                   |                                                     |
                   +--------------------------+--------------------------+
                                              |
                                              v
                              +--------------------------------+
                              | Next.js App Router (Client/SSR)|
                              | - app/layout.tsx               |
                              | - app/page.tsx (Single Page)   |
                              | - app/api/contact/route.ts     |
                              +---------------+----------------+
                                              |
                                              v
                              +--------------------------------+
                              | Production Deployment          |
                              | (Vercel / Netlify / Render)    |
                              +--------------------------------+
```

---

## 2. Technology Stack & Rationale

| Layer | Technology | Decision Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router, React 19 / 18) | Industry standard for production React, native font optimization (`next/font`), image optimization (`next/image`), and edge-ready API routes. |
| **Language** | TypeScript (Strict mode) | Strict type checking prevents runtime bugs, enforces schema consistency for `content/site.ts`, and guarantees rock-solid props interfaces. |
| **Styling** | Tailwind CSS + CSS Variables | Utility-first efficiency combined with runtime CSS custom properties for dynamic theming, fluid clamping, and zero CSS runtime bloat. |
| **Smooth Scrolling** | Lenis | Ultra-lightweight (3KB), modern momentum scrolling that maintains standard DOM accessibility without heavy scroll-hijacking penalties. |
| **Animation** | Framer Motion + GSAP | Framer Motion handles declarative component reveals, layoutId modal transitions, and spring cursors; GSAP handles scroll-scrubbed hero parallax. |
| **Icons** | Lucide React | Clean, tree-shakeable SVG icon set with consistent 1.5–2.0px stroke widths matching editorial hairline aesthetics. |
| **Validation** | Zod | Fast, zero-dependency schema validation for form submissions on client and API route. |

---

## 3. Directory & File Organization

```
portfolio/
├── assets/                          # [READ-ONLY SOURCE OF TRUTH]
│   ├── hero-photo.jpg
│   ├── dheeren_resume.pdf
│   └── certificates/
│       ├── Deloitte_Certificate.jpg
│       └── cisco-networking-essentials.jpg
├── app/
│   ├── layout.tsx                   # Root HTML shell, fonts, meta, grain overlay
│   ├── page.tsx                     # Main single-page portfolio layout
│   ├── not-found.tsx                # Custom 404 page
│   ├── sitemap.ts                   # Dynamic sitemap generator
│   ├── robots.ts                    # Dynamic robots.txt
│   └── api/
│       └── contact/
│           └── route.ts             # Contact form handler (Zod, rate limiting, honeypot)
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                  # Fixed header with progress bar & scroll direction
│   │   ├── MobileMenu.tsx           # Full-screen drawer for mobile navigation
│   │   ├── Footer.tsx               # Bangalore IST clock, back-to-top, copyright
│   │   ├── Cursor.tsx               # Magnetic custom cursor (pointer: fine only)
│   │   └── SmoothScroll.tsx         # Lenis smooth-scroll provider
│   ├── loader/
│   │   └── IntroLoader.tsx          # 2.8s editorial counter & greeting sequence
│   ├── sections/
│   │   ├── Hero.tsx                 # Headline, CTAs, portrait image, micro-contact
│   │   ├── About.tsx                # Pull quote, narrative, count-up CGPA metrics
│   │   ├── Skills.tsx               # Marquee + 4 grouped skill clusters
│   │   ├── Projects.tsx             # Featured project cards
│   │   ├── Education.tsx            # B.Tech timeline
│   │   ├── Certificates.tsx         # Dynamic grid + lightbox modal
│   │   └── Contact.tsx              # Channels + validated form
│   └── ui/
│       ├── Button.tsx               # Magnetic button with primary/ghost variants
│       ├── Chip.tsx                 # Skill pill with hover accent underline
│       ├── Modal.tsx                # Accessible dialog / focus trap
│       └── Toast.tsx                # Copy notification feedback
├── content/
│   ├── site.ts                      # Single source of truth for all copy & config
│   └── certificates.generated.json  # Manifest generated by sync script
├── docs/                            # Planning & specifications documentation
├── lib/
│   ├── motion.ts                    # Animation variants, easings, and spring presets
│   ├── useReducedMotion.ts          # Media query hook for reduced motion
│   └── useIsTouch.ts                # Touch device detection hook
├── public/                          # [GENERATED / SYNCED ASSETS]
│   ├── images/
│   ├── certificates/
│   └── Dheeren_Resume.pdf
└── scripts/
    └── sync-assets.mjs              # Asset synchronization & manifest compilation script
```

---

## 4. Asset Synchronization Pipeline (`sync-assets.mjs`)

The asset synchronization script runs automatically before every development server start (`predev`) and production build (`prebuild`).

### Execution Flow:
1. **Source Discovery:** Scans `portfolio/assets/` without modifying or deleting anything.
2. **Profile Portrait:**
   - Discovers `assets/hero-photo.jpg`.
   - Copies to `public/images/hero-photo.jpg`.
3. **Résumé PDF:**
   - Discovers `assets/dheeren_resume.pdf`.
   - Copies to `public/Dheeren_Resume.pdf`.
4. **Certificates Scan:**
   - Scans `assets/certificates/` (and `assets/certifications/`).
   - Copies all image and PDF files to `public/certificates/`.
   - Generates manifest `content/certificates.generated.json` with file paths, derived titles, and integration hooks for `content/site.ts` overrides.

---

## 5. Security & Contact Architecture

1. **Client Form Security:**
   - Hidden honeypot field (`_hp_company`) invisible to humans. If populated by automated bots, the submission is silently dropped.
   - Client-side validation using Zod prevents submission of invalid payloads.
2. **API Route Protection:**
   - In-memory sliding-window IP rate limiter: max 5 submissions per hour per IP.
   - Strict content sanitization to prevent XSS.
3. **Mailto Fallback:**
   - If the API route encounters an upstream error or network failure, an interactive mailto fallback is presented to the user with their pre-filled message.
4. **Environment Variables:**
   - All client-safe variables are strictly prefixed with `NEXT_PUBLIC_`.
   - No private API keys or server secrets are bundled into client code.

---

## 6. Environment Variables Reference

| Variable Name | Required? | Default / Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Optional | `https://dheeren.dev` (Used for OpenGraph canonical URLs) |
| `NEXT_PUBLIC_LINKEDIN_URL`| Optional | Candidate's LinkedIn profile link |
| `NEXT_PUBLIC_GITHUB_URL` | Optional | Candidate's GitHub profile link |
| `RESEND_API_KEY` | Optional | API key if forwarding form via Resend |
| `CONTACT_NOTIFICATION_EMAIL`| Optional | `dheeren438@gmail.com` |

