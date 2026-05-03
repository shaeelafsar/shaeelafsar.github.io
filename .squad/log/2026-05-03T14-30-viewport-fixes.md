# Session: Viewport Fixes — 2026-05-03T14:30:40.831-05:00

## Overview
Squad session focused on responsive viewport issues identified during mobile testing. Rachael fixed frontend presentation, Roy expanded test coverage with diagnostic findings.

## Team Involved
- **Rachael (Frontend Dev):** Fixed floating skill pills and footer alignment
- **Roy (Tester):** Expanded responsive-debug Playwright suite
- **Scribe:** Maintained decisions and orchestration logs

## Changes

### Frontend Fixes (Rachael)
- **Commit:** eb6337f
- **Changes:**
  - Converted animated floating skill pills to static badge rows for hero/about surfaces
  - Gated footer multi-column alignment to `lg` breakpoint for cleaner tablet layout
  - Ensured responsive consistency across all breakpoints
  - **ADR-015 Decided:** Static badge rows over animated floating pills

### Test Coverage (Roy)
- **Commit:** d47a88e
- **Changes:**
  - Created responsive-debug Playwright suite (40/42 tests passed)
  - Implemented canonical spec in `tests/e2e/responsive-debug.spec.ts`
  - Added thin wrapper at `e2e/responsive-debug.spec.ts` for current runner
  - Added `PLAYWRIGHT_BASE_URL` support for dev server flexibility
  - **ADR-016 Decided:** Canonical responsive debug suite configuration
- **Findings:**
  1. Projects page text overflow at 375px (`Cloud` filter pill)
  2. Non-opening mobile menu on localhost
  - **Status:** Captured for follow-up frontend fixes

## Decisions Merged
- ADR-015: Static badge rows over animated floating pills
- ADR-016: Canonical responsive debug suite in `tests/e2e/` with `PLAYWRIGHT_BASE_URL` support

## Next Steps
- Address mobile filter pill overflow on Projects page
- Debug mobile menu trigger on localhost
- Continue expanding responsive coverage
