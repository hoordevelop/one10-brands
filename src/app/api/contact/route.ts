import { randomUUID } from "node:crypto";
import { catalog } from "@/content/catalog";
import { contactSchema } from "@/lib/contact-schema";
import { sql } from "@/lib/db";
import { sendInquiryEmail } from "@/lib/email";
import { clientIp, hashIp, jsonError, jsonOk, readJson, sameOrigin } from "@/lib/http";
import { logError } from "@/lib/log";
import { rateLimited } from "@/lib/rate";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return jsonError("This form can only be sent from the site.", 403);
  const body = await readJson(req);
  if (!body.ok) return jsonError(body.error, 400);

  const parsed = contactSchema.safeParse(body.value);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return jsonError("Check the form and try again.", 400, { fieldErrors });
  }

  const data = parsed.data;
  if ((data.website ?? "").trim() !== "") {
    return jsonError("We couldn't accept that submission.", 400);
  }

  try {
    const ipHash = hashIp(clientIp(req));
    if (await rateLimited(ipHash, "contact")) {
      return jsonError("Too many inquiries from this network. Try again later.", 429);
    }

    const consumed = await sql<{ id: string }>(
      `update form_challenges
       set used_at = now()
       where id = $1
         and used_at is null
         and created_at <= now() - interval '3 seconds'
         and created_at >= now() - interval '30 minutes'
       returning id`,
      [data.challengeId],
    );
    if (consumed.length === 0) {
      return jsonError("Wait a few seconds, then send the form again. If it still fails, refresh the page.", 400);
    }

    const serviceName = catalog.find((item) => item.slug === data.service)?.name ?? data.service;
    const id = randomUUID();
    const budget = data.budget?.trim() || "";
    await sql(
      `insert into inquiries
        (id, full_name, business_name, email, whatsapp, service, budget, description, email_status, ip_hash)
       values ($1, $2, $3, $4, $5, $6, $7, $8, 'pending', $9)`,
      [id, data.fullName, data.businessName, data.email, data.whatsapp, serviceName, budget, data.description, ipHash],
    );

    const emailStatus = await sendInquiryEmail({
      fullName: data.fullName,
      businessName: data.businessName,
      email: data.email,
      whatsapp: data.whatsapp,
      service: serviceName,
      budget,
      description: data.description,
    });
    await sql("update inquiries set email_status = $1 where id = $2", [emailStatus, id]);
    return jsonOk({ email: emailStatus });
  } catch (error) {
    logError("contact", error);
    return jsonError("We couldn't save your inquiry. Please try again.", 500);
  }
}
