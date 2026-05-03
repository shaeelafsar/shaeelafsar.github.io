# Squad Decisions

## Active Decisions

### Root GitHub Pages domain
- **Date:** 2026-05-03T14:10:43.947-05:00
- **Decision:** Treat `shaeelafsar.github.io` repository as root-domain GitHub Pages deployment.
- **Frontend impact:** Remove `basePath`, keep internal links root-relative, set metadata/canonical/sitemap/robots URLs to `https://shaeelafsar.github.io`.
- **Testing impact:** Live-site Playwright coverage targets root origin instead of `/personal-website` sub-path.
- **Status:** Implemented by Rachael (commit df76d03).

## Archived Decisions

See `.squad/decisions/` for archived decisions.
