# Shubham Yadav | Portfolio

A futuristic, recruiter-friendly personal portfolio built with **React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide React**.

- **Dark / light theme** toggle (dark by default, choice is remembered)
- 3D wireframe globe (plain canvas, no WebGL dependency) + CSS-3D tilt cards
- **Cursor effects:** spotlight that follows the mouse, trailing ring cursor, magnetic buttons, hover shine, parallax floating tags (mouse devices only, off for reduced motion)
- Professional photo hero, projects filter, interactive semester-wise SGPA chart
- Certifications list, working contact form (mailto fallback or Formspree)
- Responsive, keyboard accessible, `prefers-reduced-motion` respected, SEO tags included

> Semester results are shown as **SGPA** only. No cumulative CGPA is calculated or displayed.

---

## 1. Requirements

- [Node.js](https://nodejs.org) **18 or newer** (20 or 22 recommended)
- [VS Code](https://code.visualstudio.com) (optional but recommended)
- [Git](https://git-scm.com)

Check versions:

```bash
node -v
npm -v
git --version
```

## 2. Run locally in VS Code

1. Unzip `Shubham_Yadav_Portfolio.zip`.
2. In VS Code: **File → Open Folder →** select the `shubham-yadav-portfolio` folder.
3. Open the terminal: **Terminal → New Terminal**.
4. Install dependencies (first time only):

   ```bash
   npm install
   ```

5. Start the dev server:

   ```bash
   npm run dev
   ```

6. Open the URL printed in the terminal (usually http://localhost:5173).

Other commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run typecheck` | TypeScript check only |
| `npm run build` | Type-check + production build into `dist/` |
| `npm run preview` | Serve the production build locally |

## 3. Project structure

```
shubham-yadav-portfolio/
├── index.html                 SEO meta tags, Open Graph, JSON-LD
├── public/
│   ├── assets/
│   │   ├── profile-640.webp   hero photo (optimised)
│   │   ├── profile-960.webp   About photo (optimised)
│   │   ├── banner.webp        circuit banner shown in Contact
│   │   └── projects/          (create this) optional project thumbnails
│   ├── resume/
│   │   └── Shubham_Yadav_Resume.pdf    <-- Download Resume button points here
│   ├── certificates/          (optional) put certificate PDFs/images here
│   ├── og-image.png           social share preview (1200x630)
│   ├── favicon.svg
│   └── robots.txt
├── design-assets/
│   ├── profile-original.jpg   full-resolution photo (not deployed)
│   └── pixel-avatar-original.png   your 8-bit avatar (kept for later use)
├── src/
│   ├── data/                  <-- EDIT CONTENT HERE
│   │   ├── profile.ts         name, email, phone, links, resume path, photo path
│   │   ├── projects.ts        projects + GitHub / demo URLs
│   │   ├── certifications.ts  certificates + credential URLs
│   │   ├── education.ts       college + semester SGPA
│   │   └── skills.ts          skill groups
│   ├── components/            Navbar, Hero, HoloGlobe, About, Skills, Projects,
│   │                          Education, Achievements, Contact, Footer, ...
│   ├── hooks/
│   ├── index.css              design tokens + global styles
│   └── main.tsx, App.tsx
├── tailwind.config.js, vite.config.ts, tsconfig.json, postcss.config.js
├── .env.example
└── README.md
```

## 4. Replace images, resume and links

### Resume
Replace `public/resume/Shubham_Yadav_Resume.pdf` with your latest PDF **keeping the same file name**.
(To use another name, change `resumeUrl` and `resumeFileName` in `src/data/profile.ts`.)

> Tip: the resume included in this project still shows an SGPA of 8.57 in the summary. Your latest semester is 9.45, so you may want to update the PDF before applying.

### Photo (Hero + About)
Replace `public/assets/profile-640.webp` (hero) and `public/assets/profile-960.webp` (About) with new files of the same names (portrait 4:5 ratio, e.g. 640x800 and 960x1200). Convert with any tool, for example squoosh.app.

### Banner (Contact)
Replace `public/assets/banner.webp` (about 1600x533).

### Theme colours
All colours are CSS variables at the top of `src/index.css` (`--accent` lime, `--accent2` violet, separate values for dark and light).

### Project links, demos and thumbnails
Open `src/data/projects.ts`:

```ts
{
  id: 'polarlogix',
  title: 'POLARLOGIX',
  github: 'https://github.com/shubham-yadav-07/POLARLOGIX', // GitHub button shows when not empty
  demo: '',                                                  // add live URL -> "Live Demo" button appears
  image: '/assets/projects/polarlogix.webp',                 // optional thumbnail in public/assets/projects/
}
```

Buttons only render when the URL is set, so there are no dead buttons.
**Please open each GitHub link once and confirm it matches your repository name.** In particular, the Nextlytics card points to `.../Nexlyticx` (the name seen on your GitHub list); change it in `projects.ts` if the real repo name differs.

### Certificate verification URLs
Open `src/data/certifications.ts` and fill the `url` of each certificate:

```ts
{ title: 'AWS Academy Graduate: Cloud Foundations', ..., url: 'https://www.credly.com/badges/xxxx' }
```

A "View credential" link appears automatically. Use public verification links (Credly, Forage, Udemy `ude.my/...`, etc.).
Avoid uploading raw certificate images that contain your date of birth, APAAR ID or similar personal data.

### Phone number
Your number is in `src/data/profile.ts` (`phoneDisplay`, `phoneTel`). Set both to `''` to hide it everywhere. A public phone number can attract spam calls, so remove it if you prefer email only.

### Semester SGPA
Edit `src/data/education.ts`.

## 5. Contact form

By default the form builds a `mailto:` link, so submitting opens the visitor's email app with the message pre-filled.
**Limitation:** it does not send mail by itself, and it does nothing if the visitor has no email app configured. The email address and "Copy email" button are always shown as a fallback.

To receive messages directly:
1. Create a free form at [formspree.io](https://formspree.io) and copy the endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
2. Local: copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT=...`.
3. Vercel: add the same variable under **Project → Settings → Environment Variables**, then redeploy.

The endpoint is a public URL, not a secret. Never put private API keys in `VITE_` variables.

## 6. Upload to GitHub

Suggested repository details:

- **Repository name:** `shubham-yadav-portfolio`
- **Description:** `Personal portfolio of Shubham Yadav: AI/ML, Data Analytics and Software Development. Built with React, Vite, TypeScript, Tailwind CSS and Framer Motion.`
- **Topics:** `portfolio`, `react`, `vite`, `typescript`, `tailwindcss`, `framer-motion`, `developer-portfolio`
- **Visibility:** Public

Steps:

1. On github.com click **New repository**, use the name above, leave "Add a README" **unchecked**, and click **Create repository**.
2. In the VS Code terminal inside the project folder:

   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio website"
   git branch -M main
   git remote add origin https://github.com/shubham-yadav-07/shubham-yadav-portfolio.git
   git push -u origin main
   ```

   If asked to log in, use your GitHub account (a browser window or a Personal Access Token is used instead of a password).
3. Optional: add a **Website** link and the topics in the repo's "About" box.

`node_modules/`, `dist/` and `.env` are already ignored by `.gitignore`.

## 7. Deploy (free)

### Option A: Vercel (recommended)
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New → Project →** import `shubham-yadav-portfolio`.
3. Vercel detects Vite automatically: Build Command `npm run build`, Output Directory `dist`.
4. (Optional) Add environment variables: `VITE_SITE_URL` (your final URL, e.g. `https://shubham-yadav.vercel.app`) and `VITE_FORM_ENDPOINT`.
5. Click **Deploy**. Every `git push` to `main` redeploys automatically.
6. Custom domain: **Project → Settings → Domains**.

### Option B: Netlify
**Add new site → Import from Git →** pick the repo. Build command `npm run build`, publish directory `dist`.

### Option C: GitHub Pages
Possible but needs extra setup (a `base` path in `vite.config.ts` and relative asset paths). Vercel or Netlify is simpler for this project.

After deploying, set `VITE_SITE_URL` to your live URL so that the social-share preview (`og-image.png`) works with absolute URLs, then redeploy.

## 8. Accessibility and performance notes

- Skip-to-content link, visible keyboard focus, semantic landmarks, ARIA states on menu and filters
- `prefers-reduced-motion`: the globe renders one static frame, tilt, cursor effects and entrance animations are disabled
- Cursor effects only run on mouse devices; the normal cursor always stays visible
- The canvas globe pauses when off-screen or when the tab is hidden
- Fonts are self-hosted (`@fontsource`), so no external font requests
- Avatar is served as optimised WebP in two sizes

## 9. Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm install` fails | Update Node.js to v18+ and run `npm cache clean --force` |
| Blank page after deploy | Make sure the Output Directory is `dist` |
| Resume button shows 404 | Check the file is exactly `public/resume/Shubham_Yadav_Resume.pdf` |
| Changes not showing | Stop the server (`Ctrl+C`) and run `npm run dev` again |

---

Built by Shubham Yadav.
