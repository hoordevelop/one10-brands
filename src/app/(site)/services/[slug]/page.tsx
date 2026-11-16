import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog } from "@/content/catalog";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { getService, getServices } from "@/lib/content-store";
import { pageMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service" };
  return pageMeta({
    title: service.name,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [service, services, siteUrl] = await Promise.all([getService(slug), getServices(), getSiteUrl()]);
  if (!service) notFound();
  const index = catalog.findIndex((item) => item.slug === service.slug);
  const related = services.filter((item) => item.slug !== service.slug).slice(index, index + 2);

  return (
    <article className="mx-auto max-w-6xl px-5 py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.summary,
          url: `${siteUrl}/services/${service.slug}`,
          provider: { "@type": "Organization", name: "One10 Brands Marketing", url: siteUrl },
        }}
      />
      <p className="text-sm text-mist">
        <Link href="/services" className="hover:text-white">
          Services
        </Link>
        <span aria-hidden> / </span>
        {service.name}
      </p>
      <Eyebrow>{String(index + 1).padStart(2, "0")}</Eyebrow>
      <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.9] text-white sm:text-7xl">{service.name}</h1>
      <p className="mt-6 max-w-2xl text-xl leading-8 text-white">{service.outcome}</p>
      <p className="mt-6 max-w-3xl text-base leading-8 text-mist">{service.intro}</p>

      <section className="mt-16">
        <h2 className="font-display text-4xl text-white">What the work covers</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {service.covers.map((item) => (
            <div key={item.title} className="border border-white/10 p-5">
              <h3 className="text-lg text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-mist">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl text-white">How we run it</h2>
          <ol className="mt-6 space-y-5">
            {service.method.map((item, step) => (
              <li key={item.title}>
                <p className="text-xs tracking-[0.2em] text-[#ffb4b4] uppercase">Step {step + 1}</p>
                <h3 className="mt-1 text-lg text-white">{item.title}</h3>
                <p className="mt-1 text-sm leading-7 text-mist">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="border border-white/10 bg-panel p-6">
          <h2 className="font-display text-4xl text-white">A fit when</h2>
          <ul className="mt-6 space-y-4">
            {service.fit.map((item) => (
              <li key={item} className="border-t border-white/10 pt-4 text-sm leading-7 text-mist">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-16 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/contact">Get Started</ButtonLink>
        <ButtonLink href="/services" variant="ghost">
          All services
        </ButtonLink>
      </div>

      {related.length > 0 ? (
        <aside className="mt-16">
          <h2 className="text-sm tracking-[0.2em] text-mist uppercase">Also on the team</h2>
          <div className="mt-4 flex flex-col gap-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/services/${item.slug}`} className="text-lg text-white underline decoration-transparent underline-offset-4 hover:decoration-red">
                {item.name}
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </article>
  );
}
