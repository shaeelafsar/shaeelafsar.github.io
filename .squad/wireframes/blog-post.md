# Blog Post (`/blog/[slug]`) Wireframe

## Page stack

`ReadingProgress` → `PostHeader` → `Article + TableOfContents` → `RelatedPosts`

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ ReadingProgress (fixed top, 3px)    │
├─────────────────────────────────────┤
│ Header                              │
├─────────────────────────────────────┤
│ PostHeader                          │
│ [fade-in] title                     │
│ [fade-in] date / reading time /tags │
│ [fade-in] cover image (optional)    │
├─────────────────────────────────────┤
│ Article / narrow body               │
│ h2 / h3 (anchor-ready)              │
│ paragraphs / code / callouts        │
│ images / blockquotes / tables       │
│ TOC hidden on mobile                │
├─────────────────────────────────────┤
│ RelatedPosts                        │
│ [stagger] PostCard 01               │
│ [stagger] PostCard 02               │
└─────────────────────────────────────┘
```

## Tablet — 768px

```text
┌──────────────────────────────────────────────────────────────┐
│ ReadingProgress fixed                                         │
├──────────────────────────────────────────────────────────────┤
│ PostHeader                                                   │
│ [fade-in] title + meta + cover                               │
├──────────────────────────────────────────────────────────────┤
│ Article in narrow container                                  │
│ headings with anchor offsets                                 │
│ TOC still hidden/collapsed                                   │
├──────────────────────────────────────────────────────────────┤
│ RelatedPosts                                                 │
└──────────────────────────────────────────────────────────────┘
```

## Desktop — 1280px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ReadingProgress (fixed above header)                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ Header                                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ PostHeader                                                                   │
│ [fade-in] title / excerpt / meta / cover                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Blog post layout                                                             │
│ ┌─────────────────────────────────────────────┬─────────────────────────────┐ │
│ │ Article / Container size="narrow"          │ aside sticky top-24         │ │
│ │ [fade-in] body wrapper                      │ TableOfContents             │ │
│ │ MDX sections, code, images, callouts        │ active item transition CSS  │ │
│ │                                             │ no entrance animation       │ │
│ └─────────────────────────────────────────────┴─────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────┤
│ RelatedPosts / Section                                                       │
│ [stagger] PostCard | PostCard                                                │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Navigation flow

- Post header/back links can route to `/blog`
- TOC buttons update URL hash and scroll inside article
- Related posts route to sibling `/blog/[slug]` pages
