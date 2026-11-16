import "server-only";
import { defaultFaqs, type FaqItem } from "@/content/faq";
import { samplePortfolio, type PortfolioItem } from "@/content/portfolio";
import { findService, listServices, type Service } from "@/content/services";
import { PLACEHOLDER_EMAIL, PLACEHOLDER_WHATSAPP, siteDefaults } from "@/content/site";
import { sql } from "@/lib/db";
import { logError } from "@/lib/log";

export type PublicContact = {
  whatsappE164: string;
  whatsappIsPlaceholder: boolean;
  email: string;
  emailIsPlaceholder: boolean;
  socials: { label: string; href: string }[];
};

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  role: string;
};

const SOCIAL_KEYS = [
  ["social_instagram", "Instagram"],
  ["social_linkedin", "LinkedIn"],
  ["social_facebook", "Facebook"],
  ["social_x", "X"],
  ["social_youtube", "YouTube"],
] as const;

async function rows<T>(query: string, params: unknown[] = []) {
  try {
    return await sql<T>(query, params);
  } catch (error) {
    logError("content", error);
    return null;
  }
}

function httpsUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return "";
    if (url.username || url.password) return "";
    return url.toString();
  } catch {
    return "";
  }
}

export async function getPublicContact(): Promise<PublicContact> {
  const stored = await rows<{ key: string; value: string }>("select key, value from site_settings");
  const map = new Map((stored ?? []).map((row) => [row.key, row.value.trim()]));
  const whatsapp = (map.get("whatsapp_e164") ?? "").replace(/[^\d]/g, "");
  const whatsappOk = /^\d{8,15}$/.test(whatsapp) && !/^0+$/.test(whatsapp);
  const email = map.get("public_email") ?? "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !email.endsWith("@example.com");
  const publishedWhatsapp = whatsappOk ? whatsapp : siteDefaults.whatsappE164;
  const publishedEmail = emailOk ? email : siteDefaults.email;
  const socials = SOCIAL_KEYS.flatMap(([key, label]) => {
    const href = httpsUrl(map.get(key) ?? "");
    return href ? [{ label, href }] : [];
  });
  return {
    whatsappE164: publishedWhatsapp,
    whatsappIsPlaceholder: publishedWhatsapp === PLACEHOLDER_WHATSAPP || /^0+$/.test(publishedWhatsapp),
    email: publishedEmail,
    emailIsPlaceholder: publishedEmail === PLACEHOLDER_EMAIL || publishedEmail.toLowerCase().endsWith("@example.com"),
    socials,
  };
}

export async function getFaqs(): Promise<FaqItem[]> {
  const stored = await rows<{ id: string; question: string; answer: string }>(
    "select id, question, answer from faqs where published = true order by sort_order asc, question asc",
  );
  if (!stored || stored.length === 0) return defaultFaqs;
  return stored;
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  const stored = await rows<PortfolioItem>(
    "select id, title, summary, services, sample from portfolio_items where published = true order by sort_order asc, title asc",
  );
  if (!stored || stored.length === 0) return samplePortfolio;
  return stored.map((item) => ({ ...item, sample: Boolean(item.sample) }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const stored = await rows<Testimonial>(
    "select id, quote, attribution, role from testimonials where published = true order by sort_order asc",
  );
  return stored ?? [];
}

export async function getServices(): Promise<Service[]> {
  const stored = await rows<{ slug: string; summary: string | null; outcome: string | null; intro: string | null }>(
    "select slug, summary, outcome, intro from service_overrides",
  );
  const map = new Map((stored ?? []).map((row) => [row.slug, row]));
  return listServices().map((service) => {
    const override = map.get(service.slug);
    if (!override) return service;
    return {
      ...service,
      summary: override.summary?.trim() || service.summary,
      outcome: override.outcome?.trim() || service.outcome,
      intro: override.intro?.trim() || service.intro,
    };
  });
}

export async function getService(slug: string): Promise<Service | undefined> {
  const base = findService(slug);
  if (!base) return undefined;
  const services = await getServices();
  return services.find((service) => service.slug === slug) ?? base;
}

export { SOCIAL_KEYS };
