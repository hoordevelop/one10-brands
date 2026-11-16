import type { Metadata } from "next";
import { Big_Shoulders, Outfit } from "next/font/google";
import { connection } from "next/server";
import { headers } from "next/headers";
import { Analytics } from "@/components/analytics";
import { safeId } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const display = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-display-face",
  weight: ["500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body-face",
  weight: ["300", "400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const base = await getSiteUrl();
  const google = safeId(process.env.GOOGLE_SITE_VERIFICATION, /^[A-Za-z0-9_-]{10,120}$/);
  return {
    metadataBase: new URL(base),
    title: {
      default: "One10 Brands Marketing | Digital Growth Partner",
      template: "%s · One10",
    },
    description:
      "Your Digital Growth Partner. From powerful marketing campaigns to high-performing digital experiences, we help businesses grow, connect and succeed.",
    applicationName: "One10 Brands Marketing",
    openGraph: {
      type: "website",
      siteName: "One10 Brands Marketing",
      locale: "en",
    },
    twitter: { card: "summary_large_image" },
    verification: google ? { google } : undefined,
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await connection();
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="en" className={`${display.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <Analytics nonce={nonce} />
      </body>
    </html>
  );
}
