# Dheeren — Portfolio Website (v2 Rebuild)

> Personal portfolio for **Dheeren**, a 3rd-year Data Science undergraduate at Nagarjuna College of Engineering and Technology, Bangalore. Designed as a quiet, editorial studio experience highlighting hands-on data analytics (Python, SQL) and real-world website engineering.

---

## 1. Quick Start

### Installation
```bash
# Install dependencies
npm install

# Start local dev server (auto-runs asset synchronization)
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs predev sync, starts Next.js App Router local server on port 3000 |
| `npm run build` | Runs prebuild sync, compiles production build with type checking |
| `npm run start` | Serves compiled production build locally |
| `npm run lint` | Runs Next.js ESLint checks |
| `npm run sync` | Manually synchronizes assets from `assets/` to `public/` and updates certificate manifest |

---

## 3. How to Update Site Content

All textual content, links, education information, and projects live in a single typed configuration file:
👉 **`content/site.ts`**

- **Change LinkedIn URL:** Update `urls.linkedin` or define `NEXT_PUBLIC_LINKEDIN_URL` in `.env.local`.
- **Change GitHub URL:** Update `urls.github` or define `NEXT_PUBLIC_GITHUB_URL` in `.env.local` (leaves empty to hide).
- **Update CGPA or Graduation:** Modify `about.quickFacts` and `education` objects.
- **Update Projects:** Modify the `projects.items` array.

---

## 4. How to Add New Certificates

The application includes an automated build-time certificate discovery and mapping system:
1. Drop any certificate file (`.png`, `.jpg`, `.jpeg`, `.webp`, `.pdf`) into `portfolio/assets/certificates/`.
2. Do **not** touch `public/` directly.
3. Start the dev server (`npm run dev`) or build (`npm run build`).
4. The script (`scripts/sync-assets.mjs`) will:
   - Copy the certificate into `public/certificates/`.
   - Derive the title from the file name.
   - Update `content/certificates.generated.json`.
   - Display it automatically in the `#certificates` interactive gallery.

---

## 5. Deployment Guide

### Deploying to Vercel (Recommended)
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com/new) and select the repository.
3. Framework Preset: **Next.js**.
4. Configure optional Environment Variables:
   - `NEXT_PUBLIC_SITE_URL`: Your custom production domain (e.g. `https://dheeren.dev`)
   - `NEXT_PUBLIC_LINKEDIN_URL`: Your LinkedIn profile URL
   - `NEXT_PUBLIC_GITHUB_URL`: Your GitHub profile URL (optional)
5. Click **Deploy**. Vercel will trigger `npm run build` which automatically executes the prebuild asset sync.

---

## 6. Architecture & Design Tokens
- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS with CSS Variables (`--bg: #F3EDE3`, `--ink: #121212`, `--accent: #B5532F`)
- **Typography:** Self-hosted via `next/font` (Instrument Serif, Inter, Geist Mono)
- **Smooth Scroll:** Lenis
- **Motion:** Framer Motion with reduced-motion fallbacks
- **Full Documentation:** See `/docs/` for PRD, Design System, Motion Spec, and Architecture diagrams.

