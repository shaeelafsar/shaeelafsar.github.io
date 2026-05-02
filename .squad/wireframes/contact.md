# Contact (`/contact`) Wireframe

## Global Frame

- Persistent shell on every breakpoint: `Header` → page `<main>` → `Footer`
- `Header` contains `Nav`, `ThemeToggle [client]`, and `MobileMenu [client]`
- Breakpoint contract:
  - `< 768`: `SocialLinksPanel` stacked above `ContactForm [client]`
  - `768-1023`: same stacked order, wider gutters, still not side-by-side
  - `1024-1279`: 2-col layout, `ContactForm [client]` left / social panel right
  - `1280+`: 2-col layout with wider column gap
- Shared test IDs: `site-header`, `site-nav`, `theme-toggle`, `mobile-menu-trigger`, `site-footer`

## Page stack

`ContactHero` → `ContactLayout` (`ContactForm [client]` + `SocialLinksPanel`)

## Client / server ownership

- Client islands: `ThemeToggle [client]`, `MobileMenu [client]`, `ContactForm [client]`
- Server sections: `ContactHero`, `SocialLinksPanel`

## Data flow

- `ContactForm [client]`: local form state + Server Action submission to Resend
- `SocialLinksPanel`: static config for profile URLs, availability note, response-time copy

## Form contract

### Fields
- `name` — required
- `email` — required, valid email format
- `subject` — optional
- `message` — required, 10-500 chars
- `company` — hidden honeypot field

### Submission
- Next.js Server Action validates payload, checks honeypot + rate limit, then sends via Resend
- Success resets visible fields and keeps the user on `/contact`
- Error preserves field values and exposes retry guidance

### State machine
`idle → typing → validating → submitting → success → error → retry`

- `idle`: pristine form
- `typing`: user has interacted with at least one field
- `validating`: blur or submit shows inline field errors
- `submitting`: all inputs + button disabled, pending label/spinner visible
- `success`: success region focused, form reset
- `error`: retryable error region focused, values preserved
- `retry`: next user edit clears blocking error state and re-enables submit

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ ContactHero                         │
│ [fade-in] H1 Contact                │
│ [fade-in] intro copy                │
├─────────────────────────────────────┤
│ SocialLinksPanel                    │
│ GitHub / LinkedIn / Twitter/X / Email│
├─────────────────────────────────────┤
│ ContactForm [client]                │
│ [stagger] Name input                │
│ [stagger] Email input               │
│ [stagger] Subject input             │
│ [stagger] Message textarea          │
│ [stagger] hidden honeypot           │
│ [stagger] Submit button             │
│ status region                       │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

## Tablet — 768-1023px

```text
┌──────────────────────────────────────────────────────────────┐
│ ContactHero                                                  │
├──────────────────────────────────────────────────────────────┤
│ SocialLinksPanel (locked above form)                         │
├──────────────────────────────────────────────────────────────┤
│ ContactForm [client] with generous vertical spacing          │
└──────────────────────────────────────────────────────────────┘
```

## Compact desktop — 1024-1279px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ContactHero                                                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ ContactLayout                                                                │
│ ContactForm [client] left | SocialLinksPanel right                           │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Wide desktop — 1280px+

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ContactHero                                                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ ContactLayout                                                                │
│ ContactForm [client] left | SocialLinksPanel right                           │
├──────────────────────────────────────────────────────────────────────────────┤
│ Footer                                                                       │
└──────────────────────────────────────────────────────────────────────────────┘
```

## States

- Inline validation: errors appear on blur and on submit attempt
- Submitting: button reads `Sending…`, spinner optional, fields disabled, no double-submit
- Success: `role="status"` region announces success, focus moves there, fields reset
- Error: `role="alert"` region announces validation/rate-limit/provider failure, focus moves there, fields preserved
- Retry: editing any field after an error returns the form to editable state
- Global loading: root loading shell preserves hero/panel/form layout
- Global error: page-level error boundary keeps shell visible and shows alternative contact guidance

## Accessibility + interaction notes

- Every input has a visible label and `aria-describedby` for hint/error text
- Error summary appears above the form when multiple fields fail
- On submit with invalid fields, focus lands on the summary first and then the first invalid field
- Enter/Return submits when focus is in a field; textarea supports standard multiline behavior
- Social profile links open in a new tab with external-link announcement; email uses `mailto:` and stays same-tab

## Suggested test IDs

- `contact-hero`
- `contact-form`
- `contact-name`
- `contact-email`
- `contact-subject`
- `contact-message`
- `contact-submit`
- `contact-status`
- `social-links-panel`
