# Shaeel Afsar — Personal Website

Static Next.js portfolio, blog, and resume site built with the App Router, TypeScript, Tailwind CSS, and file-based content.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` to work locally.

## Build for GitHub Pages

The site now ships as a static export for GitHub Pages.

```bash
pnpm build
```

That command:

- generates `public/rss.xml`, `public/feed.xml`, `public/sitemap.xml`, and `public/robots.txt`
- runs the Next.js static export build
- writes the deployable site to `out/`

## GitHub Pages Setup

1. Push to `master`.
2. In GitHub, open **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. Let `.github/workflows/deploy.yml` build and publish the `out/` directory.

## Deployment Configuration

Update these placeholders before going live:

- `NEXT_PUBLIC_SITE_URL` in `lib/metadata.ts` if you move to a custom domain
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in `lib/contact.ts` with your real Formspree form ID

If you deploy to `username.github.io/repo-name` instead of a root domain, also add the matching `basePath` and asset prefix in `next.config.ts`.

## Verification

```bash
pnpm build
pnpm test:unit
```
