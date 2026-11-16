import { isServiceSlug } from "@/content/catalog";
import { findService } from "@/content/services";
import { readSession, studioHeaderOk } from "@/lib/auth";
import { sql } from "@/lib/db";
import { jsonError, jsonOk, readJson, sameOrigin } from "@/lib/http";
import { logError } from "@/lib/log";

const ID_OK = /^[a-zA-Z0-9_-]{2,80}$/;

function text(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function flag(value: unknown) {
  return value === true;
}

async function putSetting(key: string, value: string) {
  if (!value) {
    await sql("delete from site_settings where key = $1", [key]);
    return;
  }
  await sql(
    `insert into site_settings (key, value, updated_at)
     values ($1, $2, now())
     on conflict (key) do update set value = excluded.value, updated_at = now()`,
    [key, value],
  );
}

function httpsUrl(value: string) {
  if (!value) return "";
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    if (url.toString().length > 300) return null;
    return url.toString();
  } catch {
    return null;
  }
}

async function saveContact(input: Record<string, unknown>) {
  const whatsappRaw = text(input.whatsapp, 24);
  const whatsapp = whatsappRaw.replace(/[^\d]/g, "");
  if (whatsapp && (!/^\d{8,15}$/.test(whatsapp) || /^0+$/.test(whatsapp))) {
    return "Enter a real WhatsApp number, or leave it blank to keep the placeholder.";
  }
  const email = text(input.email, 160);
  if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.endsWith("@example.com"))) {
    return "Enter a real email address, or leave it blank to keep the placeholder.";
  }
  const socials = [
    ["social_instagram", input.instagram],
    ["social_linkedin", input.linkedin],
    ["social_facebook", input.facebook],
    ["social_x", input.x],
    ["social_youtube", input.youtube],
  ] as const;
  const cleaned: { key: string; value: string }[] = [];
  for (const [key, raw] of socials) {
    const href = httpsUrl(text(raw, 300));
    if (href === null) return "Social links must be https addresses, or blank.";
    cleaned.push({ key, value: href });
  }
  await putSetting("whatsapp_e164", whatsapp);
  await putSetting("public_email", email);
  for (const item of cleaned) await putSetting(item.key, item.value);
  return null;
}

async function saveFaqs(input: Record<string, unknown>) {
  if (!Array.isArray(input.items) || input.items.length > 40) return "Send up to 40 questions.";
  const items = input.items.map((item, index) => {
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    return {
      id: text(row.id, 80),
      question: text(row.question, 200),
      answer: text(row.answer, 2000),
      published: flag(row.published),
      sort: index,
    };
  });
  if (items.some((item) => !ID_OK.test(item.id) || item.question.length < 8 || item.answer.length < 8)) {
    return "Each question needs an id, a question, and an answer.";
  }
  for (const item of items) {
    await sql(
      `insert into faqs (id, question, answer, sort_order, published, updated_at)
       values ($1, $2, $3, $4, $5, now())
       on conflict (id) do update set
         question = excluded.question,
         answer = excluded.answer,
         sort_order = excluded.sort_order,
         published = excluded.published,
         updated_at = now()`,
      [item.id, item.question, item.answer, item.sort, item.published],
    );
  }
  const existing = await sql<{ id: string }>("select id from faqs");
  const keep = new Set(items.map((item) => item.id));
  for (const row of existing) {
    if (!keep.has(row.id)) await sql("delete from faqs where id = $1", [row.id]);
  }
  return null;
}

