import Link from "next/link";
import { catalog } from "@/content/catalog";
import { about, processSteps, whyPoints } from "@/content/story";
import { JsonLd } from "@/components/json-ld";
import { Counters, HeroGlow, Reveal, Tilt } from "@/components/motion";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { getFaqs, getPortfolio, getPublicContact, getServices, getTestimonials } from "@/lib/content-store";
import { getSiteUrl } from "@/lib/site-url";

export default async function HomePage() {
  const [services, faqs, portfolio, testimonials, siteUrl, contact] = await Promise.all([
    getServices(),
    getFaqs(),
    getPortfolio(),
    getTestimonials(),
    getSiteUrl(),
    getPublicContact(),
  ]);
  const featured = services.slice(0, 4);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "One10 Brands Marketing",
          url: siteUrl,
          description: about.lede,
          areaServed: "Worldwide",
          knowsAbout: catalog.map((item) => item.name),
          ...(contact.emailIsPlaceholder ? {} : { email: contact.email }),
          ...(contact.whatsappIsPlaceholder ? {} : { telephone: `+${contact.whatsappE164}` }),
        }}
      />
      <section className="relative overflow-hidden">
        <HeroGlow />
        <div className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-6xl items-end gap-12 px-5 pt-16 pb-20 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Eyebrow>Digital growth partner</Eyebrow>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(3.4rem,8vw,7.2rem)] leading-[0.84] tracking-tight text-white">
              WE BUILD BRANDS.
              <span className="block text-white">WE CREATE GROWTH.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-mist">
              Your Digital Growth Partner. From powerful marketing campaigns to high-performing digital experiences, we help businesses grow, connect and succeed.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services">Explore Our Services</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Let’s Talk
              </ButtonLink>
            </div>
          </div>
          <div className="relative lg:col-span-4">
            <div className="relative border border-white/10 bg-panel/70 p-6">
              <span className="absolute top-0 left-0 h-8 w-8 border-t border-l border-red" />
              <span className="absolute right-0 bottom-0 h-8 w-8 border-r border-b border-red" />
              <p className="font-display text-[7rem] leading-none text-white/90">10</p>
              <p className="mt-2 text-sm leading-6 text-mist">
                A full-service agency for companies that want the brand, the campaigns, and the systems behind them handled together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-panel/40">
        <div className="marquee-track flex w-max gap-10 py-4">
          {[...catalog, ...catalog].map((item, index) => (
            <span key={`${item.slug}-${index}`} className="font-display text-2xl tracking-[0.18em] text-white/70">
              {item.name}
              <span className="mx-10 text-red">/</span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <Eyebrow>The company</Eyebrow>
          <h2 className="mt-4 font-display text-5xl leading-none text-white sm:text-6xl">
            Marketing with a point of view, and the discipline to ship it.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-mist">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link href="/about" className="mt-8 inline-flex text-sm tracking-[0.16em] text-white uppercase">
            About One10
          </Link>
        </Reveal>
        <Reveal className="lg:col-span-5" delay={0.1}>
          <Counters />
          <p className="mt-6 text-sm leading-6 text-mist">
            These figures describe the offer: twelve service lines and five stages of work. They are not client counts or performance claims.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-white/10 bg-panel/30">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Services</Eyebrow>
              <h2 className="mt-4 font-display text-5xl text-white sm:text-6xl">What we take on</h2>
            </div>
            <ButtonLink href="/services" variant="ghost">
              All services
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {featured.map((service, index) => (
              <Tilt key={service.slug}>
                <Link href={`/services/${service.slug}`} className="group block h-full border border-white/10 bg-ink p-6 transition hover:border-red">
                  <p className="font-display text-3xl text-red">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 font-display text-4xl text-white">{service.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-mist">{service.summary}</p>
                  <span className="mt-6 inline-flex text-xs tracking-[0.18em] text-white uppercase">View service</span>
                </Link>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="mx-auto max-w-6xl px-5 py-24">
        <Eyebrow>Why One10</Eyebrow>
        <h2 className="mt-4 max-w-3xl font-display text-5xl text-white sm:text-6xl">A team you can brief once.</h2>
        <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((point) => (
            <Reveal key={point.title} className="bg-ink p-6">
              <h3 className="font-display text-3xl text-white">{point.title}</h3>
              <p className="mt-3 text-sm leading-7 text-mist">{point.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="process" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Eyebrow>Our process</Eyebrow>
          <h2 className="mt-4 font-display text-5xl text-white sm:text-6xl">Five stages. No mystery middle.</h2>
          <ol className="mt-12 grid gap-6 lg:grid-cols-5">
            {processSteps.map((step) => (
              <li key={step.n} className="border-t border-red pt-5">
                <p className="font-display text-4xl text-white">{step.n}</p>
                <h3 className="mt-3 text-lg text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-mist">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-panel/40">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Portfolio</Eyebrow>
              <h2 className="mt-4 font-display text-5xl text-white">Sample frames, not client claims</h2>
            </div>
            <Link href="/work" className="text-sm tracking-[0.16em] text-white uppercase">
              Our work
            </Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {portfolio.slice(0, 3).map((item) => (
              <article key={item.id} className="border border-white/10 p-6">
                {item.sample ? (
                  <p className="text-[0.68rem] tracking-[0.2em] text-white uppercase">
                    <span className="bg-red px-1.5 py-0.5">Sample</span>
                  </p>
                ) : null}
                <h3 className="mt-3 font-display text-3xl text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-mist">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 py-24">
          <Eyebrow>Client words</Eyebrow>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <blockquote key={item.id} className="border border-white/10 p-6">
                <p className="text-lg leading-8 text-white">“{item.quote}”</p>
                <footer className="mt-4 text-sm text-mist">
                  {item.attribution}
                  {item.role ? ` — ${item.role}` : ""}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-24 lg:grid-cols-2">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 font-display text-5xl text-white">Before you write.</h2>
            <Link href="/faq" className="mt-6 inline-flex text-sm tracking-[0.16em] uppercase">
              All questions
            </Link>
          </div>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.slice(0, 4).map((item) => (
              <details key={item.id} className="group py-4">
                <summary className="cursor-pointer list-none text-lg text-white">{item.question}</summary>
                <p className="pt-3 text-sm leading-7 text-mist">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-20 sm:flex-row sm:items-center">
          <h2 className="max-w-xl font-display text-5xl leading-none text-white sm:text-6xl">
            Tell us what the business needs next.
          </h2>
          <ButtonLink href="/contact">Get Started</ButtonLink>
        </div>
      </section>
    </>
  );
}
