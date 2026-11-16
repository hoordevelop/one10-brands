import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

export function safeId(value: string | undefined, pattern: RegExp) {
  const trimmed = value?.trim() ?? "";
  return pattern.test(trimmed) ? trimmed : "";
}

export async function pageMeta(input: {
  title: string;
  description: string;
  path: string;
}): Promise<Metadata> {
  const base = await getSiteUrl();
  const url = new URL(input.path, `${base}/`).toString();
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${input.title} · One10`,
      description: input.description,
      url,
      siteName: "One10 Brands Marketing",
      type: "website",
      locale: "en",
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} · One10`,
      description: input.description,
    },
  };
}
