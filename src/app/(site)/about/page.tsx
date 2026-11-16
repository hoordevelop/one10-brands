import { about, processSteps, whyPoints } from "@/content/story";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata() {
  return pageMeta({
    title: "About",
    description:
      "One10 Brands Marketing is a full-service digital marketing agency. Mission, vision, approach, and why companies choose the team.",
    path: "/about",
  });
}

export default async function AboutPage() {
  const siteUrl = await getSiteUrl();
  return (
    <article className="mx-auto max-w-6xl px-5 py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
          ],
        }}
      />
      <Eyebrow>About</Eyebrow>
      <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.9] text-white sm:text-7xl">
        A growth partner for companies that want the work done properly.
      </h1>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-mist">{about.lede}</p>
      <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-mist">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          ["Mission", about.mission],
          ["Vision", about.vision],
          ["Approach", about.approach],
        ].map(([title, text]) => (
          <section key={title} className="border border-white/10 bg-panel p-6">
            <h2 className="font-display text-4xl text-white">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-mist">{text}</p>
          </section>
        ))}
      </div>

      <section className="mt-20">
        <Eyebrow>Why choose One10</Eyebrow>
        <h2 className="mt-4 font-display text-5xl text-white">Six reasons the work stays in one place.</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {whyPoints.map((point) => (
            <div key={point.title} className="border-t border-red pt-4">
              <h3 className="text-xl text-white">{point.title}</h3>
              <p className="mt-2 text-sm leading-7 text-mist">{point.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <Eyebrow>How an engagement moves</Eyebrow>
        <ol className="mt-8 space-y-6">
          {processSteps.map((step) => (
            <li key={step.n} className="grid gap-3 border-b border-white/10 pb-6 sm:grid-cols-[5rem_1fr]">
              <span className="font-display text-3xl text-red">{step.n}</span>
              <div>
                <h3 className="text-xl text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-mist">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-16">
        <ButtonLink href="/contact">Let’s Talk</ButtonLink>
      </div>
    </article>
  );
}
