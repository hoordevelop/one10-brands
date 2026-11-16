import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export function jsonError(message: string, status: number, extra?: Record<string, unknown>) {
  return NextResponse.json(
    { ok: false, error: message, ...extra },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export function jsonOk(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(
    { ok: true, ...body },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function hostName(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    return new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`).hostname.toLowerCase();
  } catch {
    return "";
  }
}

export function sameOrigin(req: Request) {
  // Browsers set this and pages cannot forge it. The published host header
  // is often an internal proxy name, so a raw host compare rejects the real site.
  const site = req.headers.get("sec-fetch-site");
  if (site === "same-origin") return true;
  if (site === "cross-site" || site === "same-site") return false;

  const origin = req.headers.get("origin");
  if (!origin) return false;
  const originHost = hostName(origin);
  if (!originHost) return false;
  const seen = [
    req.headers.get("host"),
    req.headers.get("x-forwarded-host"),
    req.headers.get("x-original-host"),
  ];
  try {
    seen.push(new URL(req.url).host);
  } catch {
    // req.url can be relative inside the runtime.
  }
  for (const value of seen) {
    if (!value) continue;
    for (const part of value.split(",")) {
      if (hostName(part) === originHost) return true;
    }
  }
  return false;
}

export function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return ip.slice(0, 80);
}

export function hashIp(ip: string) {
  return createHash("sha256").update(`one10-rate-v1:${ip}`).digest("hex");
}

export async function readJson(req: Request, max = 30_000) {
  const type = req.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) {
    return { ok: false as const, error: "Send JSON." };
  }
  const text = await req.text();
  if (text.length > max) return { ok: false as const, error: "That submission is too large." };
  try {
    return { ok: true as const, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false as const, error: "That submission could not be read." };
  }
}
