/**
 * Public contact defaults.
 * Replace the placeholder WhatsApp number and email here, or save real values in Studio (/admin).
 * Do not put a guessed phone number or street address in this file.
 */
export const siteDefaults = {
  name: "One10 Brands Marketing",
  shortName: "One10",
  /** Digits only, country code included, no plus sign. All zeros means "not connected". */
  whatsappE164: "000000000000",
  /** Visible email until the owner supplies a real inbox. */
  email: "hello@example.com",
} as const;

export const PLACEHOLDER_WHATSAPP = "000000000000";
export const PLACEHOLDER_EMAIL = "hello@example.com";