async function savePortfolio(input: Record<string, unknown>) {
  if (!Array.isArray(input.items) || input.items.length > 30) return "Send up to 30 projects.";
  const items = input.items.map((item, index) => {
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    return {
      id: text(row.id, 80),
      title: text(row.title, 140),
      summary: text(row.summary, 800),
      services: text(row.services, 180),
      sample: row.sample !== false,
      published: flag(row.published),
      sort: index,
    };
  });
  if (items.some((item) => !ID_OK.test(item.id) || item.title.length < 3 || item.summary.length < 12)) {
    return "Each project needs a title and a summary. Mark sample work as sample.";
  }
  for (const item of items) {
    await sql(
      `insert into portfolio_items (id, title, summary, services, sample, sort_order, published, updated_at)
       values ($1, $2, $3, $4, $5, $6, $7, now())
       on conflict (id) do update set
         title = excluded.title,
         summary = excluded.summary,
         services = excluded.services,
         sample = excluded.sample,
         sort_order = excluded.sort_order,
         published = excluded.published,
         updated_at = now()`,
      [item.id, item.title, item.summary, item.services, item.sample, item.sort, item.published],
    );
  }
  const existing = await sql<{ id: string }>("select id from portfolio_items");
  const keep = new Set(items.map((item) => item.id));
  for (const row of existing) {
    if (!keep.has(row.id)) await sql("delete from portfolio_items where id = $1", [row.id]);
  }
  return null;
}

async function saveTestimonials(input: Record<string, unknown>) {
  if (!Array.isArray(input.items) || input.items.length > 20) return "Send up to 20 testimonials.";
  const items = input.items.map((item, index) => {
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    return {
      id: text(row.id, 80),
      quote: text(row.quote, 800),
      attribution: text(row.attribution, 120),
      role: text(row.role, 120),
      published: flag(row.published),
      sort: index,
    };
  });
  if (items.some((item) => !ID_OK.test(item.id) || item.quote.length < 12 || item.attribution.length < 2)) {
    return "Each testimonial needs the approved quote and who said it.";
  }
  for (const item of items) {
    await sql(
      `insert into testimonials (id, quote, attribution, role, sort_order, published, updated_at)
       values ($1, $2, $3, $4, $5, $6, now())
       on conflict (id) do update set
         quote = excluded.quote,
         attribution = excluded.attribution,
         role = excluded.role,
         sort_order = excluded.sort_order,
         published = excluded.published,
         updated_at = now()`,
      [item.id, item.quote, item.attribution, item.role, item.sort, item.published],
    );
  }
  const existing = await sql<{ id: string }>("select id from testimonials");
  const keep = new Set(items.map((item) => item.id));
  for (const row of existing) {
    if (!keep.has(row.id)) await sql("delete from testimonials where id = $1", [row.id]);
  }
  return null;
}

async function saveServices(input: Record<string, unknown>) {
  if (!Array.isArray(input.items)) return "Send the service list.";
  for (const item of input.items) {
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    const slug = text(row.slug, 80);
    if (!isServiceSlug(slug)) return "Unknown service.";
    const base = findService(slug);
    if (!base) return "Unknown service.";
    const summary = text(row.summary, 400);
    const outcome = text(row.outcome, 180);
    const intro = text(row.intro, 1200);
    await sql(
      `insert into service_overrides (slug, summary, outcome, intro, updated_at)
       values ($1, $2, $3, $4, now())
       on conflict (slug) do update set
         summary = excluded.summary,
         outcome = excluded.outcome,
         intro = excluded.intro,
         updated_at = now()`,
      [
        slug,
        summary && summary !== base.summary ? summary : null,
        outcome && outcome !== base.outcome ? outcome : null,
        intro && intro !== base.intro ? intro : null,
      ],
    );
  }
  return null;
}

export async function POST(req: Request) {
  if (!sameOrigin(req) || !studioHeaderOk(req)) return jsonError("Open Studio to save.", 403);
  if (!(await readSession())) return jsonError("Sign in required.", 401);
  const body = await readJson(req, 200_000);
  if (!body.ok) return jsonError(body.error, 400);
  if (!body.value || typeof body.value !== "object") return jsonError("Nothing to save.", 400);
  const input = body.value as Record<string, unknown>;
  try {
    let error: string | null = null;
    if (input.section === "contact") error = await saveContact(input);
    else if (input.section === "faqs") error = await saveFaqs(input);
    else if (input.section === "portfolio") error = await savePortfolio(input);
    else if (input.section === "testimonials") error = await saveTestimonials(input);
    else if (input.section === "services") error = await saveServices(input);
    else return jsonError("Unknown section.", 400);
    if (error) return jsonError(error, 400);
    return jsonOk({ saved: input.section });
  } catch (error) {
    logError("studio", error);
    return jsonError("Studio could not save that section.", 500);
  }
}
