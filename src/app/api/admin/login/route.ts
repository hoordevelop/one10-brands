import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  adminPassword,
  cookieIsSecure,
  createSessionToken,
  passwordsMatch,
  sessionCookieOptions,
} from "@/lib/auth";
import { clientIp, hashIp, jsonError, readJson, sameOrigin } from "@/lib/http";
import { logError } from "@/lib/log";
import { rateLimited } from "@/lib/rate";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return jsonError("Sign in from the studio page.", 403);
  const password = adminPassword();
  if (!password) {
    return jsonError("Studio is locked until ADMIN_PASSWORD is set.", 503);
  }
  const body = await readJson(req, 2_000);
  if (!body.ok) return jsonError(body.error, 400);
  const input =
    body.value && typeof body.value === "object" && "password" in body.value
      ? String((body.value as { password: unknown }).password ?? "")
      : "";
  if (input.length < 8 || input.length > 200) {
    return jsonError("That password was not accepted.", 401);
  }
  try {
    if (await rateLimited(hashIp(clientIp(req)), "login")) {
      return jsonError("Too many sign-in attempts. Wait and try again.", 429);
    }
    if (!passwordsMatch(input, password)) {
      return jsonError("That password was not accepted.", 401);
    }
    const response = NextResponse.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
    response.cookies.set(
      SESSION_COOKIE,
      createSessionToken(password),
      sessionCookieOptions(cookieIsSecure(req)),
    );
    return response;
  } catch (error) {
    logError("login", error);
    return jsonError("Studio could not sign you in.", 500);
  }
}
