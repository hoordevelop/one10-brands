import { JsonLd } from "@/components/json-ld";
import { Tilt } from "@/components/motion";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { getPortfolio } from "@/lib/content-store";
import { pageMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata() {
  return pageMeta({
    title: "Our Work",
    description:
      "Sample project frames for One10 Brands Marketing. No client names, testimonials, or performance results are shown until real projects are published.",
    path: "/work",
  });
}

export default async function WorkPage() {
  const [items, siteUrl] = await Promise.all([getPortfolio(), getSiteUrl()]);
  const samples = items.filter((item) => item.sample);
  const published = items.filter((item) => !item.sample);
  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Our Work",
          url: `${siteUrl}/work`,
          description: "Sample project slots for One10 Brands Marketing. Not client results.",
        }}
      />
      <Eyebrow>Our work</Eyebrow>
      <h1 className="mt-4 max-w-3xl font-display text-6xl leading-[0.9] text-white sm:text-7xl">
        Room for the work. Nothing invented to fill it.
      </h1>
      <Tilt>
      <p className="mt-6 max-w-2xl border border-red/40 bg-panel p-5 text-sm leading-7 text-mist">
        The cards marked Sample are layout, not case studies. They do not name clients, partners, or results. Real projects replace them from Studio when the company is ready to show the work.
      </p>
      </Tilt>

      {published.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-display text-4xl text-white">Published projects</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {published.map((item) => (
              <Tilt key={item.id}>
              <article className="h-full border border-white/10 bg-ink p-6">
                <h3 className="type-3d font-display text-4xl text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-mist">{item.summary}</p>
                {item.services ? <p className="mt-4 text-xs tracking-[0.16em] text-white uppercase">{item.services}</p> : null}
              </article>
              </Tilt>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-14">
        <h2 className="font-display text-4xl text-white">{published.length > 0 ? "Sample slots" : "Sample slots"}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {samples.map((item) => (
            <Tilt key={item.id}>
            <article className="relative min-h-56 h-full border border-white/10 bg-panel/50 p-6">
              <span className="absolute top-4 right-4 bg-red px-2 py-1 text-[0.65rem] tracking-[0.18em] text-white uppercase">
                Sample
              </span>
              <h3 className="type-3d max-w-sm font-display text-4xl text-white">{item.title}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-mist">{item.summary}</p>
              <p className="mt-6 text-xs tracking-[0.16em] text-white/70 uppercase">{item.services}</p>
            </article>
            </Tilt>
          ))}
        </div>
      </section>

      <div className="mt-14">
        <ButtonLink href="/contact">Start a project</ButtonLink>
      </div>
    </div>
  );
}
