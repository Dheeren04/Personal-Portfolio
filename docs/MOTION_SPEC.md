# Motion Specification — Dheeren's Portfolio

**Motion Philosophy:** Buttery-smooth, physical, quiet, and purposeful. Motion is used exclusively to direct attention, establish hierarchy, and reward interaction — never as superficial decoration.

---

## 1. Core Easings & Springs

```typescript
// /lib/motion.ts tokens
export const TRANSITIONS = {
  easeOutExpo: [0.16, 1, 0.3, 1],       // Natural decelerated reveals
  easeInOutQuart: [0.76, 0, 0.24, 1],   // Editorial curtain wipes & overlays
  easeOutBack: [0.34, 1.56, 0.64, 1],   // Micro bounce for badges/indicators
  springMagnetic: { stiffness: 120, damping: 20, mass: 0.6 },
  springCursor: { stiffness: 400, damping: 28 },
};
```

| Movement Type | Duration | Easing Function | Applied Context |
| :--- | :--- | :--- | :--- |
| **Micro Hover** | `150ms – 250ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Chip lift, button scale, link underline slide |
| **Element Reveal** | `600ms – 900ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Section title masks, card entrances, stat counters |
| **Curtain Wipe** | `800ms – 1000ms` | `cubic-bezier(0.76, 0, 0.24, 1)` | Intro loader exit, full-screen transitions |
| **Smooth Scroll** | Continuous | Lenis `lerp: 0.1` | Inertial document scrolling |

---

## 2. Intro Sequence Storyboard & Timings

Total active duration: **2.8s – 3.2s** (hard-capped with a safety timeout of 3.5s). Runs **once per session** via `sessionStorage` guard; repeat visits execute a simple 400ms fade.

```
0.0s          0.4s          0.8s          1.2s          1.6s          2.0s          2.4s          2.8s        3.2s
|-------------|-------------|-------------|-------------|-------------|-------------|-------------|-----------|
[1. Corner Labels Fade In]
              [2. Numeric Counter 000 -> 100 with bottom progress line]
                            [3. Greetings Cycle: Hello -> Namaste -> ನಮಸ್ಕಾರ -> Dheeren]
                                                        [4. Quick Contact Reveal: Email · LinkedIn · Phone]
                                                                                    [5. Curtain Wipe Upward]
                                                                                                  [Hero Reveal]
```

### Frame-by-Frame Timeline
- **0.0s – 0.4s:** Top-left label `PORTFOLIO — 2026` and top-right indicator `LOADING...` fade in (`opacity: 0 -> 1`, `duration: 0.4s`).
- **0.2s – 2.2s:** Tabular number counter accelerates from `000` to `100` (`tabular-nums`, cubic eased). Simultaneously, a 1px hairline bar scales across the bottom screen edge (`scaleX: 0 -> 1`).
- **0.6s – 1.8s:** Greeting marquee masks up in center serif typography:
  - 0.6s: "Hello"
  - 0.95s: "Namaste"
  - 1.30s: "ನಮಸ್ಕಾರ" (Kannada, honoring Bangalore)
  - 1.65s: "Dheeren." (locks in place)
- **1.6s – 2.4s (Critical Requirement):** Directly beneath the name, a row of three contact icons fades up with 80ms stagger:
  - ✉ `dheeren438@gmail.com`
  - in `LinkedIn`
  - ☎ `+91 76249 56501`
  Along with the location badge: `Data Science · Bangalore`.
- **2.4s – 3.2s:** Overlay curtain lifts vertically with `clip-path: polygon(0 0, 100% 0, 100% 0, 0 0)` or `translateY(-100%)` via `cubic-bezier(0.76, 0, 0.24, 1)`.
- **3.2s+:** Hero elements cascade into view: name characters slide up through mask, hero portrait scale settles `1.06 -> 1.0`, navigation descends from `translateY(-100%) -> 0`.

---

## 3. Per-Section Motion Specs

### 1. Navigation
- Sticky header sits transparent over hero.
- Past 40px scroll: transition to blurred backdrop (`backdrop-blur-md`) + hairline border in 200ms.
- Direction detection: hides when scrolling down rapidly (>15px delta), slides back down immediately on any upward scroll.
- Top thin line represents window scroll percentage (`scaleX: 0 -> 1`).

### 2. Hero Section
- **Parallax:** Portrait image moves at `speed: 0.85` relative to scroll (max ±24px).
- **Magnetic Buttons:** Primary CTAs track cursor within 80px radius (max 12px translation).
- **Scroll Prompt:** Downward animating 1px tick at bottom of hero.

### 3. About Section
- **Split Line Reveal:** Heading and pull statement reveal masked line-by-line as section scrolls into the middle 30% of viewport.
- **Count-Up:** CGPA metric animates from `0.00` to `8.09` using Framer Motion `animate(0, 8.09, { duration: 1.8 })`.

### 4. Skills Section
- **Infinite Marquee:** Continuous horizontal ticker translating leftward at 28px/second. Pauses instantly on mouse hover.
- **Chip Interaction:** Hover elevates chip `translateY(-2px)` and animates terracotta underline width from 0% to 100%.

### 5. Projects Section
- **Card Stacking / Parallax:** Cards feature subtle vertical parallax offset for preview artwork (±40px).
- **Hover State:** Preview image scales `1.0 -> 1.04` with smooth easing; custom cursor displays "View" pill.

### 6. Education Section
- **Timeline Drawing:** Vertical timeline hairline animates down via `scaleY` tied to viewport scroll progress.

### 7. Certificates Section
- **Shared-Layout Modal:** Click triggers Framer Motion `layoutId` expansion from card thumbnail into centered lightbox dialog without jarring layout shifts.

### 8. Contact Section
- **Slide-in Fill:** Channel links (Email, Phone, LinkedIn) display an accent fill sliding in from the left on hover (`translateX(-100%) -> 0%`).

---

## 4. Accessibility & Reduced Motion System

When `prefers-reduced-motion: reduce` is detected:
- The intro loader skips all counter/slide animations and shows a static, accessible 400ms fade-in.
- Smooth scroll (Lenis) is disabled; native instant jump scrolling is restored.
- Parallax transforms (`translateY`) are reset to `0`.
- Infinite marquee ticker halts into a clean responsive static flex grid.
- Custom cursor is deactivated; standard operating system cursor is used.
- All element reveals convert from `translateY(30px) + opacity` to pure `opacity: 0 -> 1` (duration <= 250ms).

---

## 5. Performance Budget

- **Target Frame Rate:** Solid 60 FPS on mid-tier mobile (60Hz / 120Hz display refresh).
- **GPU Exclusivity:** Animations are strictly restricted to `transform`, `opacity`, and `clip-path`. Zero animation of layout-triggering properties (`width`, `height`, `margin`, `padding`, `top`, `left`).
- **Will-Change Strategy:** `will-change: transform` applied strictly during active transition states and unmounted when idle.
- **Scroll Throttling:** Lenis integration synchronizes with `requestAnimationFrame` and pauses when tab is hidden or blurred.

