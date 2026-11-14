# Dheeren's Personal Portfolio (v2 Rebuild)

A quiet editorial portfolio for **Dheeren**, a 3rd-year Data Science undergraduate at Nagarjuna College of Engineering and Technology, Bangalore, seeking an entry-level Data Analyst / Data Science internship.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lenis**.

---

## 1. Quick Start & Local Development

### Prerequisites
- Node.js 18.18+ or Node.js 20+ (tested on Node v24.15.0)
- npm or pnpm

### Setup Steps
```bash
# 1. Install dependencies
npm install

# 2. Run the development server (automatically triggers asset sync)
npm run dev

# 3. Open in browser
# Navigate to http://localhost:3000
```

---

## 2. Project Scripts

- `npm run predev` / `npm run prebuild`: Runs `scripts/sync-assets.mjs` to automatically discover and sync assets from `assets/` to `public/` and generate certificate metadata.
- `npm run dev`: Starts the Next.js local development server.
- `npm run build`: Compiles optimized production bundle with TypeScript and ESLint validation.
- `npm run start`: Runs the production server locally.
- `npm run lint`: Executes static code analysis.

---

## 3. How to Edit Content

All text, copy, links, contact info, and project details are stored in **a single typed configuration file**:
👉 `content/site.ts`

To update your summary, CGPA, project links, or LinkedIn URL:
1. Open `content/site.ts`.
2. Edit the corresponding field.
3. Save the file. Changes reflect instantly via Fast Refresh.

---

## 4. How to Add New Certificates

The portfolio features an automated certificate sync pipeline:
1. Place your certificate image (`.png`, `.jpg`, `.jpeg`, `.webp`) or `.pdf` into `portfolio/assets/certificates/`.
2. Do **not** touch code or modify `public/` manually.
3. Run `npm run build` or `npm run dev`.
4. The sync script (`scripts/sync-assets.mjs`) will:
   - Detect the new file.
   - Copy it to `public/certificates/`.
   - Derive the title from the file name.
   - Update `content/certificates.generated.json`.
5. *(Optional)* Add a custom title, issuer, year, or description in `content/site.ts` under `certificateOverrides`.

---

## 5. Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and import the repository.
3. Framework preset: **Next.js**.
4. Configure Environment Variables (optional):
   - `NEXT_PUBLIC_SITE_URL`: Your custom production domain (e.g. `https://dheeren.dev`)
   - `NEXT_PUBLIC_LINKEDIN_URL`: Your LinkedIn profile link
   - `NEXT_PUBLIC_GITHUB_URL`: Your GitHub profile link
   - `RESEND_API_KEY`: If using Resend for contact form delivery
5. Click **Deploy**. Vercel will run `npm run build` which automatically executes the prebuild asset sync.

### Deploying to Netlify / Render
- Build command: `npm run build`
- Publish directory: `.next` (or static export `out/` if using `output: 'export'`)

