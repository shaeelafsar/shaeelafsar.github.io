# Spec: Vercel Deployment

> **Scope:** Vercel project configuration, CI/CD, analytics · **Owner:** Rachael

---

## Purpose

Deploy the site to Vercel with optimal configuration for a statically-generated Next.js site. Includes custom domain, analytics, Speed Insights, and environment variables.

## Component Type

N/A — infrastructure and deployment configuration.

## Implementation Details

### Vercel Project Setup

1. **Framework preset:** Next.js (auto-detected)
2. **Build command:** `pnpm build` (default)
3. **Output directory:** `.next` (default)
4. **Node.js version:** 20.x (LTS)
5. **Package manager:** pnpm (auto-detected from `pnpm-lock.yaml`)

### Environment Variables

Configure in Vercel dashboard (Settings → Environment Variables):

| Variable | Scope | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Production | `https://shaeelafsar.com` |
| `NEXT_PUBLIC_SITE_URL` | Preview | `https://preview.shaeelafsar.com` or Vercel preview URL |
| `CONTACT_FORM_ENDPOINT` | All | Resend/Formspree API endpoint |

### Custom Domain

1. Add `shaeelafsar.com` in Vercel domain settings
2. Add `www.shaeelafsar.com` with redirect to apex domain
3. Vercel handles SSL automatically
4. DNS: point A record to Vercel, CNAME for www

### `vercel.json` (Optional Overrides)

```json
{
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "redirects": [
    { "source": "/resume.pdf", "destination": "/resume", "permanent": false }
  ]
}
```

### Analytics & Speed Insights

Install Vercel analytics:

```bash
pnpm add @vercel/analytics @vercel/speed-insights
```

Add to root layout:

```tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Inside <body>
<Analytics />
<SpeedInsights />
```

### Security Headers

Via `vercel.json` (see above):
- `X-Content-Type-Options: nosniff` — prevents MIME sniffing
- `X-Frame-Options: DENY` — prevents clickjacking
- `X-XSS-Protection: 1; mode=block` — legacy XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin` — controls referrer

### Build Optimization

- All pages are statically generated — no serverless functions needed (except OG images at edge)
- Images optimized by Vercel's Image Optimization API
- Fonts cached immutably (1-year cache)
- Asset fingerprinting handled by Next.js automatically

### Preview Deployments

Every PR gets a preview deployment on Vercel. Useful for:
- Visual review of changes
- Testing on real infrastructure
- Sharing with stakeholders

---

## Responsive Behavior

N/A — deployment config.

## Accessibility

N/A — deployment config.

## Animation Requirements

N/A.

## Dependencies

- All phases complete (this is the final deployment step)
- Custom domain DNS configured
- Contact form endpoint provisioned
- `@vercel/analytics` and `@vercel/speed-insights` installed

## Acceptance Criteria

1. Site deploys successfully to Vercel from `main` branch
2. Custom domain (`shaeelafsar.com`) resolves with valid SSL
3. `www.shaeelafsar.com` redirects to `shaeelafsar.com`
4. All pages load correctly on production URL
5. Environment variables are set and accessible
6. Vercel Analytics tracking is active
7. Speed Insights are collecting data
8. Security headers are present (verify with securityheaders.com)
9. Font assets have 1-year immutable cache headers
10. Preview deployments work for PRs
11. Build time is under 2 minutes
12. Lighthouse scores: 95+ on Performance, Accessibility, Best Practices, SEO
