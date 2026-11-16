export const catalog = [
  { slug: "digital-marketing", name: "Digital Marketing" },
  { slug: "meta-ads", name: "Meta Ads" },
  { slug: "google-ads", name: "Google Ads" },
  { slug: "whatsapp-marketing", name: "WhatsApp Marketing" },
  { slug: "email-marketing", name: "Email Marketing" },
  { slug: "website-development", name: "Website Development" },
  { slug: "seo", name: "SEO" },
  { slug: "crm-development", name: "CRM Development" },
  { slug: "lead-generation", name: "Lead Generation" },
  { slug: "branding-design", name: "Branding & Creative Design" },
  { slug: "social-media", name: "Social Media Management" },
  { slug: "digital-growth", name: "Digital Growth Solutions" },
] as const;

export type ServiceSlug = (typeof catalog)[number]["slug"];

export function isServiceSlug(value: string): value is ServiceSlug {
  return catalog.some((item) => item.slug === value);
}
