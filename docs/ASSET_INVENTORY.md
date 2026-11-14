# Asset Inventory

**Date Scanned:** 2026-11-14  
**Workspace Root:** `portfolio/`  
**Assets Source Folder:** `portfolio/assets/` (Read-only source of truth)

---

## 1. Inventory Summary

| Path | Real File Name | File Type | Size | Detected Role | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `assets/hero-photo.jpg` | `hero-photo.jpg` | JPEG image | 161,152 bytes (~157 KB) | Profile photo | Studio portrait with warm cream background. Used for hero and OG meta. |
| `assets/dheeren_resume.pdf` | `dheeren_resume.pdf` | PDF document | 43,926 bytes (~43 KB) | Résumé | Dheeren's current résumé. Synced to `public/Dheeren_Resume.pdf`. |
| `assets/certificates/cisco-networking-essentials.jpg` | `cisco-networking-essentials.jpg` | JPEG image | 503,620 bytes (~492 KB) | Certificate (Cisco) | Cisco Networking Essentials credential. Synced to `public/certificates/`. |
| `assets/certificates/Deloitte_Certificate.jpg` | `Deloitte_Certificate.jpg` | JPEG image | 206,718 bytes (~202 KB) | Certificate (Deloitte) | Deloitte Data Analytics Job Simulation credential. Synced to `public/certificates/`. |

---

## 2. Structural Observations & Resolution Rules

1. **Subfolder Name:** The certificates folder in `assets/` is named `certificates/` (rather than `certifications/`). The sync script (`scripts/sync-assets.mjs`) is implemented to scan `assets/certificates/` and fall back to `assets/certifications/` if present.
2. **Profile Image Name:** The actual file name is `hero-photo.jpg` (not `profile.jpg`). All sync operations, references, and color samplings will specifically reference `assets/hero-photo.jpg`.
3. **Résumé File Name:** The actual file name is `dheeren_resume.pdf`. It is mapped and synced to `public/Dheeren_Resume.pdf` so all UI buttons have a predictable, professional public download URL while leaving the source untouched.
4. **Certificate Match Mapping:**
   - `Deloitte_Certificate.jpg` ➔ Maps directly to Certificate #1 ("Data Analytics Job Simulation — Deloitte (via Forage)").
   - `cisco-networking-essentials.jpg` ➔ Maps directly to Certificate #2 ("Cisco Networking Essentials — Cisco Networking Academy").
5. **Integrity Rule:** `portfolio/assets/` is strictly read-only. No script or command shall rename, move, delete, or modify any file in `portfolio/assets/`.

