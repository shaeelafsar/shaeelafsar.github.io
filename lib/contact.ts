import { z } from "zod";

export const contactFallbackEmail = "hello@shaeelafsar.com";
export const formspreeEndpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/replace-with-your-form-id";
export const isPlaceholderFormspreeEndpoint = formspreeEndpoint.endsWith("replace-with-your-form-id");

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .max(100, "Subject is too long.")
    .refine((value) => value.length === 0 || value.length >= 3, {
      message: "Subject should be at least 3 characters or left blank.",
    }),
  message: z
    .string()
    .trim()
    .min(10, "Please share a bit more detail.")
    .max(2000, "Message is too long."),
  company: z.string().trim().max(0).or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string[]>>;
export type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: ContactFieldErrors;
  values: ContactFormValues;
};

export const emptyContactFormValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

export const initialContactActionState: ContactActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: emptyContactFormValues,
};

function getStringValue(value: FormDataEntryValue | string | null | undefined) {
  return typeof value === "string" ? value : "";
}

export function normalizeContactFormValues(
  input: Partial<Record<keyof ContactFormValues, FormDataEntryValue | string | null | undefined>>,
): ContactFormValues {
  return {
    name: getStringValue(input.name),
    email: getStringValue(input.email),
    subject: getStringValue(input.subject),
    message: getStringValue(input.message),
    company: getStringValue(input.company),
  };
}

export function validateContactForm(values: ContactFormValues): ContactFieldErrors {
  const result = contactFormSchema.safeParse(values);

  return result.success ? {} : result.error.flatten().fieldErrors;
}
