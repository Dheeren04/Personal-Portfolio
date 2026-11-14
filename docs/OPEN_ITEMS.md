# Open Items & External Placeholders

The following items represent candidate-specific external links or assets that can optionally be supplied by Dheeren.

---

## Action Items for Candidate / Site Owner

| ID | Item | Current Status | Configuration Location | How to Resolve |
| :--- | :--- | :--- | :--- | :--- |
| **OI-01** | **GovBridge India — Specific Contribution** | Team Project bullets displayed without claimed role | `content/site.ts` | Specify your exact personal role/responsibilities (e.g. frontend lead, LangChain integration, prompt engineering) if you would like it highlighted beyond the general team description. |
| **OI-02** | **GovBridge India — Project Year** | Displayed as 2026 | `content/site.ts` | Confirm the exact completion or development year for GovBridge India if different from 2026. |
| **OI-03** | **GovBridge India — Platform Screenshot** | Styled Mockup Frame with Domain | `public/projects/govbridge-preview.jpg` | Provide a high-resolution screenshot of the live GovBridge India interface (`https://gov-bridge-india.vercel.app`) to display inside the browser mockup panel. |
| **OI-04** | **Yuvi Nature Products — Website Screenshot** | Styled Mockup Frame with Domain | `public/projects/yuvi-preview.jpg` | Provide a high-resolution desktop screenshot of the live Yuvi Nature Products site (`https://yuvinature-products.netlify.app/`) to display inside the browser mockup panel. |
| **OI-05** | **GitHub Profile URL (Optional)** | Hidden if empty | `content/site.ts` or `NEXT_PUBLIC_GITHUB_URL` in `.env.local` | Provide your personal GitHub URL if you wish to display a personal GitHub icon alongside your contact channels. |
| **OI-06** | **Custom Production Domain (Optional)** | Default Vercel/Netlify URL | `NEXT_PUBLIC_SITE_URL` in `.env.local` | Set your custom domain (e.g. `https://dheeren.dev`) when deploying to production. |
| **OI-07** | **Contact Form Email Delivery Key (Optional)** | Built-in API + Mailto Fallback | `RESEND_API_KEY` in `.env.local` | If you wish to receive form submissions directly in your Gmail inbox via Resend, add a free API key from [resend.com](https://resend.com). Otherwise, the form provides a 1-click `mailto:` fallback. |

---

## Resolved Items
- ✅ **LinkedIn Profile URL:** Configured to `https://www.linkedin.com/in/dheerengowda/`.
- ✅ **Yuvi Nature Products Live URL:** Configured to `https://yuvinature-products.netlify.app/`.
- ✅ **GovBridge India URLs:** Live URL configured to `https://gov-bridge-india.vercel.app` and repository to `https://github.com/MuralimithunCS/GovBridgeIndia`.
- ✅ **Profile Picture:** Found `assets/hero-photo.jpg`. Synced to `public/images/hero-photo.jpg`.
- ✅ **Updated Résumé Document:** Picked up `assets/Dheeren_Resume.pdf` and synced to `public/Dheeren_Resume.pdf`.
- ✅ **Deloitte Certificate:** Found `assets/certificates/Deloitte_Certificate.jpg`. Mapped and synced.
- ✅ **Cisco Certificate:** Found `assets/certificates/cisco-networking-essentials.jpg`. Mapped and synced.
- ✅ **Education Timeline:** Updated to 3-tier vertical timeline (B.Tech 2028, 12th 2024, 10th 2022).
- ✅ **Featured Projects Structure:** Alternating 2-project case study layout for GovBridge India and Yuvi Nature Products implemented.
