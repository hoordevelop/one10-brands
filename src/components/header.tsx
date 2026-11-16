"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mark } from "@/components/ui";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPath(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="shrink-0">
          <Mark />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm tracking-wide ${active ? "text-white" : "text-mist hover:text-white"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center bg-red px-3 text-[0.68rem] font-semibold tracking-[0.14em] whitespace-nowrap text-white uppercase shadow-[0_0_24px_rgba(215,25,32,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(215,25,32,0.4)] sm:px-5 sm:text-[0.72rem] sm:tracking-[0.16em]"
          >
            Get Started
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border border-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="relative block h-3 w-5" aria-hidden>
              <span className={`absolute left-0 h-px w-5 bg-white transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute top-1.5 left-0 h-px w-5 bg-white transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-5 bg-white transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="fixed inset-x-0 top-[4.5rem] bottom-0 z-50 overflow-y-auto bg-ink px-6 py-8 lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
          >
            <ul className="flex flex-col gap-2">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduce ? 0 : index * 0.05 }}
                >
                  <Link href={link.href} className="block py-3 font-display text-5xl tracking-wide text-white">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
