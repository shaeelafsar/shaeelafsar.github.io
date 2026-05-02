# Spec: Contact Page

> **Components:** `components/contact/*.tsx`, `app/contact/` · **Owner:** Rachael

---

## Page (`app/contact/page.tsx`) — Server Component

Two-section layout: contact form on one side, social links + info on the other.

**Metadata:**
```ts
export const metadata: Metadata = {
  title: 'Contact — Shaeel Afsar',
  description: 'Get in touch.',
};
```

## Components

### `ContactForm` (`contact-form.tsx`) — Client Component

```ts
// No external props — self-contained form
```

**Fields:**
- Name (required)
- Email (required, validated)
- Subject (optional)
- Message (required, textarea)

**Validation:** Zod schema, client-side validation on blur + submit.

```ts
const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
```

**Submission:** Server Action that forwards to an email service (Resend, Formspree, or similar). Environment variable for endpoint. Show success/error toast after submission.

**States:**
- Idle: form visible
- Submitting: button shows loading spinner, fields disabled
- Success: show success message, reset form
- Error: show error message, form remains filled

**Animation:** Form fields stagger in with `StaggerChildren` on page load.

---

## Social Links Section — Server Component

List of social/contact links:
- GitHub
- LinkedIn
- Twitter/X
- Email (mailto:)

Each link: icon + label. Icons from a lightweight icon set (Lucide or inline SVGs — no heavy icon library).

---

## Responsive

| Breakpoint | Layout |
|-----------|--------|
| Mobile | Stacked: social links on top, form below |
| Desktop (`lg+`) | Two columns: form left, social/info right |

## Accessibility

- All form fields have associated `<label>` elements
- Error messages linked via `aria-describedby`
- Submit button disabled during submission
- Focus moves to success/error message after submission
- Form has `aria-label="Contact form"`
- Required fields marked with `aria-required="true"`
- Social links have meaningful `aria-label` (e.g., "Visit GitHub profile")

## Dependencies

- UI components (1.3) — `Section`, `Container`, `Heading`, `Button`
- Animation primitives (1.7) — `StaggerChildren` for form field entrance
- `zod`, `react-hook-form`, `@hookform/resolvers` packages (1.1)
- Server Action or external API endpoint for form submission

## Acceptance Criteria

1. Page renders at `/contact` with correct metadata
2. Form has 4 fields: name, email, subject (optional), message
3. Client-side validation shows inline errors on blur
4. Invalid email format shows error message
5. Successful submission shows success toast/message and resets form
6. Failed submission shows error message and preserves form data
7. Submit button shows loading state during submission
8. All form fields disabled during submission (prevent double-submit)
9. Social links section renders with icons and correct URLs
10. Layout switches from stacked (mobile) to two-column (desktop)
11. Form is keyboard-navigable (Tab through fields, Enter to submit)
12. Screen reader correctly announces errors via `aria-describedby`
13. Dark mode: input borders, focus rings, and placeholder text all visible
