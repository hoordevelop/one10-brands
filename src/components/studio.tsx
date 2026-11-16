"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ServiceSlug } from "@/content/catalog";

type Faq = { id: string; question: string; answer: string; published: boolean };
type Project = { id: string; title: string; summary: string; services: string; sample: boolean; published: boolean };
type Quote = { id: string; quote: string; attribution: string; role: string; published: boolean };
type ServiceEdit = { slug: ServiceSlug; name: string; summary: string; outcome: string; intro: string };

async function save(body: unknown) {
  const response = await fetch("/api/admin/content", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-one10-admin": "1" },
    body: JSON.stringify(body),
  });
  const data = (await response.json()) as { ok?: boolean; error?: string };
  if (!response.ok || !data.ok) throw new Error(data.error || "Save failed.");
}

export function SignOut() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="text-sm text-mist hover:text-white"
      onClick={async () => {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-one10-admin": "1" },
          body: "{}",
        });
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Sign out
    </button>
  );
}

export function LoginForm({ locked }: { locked: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  if (locked) {
    return (
      <p className="mt-6 text-sm leading-7 text-mist">
        Studio is locked. Add the ADMIN_PASSWORD secret in Cursor, then publish again. Do not put the password in the repository.
      </p>
    );
  }

  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={async (event) => {
        event.preventDefault();
        setBusy(true);
        setMessage("");
        try {
          const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
          });
          const data = (await response.json()) as { ok?: boolean; error?: string };
          if (!response.ok || !data.ok) {
            setMessage(data.error || "Sign in failed.");
            return;
          }
          router.push("/admin");
          router.refresh();
        } catch {
          setMessage("Sign in failed.");
        } finally {
          setBusy(false);
        }
      }}
    >
      <label className="block text-xs tracking-[0.16em] text-mist uppercase" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        className="w-full border border-white/15 bg-ink px-3 py-3 text-sm"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit" disabled={busy} className="min-h-11 bg-red px-5 text-xs tracking-[0.16em] text-white uppercase">
        {busy ? "Checking" : "Enter studio"}
      </button>
      <p role="status" className="text-sm text-white">
        {message}
      </p>
    </form>
  );
}

