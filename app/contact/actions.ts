"use server";

import {
  emptyContactFormValues,
  initialContactActionState,
  normalizeContactFormValues,
  validateContactForm,
  type ContactActionState,
} from "@/lib/contact";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function submitContactForm(
  previousState: ContactActionState = initialContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  void previousState;
  const values = normalizeContactFormValues({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (values.company.trim().length > 0) {
    await wait(600);

    return {
      status: "success",
      message: "Thanks for reaching out — I’ll review your message soon.",
      fieldErrors: {},
      values: emptyContactFormValues,
    };
  }

  const fieldErrors = validateContactForm(values);

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please review the highlighted fields and try again.",
      fieldErrors,
      values,
    };
  }

  await wait(900);

  if (values.subject.toLowerCase().includes("demo error")) {
    return {
      status: "error",
      message: "The message service is temporarily unavailable. Please try again in a moment.",
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks — your message was sent successfully. I’ll get back to you soon.",
    fieldErrors: {},
    values: emptyContactFormValues,
  };
}
