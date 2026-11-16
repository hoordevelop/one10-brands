import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { Tilt } from "@/components/motion";
import { Eyebrow } from "@/components/ui";
import { getServices } from "@/lib/content-store";
import { pageMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata() {
  return pageMeta({
    title: "Services",
    description:
      "Digital marketing, Meta Ads, Google Ads, WhatsApp, email, websites, SEO, CRM, lead generation, branding, social, and growth consulting.",
    path: "/services",
  });
}

export default async function ServicesPage() {
  const [services, siteUrl] = await Promise.all([getServices(), getSiteUrl()]);
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
          ],
        }}
      />
      <Eyebrow>Services</Eyebrow>
      <h1 className="mt-4 max-w-3xl font-display text-6xl leading-[0.9] text-white sm:text-7xl">
        Twelve ways we help a company grow.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">
        Each service can stand alone. Most companies need two or three of them pointed at the same offer. Choose a line to read how the work is actually done.
      </p>
      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {services.map((service, index) => (
          <Tilt key={service.slug}>
            <Link href={`/services/${service.slug}`} className="group flex h-full flex-col border border-white/10 bg-panel/40 p-6 transition hover:border-red">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-4xl text-white">{service.name}</h2>
                <span className="font-display text-2xl text-red">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-mist">{service.outcome}</p>
              <span className="mt-6 text-xs tracking-[0.18em] text-white uppercase">Open</span>
            </Link>
          </Tilt>
        ))}
      </div>
    </div>
  );
}
