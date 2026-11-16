import { redirect } from "next/navigation";
import { SignOut, StudioEditor } from "@/components/studio";
import { defaultFaqs } from "@/content/faq";
import { samplePortfolio } from "@/content/portfolio";
import { adminPassword, readSession } from "@/lib/auth";
import { getServices } from "@/lib/content-store";
import { sql } from "@/lib/db";

export default async function ContentPage() {
  if (!adminPassword() || !(await readSession())) redirect("/admin/login");
  const [settings, faqs, projects, quotes, services] = await Promise.all([
    sql<{ key: string; value: string }>("select key, value from site_settings"),
    sql<{ id: string; question: string; answer: string; published: boolean }>(
      "select id, question, answer, published from faqs order by sort_order asc",
    ),
    sql<{ id: string; title: string; summary: string; services: string; sample: boolean; published: boolean }>(
      "select id, title, summary, services, sample, published from portfolio_items order by sort_order asc",
    ),
    sql<{ id: string; quote: string; attribution: string; role: string; published: boolean }>(
      "select id, quote, attribution, role, published from testimonials order by sort_order asc",
    ),
    getServices(),
  ]);
  const map = new Map(settings.map((row) => [row.key, row.value]));
  return (
    <div className="py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-5xl">Content</h1>
        <SignOut />
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-mist">
        Changes here are stored in the database and appear on the public site without a code edit. Long service pages, the about story, and the process steps still live in the content files.
      </p>
      <div className="mt-8">
        <StudioEditor
          contact={{
            whatsapp: map.get("whatsapp_e164") ?? "",
            email: map.get("public_email") ?? "",
            instagram: map.get("social_instagram") ?? "",
            linkedin: map.get("social_linkedin") ?? "",
            facebook: map.get("social_facebook") ?? "",
            x: map.get("social_x") ?? "",
            youtube: map.get("social_youtube") ?? "",
          }}
          faqs={
            faqs.length > 0
              ? faqs.map((item) => ({ ...item, published: Boolean(item.published) }))
              : defaultFaqs.map((item) => ({ ...item, published: true }))
          }
          projects={
            projects.length > 0
              ? projects.map((item) => ({ ...item, sample: Boolean(item.sample), published: Boolean(item.published) }))
              : samplePortfolio.map((item) => ({ ...item, published: true }))
          }
          quotes={quotes.map((item) => ({ ...item, published: Boolean(item.published) }))}
          services={services.map((service) => ({
            slug: service.slug,
            name: service.name,
            summary: service.summary,
            outcome: service.outcome,
            intro: service.intro,
          }))}
        />
      </div>
    </div>
  );
}
