"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import {
  contactFallbackEmail,
  formspreeEndpoint,
  initialContactActionState,
  isPlaceholderFormspreeEndpoint,
  normalizeContactFormValues,
  validateContactForm,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-[var(--radius-md)] border border-border bg-card/70 px-4 py-3 text-base text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[border-color,box-shadow,background-color] duration-[var(--duration-ui)] ease-[var(--ease-snappy)] placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:bg-background-secondary/60";

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) {
    return null;
  }

  return (
    <p id={id} className="text-sm text-error">
      {error}
    </p>
  );
}

function buildMailtoUrl(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const subject = values.subject.trim() || `Website inquiry from ${values.name}`;
  const body = [`Name: ${values.name}`, `Email: ${values.email}`, "", values.message].join("\n");

  return `mailto:${contactFallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [state, setState] = useState(initialContactActionState);
  const [pending, setPending] = useState(false);
  const formKey = useMemo(() => JSON.stringify([state.status, state.message, state.values]), [state]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const values = normalizeContactFormValues({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      company: formData.get("company"),
    });

    if (values.company.trim().length > 0) {
      setState({
        status: "success",
        message: "Thanks for reaching out — I’ll review your message soon.",
        fieldErrors: {},
        values: initialContactActionState.values,
      });
      setPending(false);
      return;
    }

    const fieldErrors = validateContactForm(values);

    if (Object.keys(fieldErrors).length > 0) {
      setState({
        status: "error",
        message: "Please review the highlighted fields and try again.",
        fieldErrors,
        values,
      });
      setPending(false);
      return;
    }

    if (isPlaceholderFormspreeEndpoint) {
      window.location.href = buildMailtoUrl(values);
      setState({
        status: "success",
        message:
          "Formspree still needs your form ID, so I opened your email app instead. Replace the placeholder endpoint when you’re ready.",
        fieldErrors: {},
        values: initialContactActionState.values,
      });
      setPending(false);
      return;
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to send message");
      }

      setState({
        status: "success",
        message: "Thanks — your message was sent successfully. I’ll get back to you soon.",
        fieldErrors: {},
        values: initialContactActionState.values,
      });
    } catch {
      setState({
        status: "error",
        message: `The contact service is temporarily unavailable. You can also email ${contactFallbackEmail} directly.`,
        fieldErrors: {},
        values,
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <Card as="section" className="bg-card/90" data-testid="contact-form-panel">
      <CardContent className="gap-8">
        <div className="space-y-4">
          <p className="font-mono text-[length:var(--text-meta)] uppercase tracking-[0.18em] text-muted-foreground">
            Contact form
          </p>
          <Heading as="h2" size="h3">
            Tell me a little about the project.
          </Heading>
          <p className="text-[length:var(--text-body)] leading-7 text-muted-foreground">
            Share the problem space, timeline, and what kind of support you need. The form submits through Formspree, with an email fallback until the final endpoint is configured.
          </p>
        </div>

        <div
          role={state.status === "error" ? "alert" : "status"}
          className={cn(
            "rounded-[var(--radius-md)] border px-4 py-3 text-sm",
            state.status === "success"
              ? "border-success/40 bg-success/10 text-success"
              : state.status === "error"
                ? "border-error/40 bg-error/10 text-error"
                : "border-border bg-background-secondary/50 text-muted-foreground",
          )}
          data-testid="contact-status"
        >
          {state.message || `Prefer email? Reach me directly at ${contactFallbackEmail}.`}
        </div>

        <form key={formKey} className="space-y-5" data-testid="contact-form" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                defaultValue={state.values.name}
                disabled={pending}
                aria-invalid={Boolean(state.fieldErrors.name?.[0])}
                aria-describedby={state.fieldErrors.name?.[0] ? "contact-name-error" : undefined}
                className={cn(
                  inputClasses,
                  state.fieldErrors.name?.[0]
                    ? "border-error bg-error/5"
                    : "border-border focus-visible:border-accent",
                )}
                data-testid="contact-name"
              />
              <FieldError id="contact-name-error" error={state.fieldErrors.name?.[0]} />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                defaultValue={state.values.email}
                disabled={pending}
                aria-invalid={Boolean(state.fieldErrors.email?.[0])}
                aria-describedby={state.fieldErrors.email?.[0] ? "contact-email-error" : undefined}
                className={cn(
                  inputClasses,
                  state.fieldErrors.email?.[0]
                    ? "border-error bg-error/5"
                    : "border-border focus-visible:border-accent",
                )}
                data-testid="contact-email"
              />
              <FieldError id="contact-email-error" error={state.fieldErrors.email?.[0]} />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-subject" className="text-sm font-medium text-foreground">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              defaultValue={state.values.subject}
              disabled={pending}
              aria-invalid={Boolean(state.fieldErrors.subject?.[0])}
              aria-describedby={state.fieldErrors.subject?.[0] ? "contact-subject-error" : "contact-subject-hint"}
              className={cn(
                inputClasses,
                state.fieldErrors.subject?.[0]
                  ? "border-error bg-error/5"
                  : "border-border focus-visible:border-accent",
              )}
              data-testid="contact-subject"
            />
            <p id="contact-subject-hint" className="text-sm text-muted-foreground">
              Optional, but helpful.
            </p>
            <FieldError id="contact-subject-error" error={state.fieldErrors.subject?.[0]} />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={7}
              defaultValue={state.values.message}
              disabled={pending}
              aria-invalid={Boolean(state.fieldErrors.message?.[0])}
              aria-describedby={state.fieldErrors.message?.[0] ? "contact-message-error" : "contact-message-hint"}
              className={cn(
                inputClasses,
                "min-h-40 resize-y",
                state.fieldErrors.message?.[0]
                  ? "border-error bg-error/5"
                  : "border-border focus-visible:border-accent",
              )}
              data-testid="contact-message"
            />
            <p id="contact-message-hint" className="text-sm text-muted-foreground">
              A few sentences about the problem, scope, or timeline is perfect.
            </p>
            <FieldError id="contact-message-error" error={state.fieldErrors.message?.[0]} />
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              name="company"
              defaultValue={state.values.company}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button as="button" type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
              {pending ? "Sending..." : "Send Message"}
            </Button>
            <p className="text-sm text-muted-foreground">Typical response time: 2–3 business days.</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
