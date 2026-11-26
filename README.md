# Anupam Rawat · Full-Stack Developer Portfolio

A static, single-page portfolio (HTML + CSS + vanilla JS). There's no build step and no `npm install`, so it runs directly on GitHub Pages.

## Folder structure

```
Portfolio/
├── index.html              ← page layout and sections
├── .nojekyll               ← tells GitHub Pages to serve files as they are
├── assets/
│   ├── css/style.css       ← all styling (colors at the top under :root)
│   ├── js/main.js          ← content data, animations, contact form
│   ├── img/                ← portrait, project screenshot, favicon
│   └── Anupam_Rawat_Resume.pdf   ← résumé download button
```

## Preview locally

Double-click `index.html`, or run a small server from this folder:

```powershell
npx serve .
```

## Publish on GitHub Pages

This repo deploys with GitHub Actions (`.github/workflows/pages.yml`). Every push to `main` copies `index.html`, `assets/` and `.nojekyll` into a `_site` folder and publishes it. There's no build step.

1. Commit and push to `main`:
   ```powershell
   git add -A
   git commit -m "Update portfolio"
   git push
   ```
2. Check that **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**.
3. Watch the run under the repo's **Actions** tab. When it finishes, the site is live at `https://npm-rawat.github.io/My-Portfolio/`.

## Contact form delivery

**Configured:** submissions go to Formspree form `xppdnkpa` (free plan, 50 submissions a month) and are emailed to the address on that Formspree account. To change it, edit `FORM_ENDPOINT` in `assets/js/main.js`. Set it back to `""` to fall back to opening the visitor's email app.

### Setting it up from scratch

GitHub Pages can't run a server, so the form needs a free form service.

1. Sign up at [formspree.io](https://formspree.io) with `npmrawat.048@gmail.com` and create a new form.
2. Copy the endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. In `assets/js/main.js`, set:
   ```js
   const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
   ```
4. Push the change. Submissions now arrive in your email.

Until you do this, the form still works: it opens the visitor's email app with the message filled in and addressed to you.

## Update content

All text that changes often lives at the top of `assets/js/main.js`:

| What | Where |
|---|---|
| Rotating hero phrases | `ROLES` |
| Skills under each tab | `SKILLS` |
| Project cards and case studies | `PROJECTS` (set `wide: true` for a full-width card) |
| Experience timeline | `TIMELINE` |

Hero text, stats, services and contact details are in `index.html`.

### Before you publish, check

- The stats strip (4+ years, 5 projects, 2 AI assistant frontends, 3 frameworks) matches your résumé.
- `assets/Anupam_Rawat_Resume.pdf` is the version you want public. The site shows only +91 91055 67872, but the current PDF still lists both numbers. Swap in a PDF with one number before publishing.
- Add your GitHub profile link to the hero and contact list once it's ready.
- If you get real impact numbers (users, screens migrated, devices), add them to the project `summary` lines.
