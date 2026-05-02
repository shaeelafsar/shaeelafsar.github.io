# Project Detail (`/projects/[slug]`) Wireframe

## Page stack

`ProjectDetailHeader` → `HeroImage` → `MDX case study blocks` → `Related/Next CTA`

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ ProjectDetail header                │
│ [fade-in] title                     │
│ [fade-in] date / Badge tags         │
│ [fade-in] liveUrl / githubUrl       │
├─────────────────────────────────────┤
│ [parallax disabled mobile]          │
│ HeroImage                           │
├─────────────────────────────────────┤
│ Article / MDX body                  │
│ [fade-in] problem block             │
│ [fade-in] process block             │
│ [fade-in] outcome block             │
│ media / quotes / callouts           │
├─────────────────────────────────────┤
│ Next CTA                            │
│ [fade-in] Button Back to Projects   │
└─────────────────────────────────────┘
```

## Tablet — 768px

```text
┌──────────────────────────────────────────────────────────────┐
│ ProjectDetail header                                         │
│ [fade-in] title + meta                                       │
│ [fade-in] action links                                       │
├──────────────────────────────────────────────────────────────┤
│ [parallax] HeroImage full-width                              │
├──────────────────────────────────────────────────────────────┤
│ MDX body in narrow container                                 │
│ [fade-in] sequential content sections                        │
│ inline media breaks rhythm every 2-3 text blocks             │
└──────────────────────────────────────────────────────────────┘
```

## Desktop — 1280px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ProjectDetail header                                                         │
│ ┌────────────────────────────────────┬─────────────────────────────────────┐ │
│ │ [fade-in] title / excerpt          │ [fade-in] date, tags, action links │ │
│ │ intro context                      │ liveUrl / githubUrl                 │ │
│ └────────────────────────────────────┴─────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────┤
│ [parallax] HeroImage                                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│ Article / project-detail.tsx layout                                           │
│ [fade-in] MDX block                                                            │
│ [fade-in] image gallery or metrics rail                                        │
│ [fade-in] quote / callout                                                      │
│ [fade-in] closing result / next step                                           │
├──────────────────────────────────────────────────────────────────────────────┤
│ Related navigation                                                             │
│ [fade-in] Back to Projects / Contact CTA                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Navigation flow

- Header nav persists
- `liveUrl` opens external destination
- `githubUrl` opens source repository
- Back/adjacent CTA returns to `/projects` or encourages `/contact`
