import "server-only";
import { headers } from "next/headers";

export async function getSiteUrl() {
  const configured = process.env.SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = (h.get("x-forwarded-proto") ?? "http").split(",")[0]?.trim() || "http";
  if (!host) return "http://127.0.0.1:3000";
  return `${proto}://${host}`;
}
