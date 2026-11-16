import "server-only";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "one10_studio";
const MAX_AGE = 60 * 60 * 24 * 12;

export function adminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

export function passwordsMatch(input: string, expected: string) {
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

function sign(secret: string, payload: string) {
  return createHash("sha256").update(`${secret}:${payload}`).digest("hex");
}

export function createSessionToken(secret: string) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const nonce = randomBytes(16).toString("hex");
  const payload = `${exp}.${nonce}`;
  return `${payload}.${sign(secret, payload)}`;
}

export function sessionCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: MAX_AGE,
  };
}

export function cookieIsSecure(req: Request) {
  const forwarded = req.headers.get("x-forwarded-proto");
  if (forwarded) return forwarded.split(",")[0]?.trim() === "https";
  const host = req.headers.get("host") ?? "";
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) return false;
  return process.env.NODE_ENV === "production";
}

export function verifySessionToken(token: string, secret: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expRaw, nonce, sig] = parts;
  if (!expRaw || !nonce || !sig) return false;
  if (!/^\d+$/.test(expRaw) || !/^[a-f0-9]+$/.test(nonce) || !/^[a-f0-9]+$/.test(sig)) {
    return false;
  }
  const exp = Number(expRaw);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  const expected = sign(secret, `${expRaw}.${nonce}`);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function readSession() {
  const secret = adminPassword();
  if (!secret) return false;
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifySessionToken(token, secret);
}

export function studioHeaderOk(req: Request) {
  return req.headers.get("x-one10-admin") === "1";
}
