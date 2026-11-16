/**
 * Public contact defaults.
 * Studio (/admin) can override these. Blank or example values fall back here.
 * Do not put a street address in this file.
 */
export const siteDefaults = {
  name: "One10 Brands Marketing",
  shortName: "One10",
  /** Digits only, country code included, no plus sign. Used in wa.me links. */
  whatsappE164: "97471921751",
  email: "Messamrizvi10@gmail.com",
} as const;

/** Sentinel values. A saved setting that matches these is still treated as not connected. */
export const PLACEHOLDER_WHATSAPP = "000000000000";
export const PLACEHOLDER_EMAIL = "hello@example.com";
