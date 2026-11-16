import { Eyebrow } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export async function generateMetadata() {
  return pageMeta({
    title: "Terms",
    description: "Draft terms for using the One10 Brands Marketing website. An inquiry is not a contract, and sample work is not a client result.",
    path: "/terms",
  });
}

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-20">
      <Eyebrow>Legal draft</Eyebrow>
      <h1 className="mt-4 font-display text-6xl text-white">Terms</h1>
      <p className="mt-6 text-sm leading-7 text-mist">
        Draft prepared 16 November 2026. This is not a client agreement and not legal advice. It does not name a governing law, a registered company number, or an office, because those details have not been supplied. Have a lawyer add them before you rely on this page.
      </p>
      <div className="mt-10 space-y-8 text-sm leading-7 text-mist">
        <section>
          <h2 className="text-xl text-white">Using the site</h2>
          <p className="mt-2">
            You may read the site and send an inquiry. Do not misuse the form, attempt to break the studio, or scrape the site in a way that degrades it for other people.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-white">No contract from a visit</h2>
          <p className="mt-2">
            An inquiry is a request for a conversation. Work starts only when both sides agree scope, price, and timing in writing. Nothing on this site is a quote, a guarantee of rankings, revenue, or leads, or a promise of a timeline.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-white">Sample work</h2>
          <p className="mt-2">
            Cards marked Sample are placeholders. They are not clients, testimonials, partnerships, or results. Do not cite them as proof of performance.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-white">The words and the design</h2>
          <p className="mt-2">
            The site’s copy, layout, and original graphics are for One10 Brands Marketing. You may not copy them into another brand’s site. Product names such as Meta, Facebook, Instagram, Google, YouTube, and WhatsApp belong to their owners. We use them to describe services.
          </p>
        </section>
        <section>
          <h2 className="text-xl text-white">Contact details</h2>
          <p className="mt-2">
            The WhatsApp number and email on the contact page are how to reach One10. This page does not state a street address or a registered office.
          </p>
        </section>
      </div>
    </article>
  );
}
