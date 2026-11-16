"use client";

import { useEffect, useState } from "react";
import { catalog } from "@/content/catalog";
import { contactSchema } from "@/lib/contact-schema";

type EmailState = "sent" | "not_configured" | "failed";

type FormState = {
  fullName: string;
  businessName: string;
  email: string;
  whatsapp: string;
  service: string;
  budget: string;
  description: string;
  website: string;
};

const empty: FormState = {
  fullName: "",
  businessName: "",
  email: "",
  whatsapp: "",
  service: "",
  budget: "",
  description: "",
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [challengeId, setChallengeId] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState<EmailState | null>(null);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  async function prepare() {
    setReady(false);
    setChallengeId("");
    const response = await fetch("/api/contact/challenge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    const data = (await response.json()) as { ok?: boolean; challengeId?: string; error?: string };
    if (!response.ok || !data.challengeId) {
      setMessage(data.error || "The form could not be prepared. Refresh and try again.");
      return;
    }
    setChallengeId(data.challengeId);
    setReady(true);
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void prepare();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function update(key: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    setEmail(null);
    const parsed = contactSchema.safeParse({ ...values, challengeId, budget: values.budget || "" });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setFields(next);
      setMessage("Check the highlighted fields.");
      return;
    }
    if (!challengeId) {
      setMessage("The form is still preparing. Wait a moment.");
      return;
    }
    setBusy(true);
    setFields({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, challengeId, budget: values.budget || "" }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        email?: EmailState;
        fieldErrors?: Record<string, string>;
      };
      if (!response.ok || !data.ok) {
        setFields(data.fieldErrors ?? {});
        setMessage(data.error || "We couldn't send that. Try again.");
        if (response.status !== 400) void prepare();
        return;
      }
      setEmail(data.email ?? "not_configured");
      if (data.email === "sent") {
        setMessage("Your inquiry is saved and the studio has been notified by email.");
      } else if (data.email === "failed") {
        setMessage("Your inquiry is saved, but the notification email did not send. Use WhatsApp or email on this page as well.");
      } else {
        setMessage("Your inquiry is saved. Email notification is not connected yet, so the message is kept on file. You can also use the contact options on this page.");
      }
    } catch {
      setMessage("The network request failed. Your inquiry was not confirmed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "mt-2 w-full border border-white/15 bg-ink px-3 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-red";

  return (
    <form onSubmit={onSubmit} className="relative space-y-5" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update("website", event.target.value)}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={fields.fullName} htmlFor="fullName">
          <input id="fullName" name="fullName" autoComplete="name" required className={inputClass} value={values.fullName} onChange={(event) => update("fullName", event.target.value)} />
        </Field>
        <Field label="Business name" error={fields.businessName} htmlFor="businessName">
          <input id="businessName" name="businessName" autoComplete="organization" required className={inputClass} value={values.businessName} onChange={(event) => update("businessName", event.target.value)} />
        </Field>
        <Field label="Email" error={fields.email} htmlFor="email">
          <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} value={values.email} onChange={(event) => update("email", event.target.value)} />
        </Field>
        <Field label="WhatsApp number" error={fields.whatsapp} htmlFor="whatsapp">
          <input id="whatsapp" name="whatsapp" type="tel" autoComplete="tel" required placeholder="Country code and number" className={inputClass} value={values.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} />
        </Field>
      </div>
      <Field label="Required service" error={fields.service} htmlFor="service">
        <select id="service" name="service" required className={inputClass} value={values.service} onChange={(event) => update("service", event.target.value)}>
          <option value="">Select a service</option>
          {catalog.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Project budget (optional)" error={fields.budget} htmlFor="budget">
        <input id="budget" name="budget" className={inputClass} placeholder="A range is enough. This is not a quote." value={values.budget} onChange={(event) => update("budget", event.target.value)} />
      </Field>
      <Field label="Project description" error={fields.description} htmlFor="description">
        <textarea id="description" name="description" required minLength={20} rows={6} className={inputClass} value={values.description} onChange={(event) => update("description", event.target.value)} />
      </Field>
      <p className="text-sm leading-6 text-mist">
        We store this inquiry so it is not lost if email is offline. Read the{" "}
        <a className="text-white underline decoration-red underline-offset-4" href="/privacy">
          privacy policy
        </a>
        .
      </p>
      <button
        type="submit"
        disabled={busy || !ready || email !== null}
        className="inline-flex min-h-12 items-center bg-red px-6 text-[0.78rem] font-semibold tracking-[0.16em] text-white uppercase disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? "Sending" : email ? "Inquiry saved" : ready ? "Send inquiry" : "Preparing form"}
      </button>
      <div role="status" aria-live="polite" className="min-h-6 text-sm text-white">
        {message}
      </div>
      {email ? (
        <button
          type="button"
          className="text-sm text-mist underline underline-offset-4"
          onClick={() => {
            setValues(empty);
            setEmail(null);
            setMessage("");
            void prepare();
          }}
        >
          Send another inquiry
        </button>
      ) : null}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-[0.72rem] tracking-[0.18em] text-mist uppercase">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 text-sm text-[#ffb4b4]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
