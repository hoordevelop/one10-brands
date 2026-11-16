import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Intro, Particles } from "@/components/motion";
import { getPublicContact } from "@/lib/content-store";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const contact = await getPublicContact();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[90] focus:bg-red focus:px-3 focus:py-2">
        Skip to content
      </a>
      <Intro />
      <Particles />
      <div className="grain" aria-hidden />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer contact={contact} />
      </div>
    </>
  );
}
