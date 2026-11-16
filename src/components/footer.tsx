import Link from "next/link";
import { catalog } from "@/content/catalog";
import type { PublicContact } from "@/lib/content-store";
import { Mark, Placeholder } from "@/components/ui";

export function Footer({ contact }: { contact: PublicContact }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Mark />
          <p className="mt-6 max-w-sm text-sm leading-7 text-mist">
            One10 Brands Marketing plans and builds the campaigns, sites, and systems that help a company grow.
          </p>
        </div>
        <div className="md:col-span-4">
          <p className="text-[0.72rem] tracking-[0.22em] text-mist uppercase">Services</p>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {catalog.map((item) => (
              <li key={item.slug}>
                <Link href={`/services/${item.slug}`} className="text-sm text-white/80 hover:text-white">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-[0.72rem] tracking-[0.22em] text-mist uppercase">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white text-white/80">About</Link></li>
            <li><Link href="/work" className="hover:text-white text-white/80">Our Work</Link></li>
            <li><Link href="/faq" className="hover:text-white text-white/80">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white text-white/80">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white text-white/80">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white text-white/80">Terms</Link></li>
            <li><Link href="/admin" className="hover:text-white text-white/80">Studio</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-[0.72rem] tracking-[0.22em] text-mist uppercase">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a className="hover:text-white" href={`https://wa.me/${contact.whatsappE164}`}>
                WhatsApp
                {contact.whatsappIsPlaceholder ? <Placeholder>Placeholder</Placeholder> : null}
              </a>
            </li>
            <li>
              <a className="hover:text-white" href={`mailto:${contact.email}`}>
                {contact.email}
                {contact.emailIsPlaceholder ? <Placeholder>Placeholder</Placeholder> : null}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-[0.72rem] tracking-[0.22em] text-mist uppercase">Social</p>
          {contact.socials.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm">
              {contact.socials.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-mist">Profiles are not connected yet.</p>
          )}
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-mist">
        © {year} One10 Brands Marketing. All rights reserved.
      </div>
    </footer>
  );
}
