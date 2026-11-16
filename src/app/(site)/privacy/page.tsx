import { Eyebrow } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata() {
  return pageMeta({
    title: "Privacy Policy",
    description: "Draft privacy notice for the One10 Brands Marketing website, including the contact form and optional analytics.",
    path: "/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-20">
      <Eyebrow>Legal draft</Eyebrow>
      <h1 className="mt-4 font-display text-6xl text-white">Privacy Policy</h1>
      <p className="mt-6 text-sm leading-7 text-mist">
        Draft prepared 16 November 2026. This is a plain-language starting point for the website, not legal advice and not a claim of registration, a data-protection officer, or a registered office. Have it reviewed and replace the notes in brackets before you rely on it.
      </p>
      <div className="mt-10 space-y-8 text-sm leading-7 text-mist">
        <section>
          <h2 className="text-xl text-white">Who this notice is for</h2>
          <p className="mt-2">
            This notice describes the One10 Brands Marketing website. [Add the legal entity name, number, and contact address when they exist. They are intentionally omitted here.]
          </p>
        </section>
        <section>
          <h2 className="text-xl text-white">What the contact form stores</h2>
          <p className="mt-2">
            If you send the form, we store your name, business name, email, WhatsApp number, chosen service, optional budget note, and project description. We also store whether a notification email was sent. For spam control we store a one-way hash of the network address for a short time, not a profile of you. Inquiries are kept so a message is not lost when email is unavailable.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-white">Email</h2>
          <p className="mt-2">
            When Resend is connected, the same inquiry is emailed to the studio inbox you configure. If it is not connected, the inquiry stays in the site database and the form says so. We do not sell the contents of the form.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-white">Analytics</h2>
          <p className="mt-2">
            Google Analytics, Google Tag Manager, and the Meta Pixel are included in the page only when their IDs are set in the environment. If those IDs are empty, those tags are not loaded. A Google Search Console verification meta tag is added only when that value is set.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-white">Studio</h2>
          <p className="mt-2">
            The Studio area is for the site owner. It is protected by a password. Inquiry contents are visible there and are not published on the marketing pages.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-white">How long, and your requests</h2>
          <p className="mt-2">
            [Set a retention period.] Until that decision is written down, treat inquiries as kept for as long as the conversation may continue. To ask about a submission, use the contact details published on the contact page. Placeholder phone and email values are not a monitored inbox.
          </p>
        </section>
      </div>
    </article>
  );
}
