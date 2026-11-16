import { redirect } from "next/navigation";
import { SignOut } from "@/components/studio";
import { adminPassword, readSession } from "@/lib/auth";
import { sql } from "@/lib/db";

type Inquiry = {
  id: string;
  created_at: string | Date;
  full_name: string;
  business_name: string;
  email: string;
  whatsapp: string;
  service: string;
  budget: string | null;
  description: string;
  email_status: string;
};

function when(value: string | Date) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(date)} UTC`;
}

export default async function InquiriesPage() {
  if (!adminPassword() || !(await readSession())) redirect("/admin/login");
  const inquiries = await sql<Inquiry>(
    `select id, created_at, full_name, business_name, email, whatsapp, service, budget, description, email_status
     from inquiries order by created_at desc limit 200`,
  );
  return (
    <div className="py-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-5xl">Inquiries</h1>
        <SignOut />
      </div>
      <p className="mt-3 text-sm text-mist">
        {inquiries.length === 0
          ? "No inquiries yet. New form submissions are kept here even when email is not connected."
          : `${inquiries.length} saved. The newest 200 are shown. They are not deleted from Studio.`}
      </p>
      <div className="mt-8 space-y-4">
        {inquiries.map((item) => (
          <article key={item.id} className="border border-white/10 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg">
                {item.full_name} · {item.business_name}
              </h2>
              <time className="text-xs text-mist" dateTime={new Date(item.created_at).toISOString()}>
                {when(item.created_at)}
              </time>
            </div>
            <p className="mt-2 text-sm text-mist">
              {item.service} · {item.email} · WhatsApp {item.whatsapp}
              {item.budget ? ` · Budget ${item.budget}` : ""}
            </p>
            <p className="mt-2 text-xs tracking-[0.14em] text-mist uppercase">Email: {item.email_status}</p>
            <p className="mt-3 text-sm leading-6 whitespace-pre-wrap">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
