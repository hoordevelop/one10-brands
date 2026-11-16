import { JsonLd } from "@/components/json-ld";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { getFaqs } from "@/lib/content-store";
import { pageMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata() {
  return pageMeta({
    title: "FAQ",
    description:
      "Answers on digital marketing, Meta Ads, Google Ads, websites, SEO, email, WhatsApp, pricing, and timelines from One10 Brands Marketing.",
    path: "/faq",
  });
}

export default async function FaqPage() {
  const [faqs, siteUrl] = await Promise.all([getFaqs(), getSiteUrl()]);
  return (
    <div className="mx-auto max-w-3xl px-5 py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <Eyebrow>FAQ</Eyebrow>
      <h1 className="mt-4 font-display text-6xl text-white">Questions we get before a proposal.</h1>
      <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {faqs.map((item) => (
          <details key={item.id} className="group py-5">
            <summary className="cursor-pointer text-xl text-white">{item.question}</summary>
            <p className="pt-3 text-sm leading-7 text-mist">{item.answer}</p>
          </details>
        ))}
      </div>
      <div className="mt-12">
        <ButtonLink href="/contact">Get Started</ButtonLink>
      </div>
      <p className="mt-8 text-sm text-mist">
        More on the services lives at{" "}
        <a className="text-white underline decoration-red underline-offset-4" href={`${siteUrl}/services`}>
          the services index
        </a>
        .
      </p>
    </div>
  );
}
