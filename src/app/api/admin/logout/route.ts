import { NextResponse } from "next/server";
import { SESSION_COOKIE, cookieIsSecure, readSession, studioHeaderOk } from "@/lib/auth";
import { jsonError, sameOrigin } from "@/lib/http";

export async function POST(req: Request) {
  if (!sameOrigin(req) || !studioHeaderOk(req)) return jsonError("Sign out from the studio page.", 403);
  if (!(await readSession())) return jsonError("Sign in required.", 401);
  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: cookieIsSecure(req),
    path: "/",
    maxAge: 0,
  });
  return response;
}
