# Design System — Quiet Editorial Studio

**Guiding Philosophy:** Minimalist, editorial, tactile, restrained. A synthesis of classical print typography (large display serif) with Swiss modernist structure (monospaced indexing, hairline rules, ample negative space). The color hierarchy is derived directly from the warm studio background of Dheeren's portrait.

---

## 1. Color Palette & Tokens

### Light Theme (Default & Primary Experience)

| Token Name | CSS Variable | Hex / Value | Semantic Role |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--bg` | `#F3EDE3` | Primary warm cream backdrop matching portrait studio light. |
| **Elevated Canvas** | `--bg-elev` | `#FAF7F1` | Card surfaces, interactive containers, modal backgrounds. |
| **Deep Ink** | `--ink` | `#121212` | Primary typography, high-contrast headings, solid buttons. |
| **Muted Ink** | `--ink-muted` | `#5E5A53` | Secondary text, descriptions, timestamps, metadata. |
| **Subtle Hairline** | `--line` | `rgba(18, 18, 18, 0.12)` | Structural dividers, card borders, progress tracks. |
| **Terracotta Accent** | `--accent` | `#B5532F` | Primary interactive accents, active status dots, link underlines. |
| **Terracotta Muted** | `--accent-muted`| `rgba(181, 83, 47, 0.12)` | Subtle hover fills, pill backgrounds, selection glow. |
| **Success Emerald** | `--success` | `#2A7B4C` | "Open to internships" pulsing indicator dot. |

### Dark Theme (Secondary Toggle / System Preference)

| Token Name | CSS Variable | Hex / Value | Semantic Role |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--bg` | `#0F0F0E` | Rich deep charcoal / warm black. |
| **Elevated Canvas** | `--bg-elev` | `#171715` | Elevated dark cards and modals. |
| **Deep Ink** | `--ink` | `#F3EDE3` | Off-white cream typography. |
| **Muted Ink** | `--ink-muted` | `#A39E94` | Neutral muted gray text. |
| **Subtle Hairline** | `--line` | `rgba(243, 237, 227, 0.14)` | Low-contrast dividing borders. |
| **Terracotta Accent** | `--accent` | `#E07A52` | Higher luminosity terracotta for dark mode contrast. |

---

## 2. Typography System

All fonts are self-hosted via `next/font` for zero external network roundtrips and zero layout shift.

### Font Families
1. **Display Serif:** `Instrument Serif` (or `Fraunces`)
   - Role: Hero headline name, section display titles, pull statements, greeting lines in loader.
   - Character: High editorial elegance, distinct italic slant options, tight tracking.
2. **Body Sans:** `Inter` (or `Geist Sans`)
   - Role: Narrative summaries, project descriptions, UI labels, button text, form inputs.
   - Character: Neutral, crystal-clear readability at small sizes.
3. **Monospaced Utility:** `Geist Mono` (or `JetBrains Mono`)
   - Role: Section index numbers (`01 — ABOUT`), timestamps, metadata chips, technical tags, live clock.
   - Character: Technical precision, tabular figures for countdowns and metrics.

### Type Scale

| Scale Role | Font Family | Size (Desktop) | Size (Mobile) | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Serif | `clamp(3.5rem, 11vw, 10rem)` | `clamp(2.75rem, 10vw, 4.5rem)` | 0.95 | `-0.03em` |
| **Section Title** | Serif | `clamp(2.25rem, 5vw, 4.5rem)` | `clamp(1.75rem, 5vw, 2.5rem)` | 1.05 | `-0.02em` |
| **Pull Statement** | Serif | `1.75rem – 2.25rem` | `1.25rem – 1.5rem` | 1.35 | `-0.01em` |
| **Subheading** | Sans / Semi | `1.25rem (20px)` | `1.125rem (18px)` | 1.4 | `-0.01em` |
| **Body Primary** | Sans | `1.0625rem (17px)` | `1.0rem (16px)` | 1.65 | `0` |
| **Body Secondary**| Sans | `0.9375rem (15px)` | `0.875rem (14px)` | 1.6 | `0` |
| **Label / Eyebrow**| Mono | `0.75rem (12px)` | `0.6875rem (11px)` | 1.2 | `+0.08em` (All Caps) |
| **Counter / Metric**| Mono / Serif | `clamp(2.5rem, 6vw, 5rem)` | `2.25rem` | 1.0 | `-0.02em` |

---

## 3. Spatial System & Grid

- **Base Unit:** 4px
- **Spacing Scale:**
  - `4px` (`space-1`), `8px` (`space-2`), `12px` (`space-3`), `16px` (`space-4`), `24px` (`space-6`), `32px` (`space-8`), `48px` (`space-12`), `64px` (`space-16`), `96px` (`space-24`), `160px` (`space-40`).
- **Container Geometry:**
  - Max page width: `1200px` (`max-w-7xl` centered).
  - Editorial text measure: max `62ch` for optimal reading ergonomics.
  - Section vertical padding: `96px` to `140px` desktop; `64px` mobile.
- **Border Radii:**
  - Minimal containers / inputs: `8px` (`rounded-lg`).
  - Cards & modals: `14px` (`rounded-2xl`).
  - Interactive pill buttons & chips: `999px` (`rounded-full`).

---

## 4. Textures, Elevation & Hairlines

- **Elevation:** No heavy drop shadows. Depth is achieved purely through color contrast (`--bg` vs `--bg-elev`) and 1px hairline borders (`1px solid var(--line)`).
- **Film Grain Overlay:** A subtle, static SVG/PNG noise texture with `2.5%` opacity sits fixed over the body with `pointer-events: none` and `mix-blend-mode: overlay` to give the digital canvas an organic paper texture.
- **Selection Tone:** `::selection { background: var(--accent); color: #FAF7F1; }`.

---

## 5. Imagery & Media Standards

1. **Profile Photograph:**
   - Source: `assets/hero-photo.jpg`.
   - Framing: Cropped vertically with an organic editorial aspect ratio (4:5 desktop, 1:1 mobile).
   - Filter / Treatment: Warm tone calibration matching the canvas; delicate hairline container border; no cartoon masks or excessive vignette.
2. **Certificates:**
   - Synced into `public/certificates/`.
   - Rendered with true aspect ratios, crisp edges, and high-DPI scaling.
3. **Project Previews:**
   - Framed within styled editorial containers featuring browser mockups or device framing with hairline strokes.

---

## 6. Do's & Don'ts

### Do
- Use whitespace generously to convey confidence and focus.
- Keep all monospaced labels uppercase with letter-spacing.
- Align numbers to tabular layout (`font-variant-numeric: tabular-nums`).
- Ensure all clickable targets are at least 44×44px on mobile devices.
- Provide clear `:focus-visible` rings for keyboard users.

### Don't
- Never use cartoon 3D illustrations, generic floating shapes, or AI-generated robot avatars.
- Never use multi-color neon gradients or glowing drop-shadows.
- Never display fake percentage skill bars (e.g., "Python 92%").
- Never hijack native touch scrolling or prevent pinch-to-zoom.

