import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="mx-auto max-w-5xl px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <p className="font-display text-3xl tracking-[0.12em]">ONE10 STUDIO</p>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin">Inquiries</Link>
            <Link href="/admin/content">Content</Link>
            <Link href="/">View site</Link>
          </nav>
        </div>
        {children}
      </div>
    </div>
  );
}
