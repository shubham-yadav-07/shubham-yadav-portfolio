# Shubham Yadav | Portfolio

Personal portfolio website of **Shubham Yadav**, a Computer Science Engineering (AI & ML) student building AI/ML, data analytics and full-stack projects.

**Live site:** https://shubham-yadav-portfolio.onrender.com

<!-- Add a screenshot later: ![Portfolio preview](docs/preview.png) -->

## Features

- Dark and light theme with a toggle button (your choice is remembered)
- Custom cursor, hover and tilt effects on desktop
- Project showcase with category filters
- Interactive semester-wise SGPA chart
- Achievements and certifications list
- Contact form (opens the visitor's email app, or sends through Formspree)
- Fully responsive, keyboard friendly, respects `prefers-reduced-motion`
- SEO tags and social share preview (Open Graph)

## Sections

Home, About, Skills, Projects, Education, Achievements, Contact.

## Featured projects

| Project | What it is |
| --- | --- |
| **HealthLens AI** | Explainable diabetes risk analysis with a four-model ML comparison and SHAP |
| **POLARLOGIX** | Offline-first polar expedition logistics and asset management platform |
| **Nextlytics** | Dataset-upload analytics tool with EDA and ETL in one flow |

More projects (Syntax, TN Elections 2026 Analytics, YatraLens, Deskline CRM, Beyonder AI, Startup Funding DApp, MetaMind) are listed on the site.

## Tech stack

- React 18 and TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React icons

## Run locally

Requirements: [Node.js](https://nodejs.org) 18 or newer.

```bash
git clone https://github.com/shubham-yadav-07/shubham-yadav-portfolio.git
cd shubham-yadav-portfolio
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run typecheck` | Run the TypeScript check |
| `npm run build` | Type-check and create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```
shubham-yadav-portfolio/
├── index.html              SEO tags, Open Graph, JSON-LD
├── public/
│   ├── assets/             profile photo and banner
│   ├── resume/             resume PDF used by the Download Resume button
│   ├── favicon.svg
│   └── og-image.png        social share preview (1200x630)
└── src/
    ├── components/         Navbar, Hero, About, Skills, Projects, Education, ...
    ├── data/               edit your content here
    │   ├── profile.ts      name, email, links, resume path
    │   ├── projects.ts     projects and GitHub / demo URLs
    │   ├── skills.ts       skill groups
    │   ├── education.ts    college details and semester SGPA
    │   └── certifications.ts
    ├── hooks/              theme, active section, pointer detection
    ├── App.tsx
    └── index.css           global styles and theme colors
```

## Contact

- Email: shubhamyadav.pro@gmail.com
- LinkedIn: [shubham-yadav-11aa552aa](https://www.linkedin.com/in/shubham-yadav-11aa552aa)
- GitHub: [shubham-yadav-07](https://github.com/shubham-yadav-07)
- LeetCode: [shubham123215](https://leetcode.com/u/shubham123215)
- X: [@Shubham_Dev_07](https://x.com/Shubham_Dev_07)

## License

All rights reserved. The code is public for viewing and reference. Please do not copy the content, photos or resume.
