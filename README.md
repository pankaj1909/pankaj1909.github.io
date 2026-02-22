# Pankaj Karamchandani — Portfolio

Static portfolio site for Senior Full-Stack Engineer & Technical Lead. Clean, minimal, mobile-first, and built for performance and accessibility.

## Overview

Single-page portfolio with hero, about, core competencies, case studies, experience timeline, education, and contact. Target audience: tech recruiters, SaaS companies, startup founders, and enterprise engineering clients.

## Tech Stack

- **HTML5** — Semantic markup (`nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — Custom properties (variables), mobile-first layout
- **Vanilla JavaScript** — No build step; modular, commented sections in `script.js`
- **Fonts:** Inter (Google Fonts), JetBrains Mono; system font stack fallback
- **Icons:** Font Awesome 6.5.0 (CDN)

## Local Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/pankaj1909/pankaj1909.github.io.git
   cd pankaj1909.github.io
   ```
2. Serve locally (any static server):
   ```bash
   npx serve .
   # or: python3 -m http.server 8000
   ```
3. Open `http://localhost:3000` (or the port shown).

No build or install required for development.

## Project Structure

```
/pankaj1909.github.io
├── index.html          # Main portfolio page
├── script.js           # Interactivity & animations
├── style.css           # Styles (component/section-organized)
├── PORTFOLIO_CONTENT.md # Paste-ready copy (all 8 sections)
├── assets/
│   ├── images/
│   └── icons/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

## Deployment (Free Options)

- **GitHub Pages:** Settings → Pages → Deploy from branch (`main`, `/ (root)`). No build. Optional: add `CNAME` for custom domain.
- **Netlify:** Drag folder or connect GitHub; optional build. Free tier: 100 GB bandwidth.
- **Vercel:** Import repo; static output. Free tier; auto-deploy on push.
- **Cloudflare Pages:** Direct upload or connect Git. Free; global CDN.

See **Section 8** in `PORTFOLIO_CONTENT.md` for step-by-step publishing for each option.

## Quality Standards

- **Responsive:** Mobile-first; breakpoints at 375px, 768px, 1024px, 1440px. No horizontal scroll.
- **Accessibility (WCAG 2.1 AA):** Semantic HTML, alt text on images, keyboard navigation, visible focus indicators, color contrast ≥ 4.5:1, ARIA where needed.
- **SEO:** Unique `<title>`, meta description (150–160 chars), Open Graph tags, JSON-LD Person schema, single H1, canonical URL.
- **Performance:** Target Lighthouse ≥ 90; lazy-load images; minify CSS/JS for production; preload critical fonts; avoid render-blocking resources.
- **Security:** No sensitive data in client-side JS; CSP meta; HTTPS via host.

## License

MIT. See [LICENSE](LICENSE).
