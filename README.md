# AssemblerCoding — company website

A single-page, statically-hosted site for **AssemblerCoding LLC**. Dark, technical,
AI-native studio aesthetic built around the brand logo (folded-ribbon "A" + gear,
sky-to-navy blue gradient).

## Files

```
index.html      # the page (semantic sections, all content here)
styles.css      # design system + layout + responsive
script.js       # terminal typing, scroll reveals, sticky-nav state
favicon.svg     # scalable brand mark (theme-friendly)
assets/logo.jpeg# the original logo (used in About + social/apple-touch icon)
CNAME           # custom domain for GitHub Pages  ⚠️ verify this matches your domain
```

No build step, no dependencies — fonts load from Google Fonts. Just open `index.html`.

## Things to change before launch

1. **Email** — every CTA points to `hello@assemblercoding.com`. If that mailbox
   doesn't exist yet, either set it up (e.g. Google Workspace / a GoDaddy forward)
   or find-and-replace it with the address you want (e.g. your personal email).
2. **Domain** — `CNAME` is set to `assemblercoding.com`. Change it if your domain
   differs.

## Deploy to GitHub Pages

1. Create a GitHub repo and push these files to the `main` branch:
   ```sh
   git init && git add . && git commit -m "AssemblerCoding site"
   git branch -M main
   git remote add origin git@github.com:<you>/<repo>.git
   git push -u origin main
   ```
2. Repo **Settings → Pages → Build and deployment** → Source: *Deploy from a branch*,
   Branch: `main` / `/ (root)`. Save.
3. The site goes live at `https://<you>.github.io/<repo>/` within a minute or two.

## Point your GoDaddy domain at it

In GoDaddy DNS for your domain, add:

| Type  | Name | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | `<you>.github.io`      |

Then in **Settings → Pages**, set the Custom domain to your domain and enable
**Enforce HTTPS**. (The `CNAME` file in this repo already declares the domain to
GitHub.) DNS can take up to an hour to propagate.
