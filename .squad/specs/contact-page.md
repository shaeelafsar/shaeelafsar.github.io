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
