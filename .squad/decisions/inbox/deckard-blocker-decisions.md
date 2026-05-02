# Deckard — Blocker Decisions

Date: 2026-05-02T16:32:57-05:00
Requested by: Shaeel Afsar

## 1) Contact form submission contract

**Decision:** `ContactForm [client]` submits to a Next.js **Server Action** that validates input, applies spam checks, then sends the message through the **Resend email API**. No public client-side email key, no API route required for v1.

### Contract
- Client component: `ContactForm [client]`
- Server entrypoint: `sendContactMessage(formData)` in `app/contact/actions.ts`
- Provider: `resend.emails.send(...)`
- Response shape returned to the client:

```ts
{
  ok: boolean;
  status: 'success' | 'validation_error' | 'rate_limited' | 'provider_error';
  message: string;
  fieldErrors?: Partial<Record<'name' | 'email' | 'message', string>>;
}
```

### Validation schema
```ts
const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().trim().email('Enter a valid email address').max(160),
  subject: z.string().trim().max(120, 'Subject is too long').optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(500, 'Message must be 500 characters or fewer'),
  company: z.string().max(0).optional(),
});
```

### Spam protection
- **Honeypot field:** hidden `company` input; if filled, treat as spam and return a generic success response with no email send.
- **Rate limiting:** server-side limit keyed by `IP + normalized email hash`.
- **Initial threshold:** `5` submission attempts per `10 minutes`.
- **Rate-limit failure message:** calm inline error with retry guidance; preserve field values.

### State machine
`idle → typing → validating → submitting → success → error → retry`

- `idle`: pristine form, submit enabled
- `typing`: user has interacted with one or more fields
- `validating`: blur or submit triggered schema checks; inline errors visible
- `submitting`: button shows pending label/spinner; all fields disabled; no double-submit
- `success`: success status region receives focus, fields reset, submit enabled again
- `error`: retryable provider/network/rate-limit error shown in status region, fields preserved
- `retry`: any user edit after error returns to editable state while retaining values

### UX + accessibility rules
- Inline field errors appear on blur and on submit.
- Submit from keyboard works via Enter/Return when focus is inside the form.
- Status region uses `role="status"` for success and `role="alert"` for errors.
- On validation failure, focus moves to the error summary first, then the first invalid field.
- On success, focus moves to the success message and the form resets.

### Required environment variables
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `CONTACT_RATE_LIMIT_MAX`
- `CONTACT_RATE_LIMIT_WINDOW_MS`

`CONTACT_RATE_LIMIT_MAX` defaults to `5` and `CONTACT_RATE_LIMIT_WINDOW_MS` defaults to `600000` if omitted.

## 2) Blog CategoryRail

**Decision:** `CategoryRail` is renamed to **`TagList`**.

- v1 tags are **decorative metadata only**.
- Tags render as non-interactive pills on post cards and in the blog listing summary strip.
- No filtering, no client state, no URL params, no keyboard interaction contract beyond normal text reading.
- Future enhancement: optional `?tag=` filtering can be added later without changing v1 card metadata.

## 3) Projects filter states

**Decision:** `ProjectFilter [client]` is the only interactive filter surface on `/projects`, and it owns URL sync for `?tag=`.

### State contract
- `idle`: default render; `All` selected when no valid `?tag=` exists
- `hover`: pointer devices only; background/border preview state
- `focus-visible`: keyboard focus ring, no reliance on hover color
- `active/selected`: current tag pill highlighted with selected styles and `aria-pressed="true"`
- `loading/pending`: `useTransition` pending state during URL update/server refresh; active pill stays visible, grid dims slightly
- `zero-results`: empty grid copy with reset link back to `/projects`
- `keyboard-nav`: left/right arrow keys move focus across pills; Home/End jump to first/last pill; Enter/Space selects focused pill

### Sticky behavior
- **Desktop (`lg` / `1024px+`) only:** filter row is sticky below the header.
- **Mobile + tablet (`< 1024px`):** not sticky.

### URL behavior
- Selecting a tag updates to `/projects?tag={slugified-tag}`.
- Clearing the filter returns to canonical `/projects`.
- Invalid `?tag=` values render **all projects** with `All` selected.
- Filter changes do not force a scroll jump; focus stays on the selected pill.
