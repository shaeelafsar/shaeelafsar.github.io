---
name: playwright-generate-test
description: 'Generate Playwright E2E tests based on scenarios'
metadata:
  source: 'github/awesome-copilot'
  installed_at: '2026-05-02'
  confidence: low
---

# Test Generation with Playwright

Generate Playwright tests based on provided scenarios.

## Instructions

- Given a scenario, generate a Playwright test for it
- If no scenario provided, ask for one
- DO NOT generate test code prematurely — complete all analysis steps first
- Run steps one by one using Playwright tools
- After all steps complete, emit a Playwright TypeScript test using `@playwright/test`
- Save generated test files in the `tests/` directory
- Execute the test file and iterate until the test passes

## Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('should do expected behavior', async ({ page }) => {
    await page.goto('/');
    // Test implementation
    await expect(page).toHaveTitle(/Expected/);
  });
});
```

## Common Scenarios for Portfolio Sites

- Homepage loads and displays hero section
- Navigation links work and scroll to sections
- Projects page renders all project cards
- Blog posts render with proper formatting
- Contact form validates inputs
- Dark mode toggle works
- Responsive layout at mobile/tablet/desktop breakpoints
- Animations respect `prefers-reduced-motion`