function useStatus() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  async function run(task: () => Promise<void>) {
    setMessage("");
    try {
      await task();
      setMessage("Saved.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    }
  }
  return { message, run };
}

export function StudioEditor({
  contact,
  faqs,
  projects,
  quotes,
  services,
}: {
  contact: {
    whatsapp: string;
    email: string;
    instagram: string;
    linkedin: string;
    facebook: string;
    x: string;
    youtube: string;
  };
  faqs: Faq[];
  projects: Project[];
  quotes: Quote[];
  services: ServiceEdit[];
}) {
  const [contactState, setContactState] = useState(contact);
  const [faqState, setFaqState] = useState(faqs);
  const [projectState, setProjectState] = useState(projects);
  const [quoteState, setQuoteState] = useState(quotes);
  const [serviceState, setServiceState] = useState(services);
  const status = useStatus();
  const field = "mt-1 w-full border border-white/15 bg-ink px-3 py-2 text-sm";

  return (
    <div className="space-y-16">
      <p role="status" className="text-sm text-white">
        {status.message}
      </p>
      <section>
        <h2 className="font-display text-4xl text-white">Contact details</h2>
        <p className="mt-2 text-sm text-mist">Leave a field blank to keep the public placeholder. Do not save example.com or an all-zero number.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(
            [
              ["whatsapp", "WhatsApp digits"],
              ["email", "Public email"],
              ["instagram", "Instagram https URL"],
              ["linkedin", "LinkedIn https URL"],
              ["facebook", "Facebook https URL"],
              ["x", "X https URL"],
              ["youtube", "YouTube https URL"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="text-xs tracking-wide text-mist">
              {label}
              <input className={field} value={contactState[key]} onChange={(event) => setContactState({ ...contactState, [key]: event.target.value })} />
            </label>
          ))}
        </div>
        <button type="button" className="mt-4 min-h-10 bg-red px-4 text-xs tracking-[0.14em] text-white uppercase" onClick={() => status.run(() => save({ section: "contact", ...contactState }))}>
          Save contact
        </button>
      </section>

      <section>
        <h2 className="font-display text-4xl text-white">Services</h2>
        <p className="mt-2 text-sm text-mist">
          These three fields override the public summary, outcome, and opening paragraph. Detailed sections stay in src/content/services.ts and need a republish. Clearing a field restores the file copy.
        </p>
        <div className="mt-6 space-y-8">
          {serviceState.map((service, index) => (
            <div key={service.slug} className="border border-white/10 p-4">
              <h3 className="text-white">{service.name}</h3>
              <label className="mt-3 block text-xs text-mist">
                Outcome
                <input className={field} value={service.outcome} onChange={(event) => updateService(index, "outcome", event.target.value)} />
              </label>
              <label className="mt-3 block text-xs text-mist">
                Summary
                <textarea className={field} rows={3} value={service.summary} onChange={(event) => updateService(index, "summary", event.target.value)} />
              </label>
              <label className="mt-3 block text-xs text-mist">
                Opening
                <textarea className={field} rows={4} value={service.intro} onChange={(event) => updateService(index, "intro", event.target.value)} />
              </label>
            </div>
          ))}
        </div>
        <button type="button" className="mt-4 min-h-10 bg-red px-4 text-xs tracking-[0.14em] text-white uppercase" onClick={() => status.run(() => save({ section: "services", items: serviceState }))}>
          Save services
        </button>
      </section>

      <section>
        <h2 className="font-display text-4xl text-white">FAQs</h2>
        <p className="mt-2 text-sm text-mist">Saving an empty list restores the built-in questions on the public site.</p>
        {faqState.map((item, index) => (
          <div key={item.id} className="mt-4 border border-white/10 p-4">
            <input className={field} value={item.question} onChange={(event) => updateFaq(index, "question", event.target.value)} />
            <textarea className={field} rows={4} value={item.answer} onChange={(event) => updateFaq(index, "answer", event.target.value)} />
            <label className="mt-2 flex items-center gap-2 text-sm text-mist">
              <input type="checkbox" checked={item.published} onChange={(event) => updateFaq(index, "published", event.target.checked)} />
              Published
            </label>
            <button type="button" className="mt-2 text-xs text-mist" onClick={() => setFaqState(faqState.filter((_, i) => i !== index))}>
              Remove
            </button>
          </div>
        ))}
        <div className="mt-4 flex gap-3">
          <button type="button" className="text-sm text-white" onClick={() => setFaqState([...faqState, { id: crypto.randomUUID(), question: "", answer: "", published: true }])}>
            Add question
          </button>
          <button type="button" className="min-h-10 bg-red px-4 text-xs tracking-[0.14em] text-white uppercase" onClick={() => status.run(() => save({ section: "faqs", items: faqState }))}>
            Save FAQs
          </button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-4xl text-white">Portfolio</h2>
        <p className="mt-2 text-sm text-mist">Keep Sample checked until the card is a real project. Do not invent results in the summary.</p>
        {projectState.map((item, index) => (
          <div key={item.id} className="mt-4 border border-white/10 p-4">
            <input className={field} value={item.title} onChange={(event) => updateProject(index, "title", event.target.value)} />
            <textarea className={field} rows={4} value={item.summary} onChange={(event) => updateProject(index, "summary", event.target.value)} />
            <input className={field} placeholder="Services" value={item.services} onChange={(event) => updateProject(index, "services", event.target.value)} />
            <label className="mt-2 flex items-center gap-2 text-sm text-mist">
              <input type="checkbox" checked={item.sample} onChange={(event) => updateProject(index, "sample", event.target.checked)} />
              Sample
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm text-mist">
              <input type="checkbox" checked={item.published} onChange={(event) => updateProject(index, "published", event.target.checked)} />
              Published
            </label>
            <button type="button" className="mt-2 text-xs text-mist" onClick={() => setProjectState(projectState.filter((_, i) => i !== index))}>
              Remove
            </button>
          </div>
        ))}
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            className="text-sm text-white"
            onClick={() =>
              setProjectState([
                ...projectState,
                { id: crypto.randomUUID(), title: "", summary: "", services: "", sample: true, published: false },
              ])
            }
          >
            Add project
          </button>
          <button type="button" className="min-h-10 bg-red px-4 text-xs tracking-[0.14em] text-white uppercase" onClick={() => status.run(() => save({ section: "portfolio", items: projectState }))}>
            Save portfolio
          </button>
        </div>
      </section>

      <section>
        <h2 className="font-display text-4xl text-white">Testimonials</h2>
        <p className="mt-2 text-sm text-mist">Add a quote only after a real client has approved it. The public site hides this section until one is published. There are none by default.</p>
        {quoteState.map((item, index) => (
          <div key={item.id} className="mt-4 border border-white/10 p-4">
            <textarea className={field} rows={3} value={item.quote} onChange={(event) => updateQuote(index, "quote", event.target.value)} />
            <input className={field} placeholder="Name" value={item.attribution} onChange={(event) => updateQuote(index, "attribution", event.target.value)} />
            <input className={field} placeholder="Role, optional" value={item.role} onChange={(event) => updateQuote(index, "role", event.target.value)} />
            <label className="mt-2 flex items-center gap-2 text-sm text-mist">
              <input type="checkbox" checked={item.published} onChange={(event) => updateQuote(index, "published", event.target.checked)} />
              Published
            </label>
            <button type="button" className="mt-2 text-xs text-mist" onClick={() => setQuoteState(quoteState.filter((_, i) => i !== index))}>
              Remove
            </button>
          </div>
        ))}
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            className="text-sm text-white"
            onClick={() => setQuoteState([...quoteState, { id: crypto.randomUUID(), quote: "", attribution: "", role: "", published: false }])}
          >
            Add testimonial
          </button>
          <button type="button" className="min-h-10 bg-red px-4 text-xs tracking-[0.14em] text-white uppercase" onClick={() => status.run(() => save({ section: "testimonials", items: quoteState }))}>
            Save testimonials
          </button>
        </div>
      </section>
    </div>
  );

  function updateService(index: number, key: "summary" | "outcome" | "intro", value: string) {
    setServiceState(serviceState.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }
  function updateFaq(index: number, key: keyof Faq, value: string | boolean) {
    setFaqState(faqState.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }
  function updateProject(index: number, key: keyof Project, value: string | boolean) {
    setProjectState(projectState.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }
  function updateQuote(index: number, key: keyof Quote, value: string | boolean) {
    setQuoteState(quoteState.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  }
}
