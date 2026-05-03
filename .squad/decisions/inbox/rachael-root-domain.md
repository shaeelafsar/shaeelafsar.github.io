# Rachael — Root GitHub Pages domain

- **Date:** 2026-05-03T14:10:43.947-05:00
- **Decision needed:** Treat the renamed `shaeelafsar.github.io` repository as a root-domain GitHub Pages deployment.
- **Frontend impact:** Remove `basePath`, keep internal links root-relative, and set metadata/canonical/sitemap/robots URLs to `https://shaeelafsar.github.io`.
- **Testing impact:** Live-site Playwright coverage should target the root origin instead of a `/personal-website` sub-path.
