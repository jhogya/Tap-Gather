# Tap & Gather site

A static, responsive one-page site (plain HTML, CSS and a little vanilla JS). No build step, no dependencies.

## Preview locally

```bash
npx serve .
# or: python3 -m http.server 8000
```

Open the URL it prints. (Opening `index.html` directly also works, but the contact form only submits on a real server.)

## Deploy: GitHub + Netlify

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
gh repo create tap-and-gather-site --private --source=. --push   # or create the repo on github.com and push
```

In Netlify: **Add new site → Import an existing project → GitHub → tap-and-gather-site**.

- Build command: leave blank
- Publish directory: `.` (already set in `netlify.toml`)

Every push to `main` redeploys. Attach your domain under **Domain management**.

### Contact form

The form uses Netlify Forms (`data-netlify="true"`), so it works after the first deploy with no backend.
Submissions appear under **Forms** in the Netlify dashboard. Turn on email alerts under **Forms → Form notifications**.

## Things to replace before going live

| What | Where |
| --- | --- |
| Email and phone (`info@mysite.com`, `123 456 7890`) | `index.html`, `.contact__info` |
| Testimonial (bracketed placeholder; hide the section until you have a real quote) | `index.html`, `.testimonials__slides` |
| Illustrations (original placeholder art) | `illustration-story.svg`, `illustration-contact.svg` |

## Structure

Everything lives at the top level of the repo (no subfolders):

```
index.html        page markup
styles.css        all styles; colors, fonts and spacing tokens at the top (:root)
script.js         testimonial carousel, form submit, footer year
thanks.html       fallback thank-you page if JavaScript is off
netlify.toml      publish dir + basic security headers
favicon.ico, favicon.svg, apple-touch-icon.png   browser and home-screen icons
logo-wordmark.svg                                 header logo
illustration-story.svg, illustration-contact.svg  placeholder illustrations
*.woff2           self-hosted fonts (Libre Caslon Text, Alegreya)
```

## Fonts

Self-hosted, so there are no third-party requests:
Libre Caslon Text (headline, logo) and Alegreya (section headings), both under the SIL Open Font License.
Body text uses Helvetica Neue / Helvetica / Arial.
