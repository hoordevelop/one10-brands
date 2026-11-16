import { isServiceSlug } from "@/content/catalog";
import { z } from "zod";

const clean = (value: string) =>
  !/[<>]/.test(value) && !/[\u0000-\u001F]/.test(value);

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "Name is too long.")
    .refine(clean, "Name contains characters we cannot accept."),
  businessName: z
    .string()
    .trim()
    .min(2, "Enter the business name.")
    .max(120, "Business name is too long.")
    .refine(clean, "Business name contains characters we cannot accept."),
  email: z
    .string()
    .trim()
    .max(160, "Email is too long.")
    .pipe(z.email("Enter a valid email address.")),
  whatsapp: z
    .string()
    .trim()
    .max(24, "WhatsApp number is too long.")
    .transform((value) => value.replace(/[^\d]/g, ""))
    .pipe(
      z
        .string()
        .regex(/^\d{8,15}$/, "Enter a WhatsApp number with country code."),
    ),
  service: z.string().refine(isServiceSlug, "Choose a service."),
  budget: z
    .string()
    .trim()
    .max(80, "Budget note is too long.")
    .refine(clean, "Budget note contains characters we cannot accept.")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .trim()
    .min(20, "Describe the project in at least a sentence.")
    .max(4000, "Description is too long.")
    .refine(clean, "Description contains characters we cannot accept."),
  website: z.string().max(200).optional().or(z.literal("")),
  challengeId: z.uuid("The form expired. Refresh and try again."),
});

export type ContactInput = z.infer<typeof contactSchema>;
