import { randomUUID } from "node:crypto";
import { sql } from "@/lib/db";
import { clientIp, hashIp, jsonError, jsonOk, sameOrigin } from "@/lib/http";
import { logError } from "@/lib/log";
import { rateLimited } from "@/lib/rate";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return jsonError("This form can only be sent from the site.", 403);
  try {
    const ipHash = hashIp(clientIp(req));
    if (await rateLimited(ipHash, "challenge")) {
      return jsonError("Too many attempts. Wait a little and try again.", 429);
    }
    await sql("delete from form_challenges where created_at < now() - interval '1 day'");
    const id = randomUUID();
    await sql("insert into form_challenges (id) values ($1)", [id]);
    return jsonOk({ challengeId: id });
  } catch (error) {
    logError("challenge", error);
    return jsonError("The form could not be prepared. Refresh and try again.", 500);
  }
}
