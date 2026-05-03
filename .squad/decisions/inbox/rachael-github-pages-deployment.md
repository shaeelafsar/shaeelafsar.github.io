# Rachael — GitHub Pages Deployment

- **Date:** 2026-05-03T09:11:36-05:00
- **Owner:** Rachael
- **Status:** Proposed

## Decision

Switch the personal website deployment target from Vercel to GitHub Pages using Next.js static export.

## Why

- GitHub Pages provides free hosting for the site.
- The current app can be exported as static HTML with build-time content generation.
- Removing server-only features keeps deployment simple and predictable.

## Implementation Notes

- Enabled `output: "export"` and unoptimized images in `next.config.ts`.
- Replaced route handlers and metadata routes for feed, sitemap, and robots with build-generated static files in `public/`.
- Replaced the contact Server Action with a client-side Formspree flow plus `mailto:` fallback.
- Replaced dynamic OG image routes with static image URLs from `public/`.
- Added a GitHub Actions workflow that deploys the exported `out/` directory to GitHub Pages.

## Follow-up

- Replace the placeholder Formspree endpoint with a real form ID.
- If the site deploys under a repository subpath, add the matching `basePath` configuration before going live.
