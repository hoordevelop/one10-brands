import type { MetadataRoute } from "next";
import { catalog } from "@/content/catalog";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = await getSiteUrl();
  const paths = [
    "/",
    "/about",
    "/services",
    "/work",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    ...catalog.map((item) => `/services/${item.slug}`),
  ];
  return paths.map((path) => ({
    url: path === "/" ? `${base}/` : `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
