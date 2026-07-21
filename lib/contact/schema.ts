import { z } from "zod";

/** Shared contact validation used by both the client form and the API route. */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "required").max(100, "tooLong"),
  email: z.string().trim().email("invalidEmail").max(200, "tooLong"),
  company: z.string().trim().max(200, "tooLong").optional().or(z.literal("")),
  phone: z.string().trim().max(50, "tooLong").optional().or(z.literal("")),
  message: z.string().trim().min(10, "tooShort").max(5000, "tooLong"),
  // Spam controls (not user-facing):
  company_website: z.string().optional(), // honeypot — handled silently in the route
  startedAt: z.number().optional(), // time-trap
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Field-level validation for the visible fields. Returns a map of
 * field -> error code (localized by the caller). */
export function validateContactFields(
  data: Pick<ContactInput, "name" | "email" | "company" | "phone" | "message">,
): Partial<Record<keyof typeof data, string>> {
  const result = contactSchema
    .pick({ name: true, email: true, company: true, phone: true, message: true })
    .safeParse(data);
  if (result.success) return {};
  const errors: Partial<Record<keyof typeof data, string>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof typeof data;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
