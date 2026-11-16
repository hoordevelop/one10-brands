import "server-only";
import { randomUUID } from "node:crypto";
import { sql } from "@/lib/db";

export async function rateLimited(ipHash: string, kind: "contact" | "challenge" | "login") {
  await sql("delete from rate_events where created_at < now() - interval '2 days'");
  const query =
    kind === "login"
      ? "select count(*)::int as count from rate_events where ip_hash = $1 and kind = $2 and created_at > now() - interval '15 minutes'"
      : "select count(*)::int as count from rate_events where ip_hash = $1 and kind = $2 and created_at > now() - interval '1 hour'";
  const limit = kind === "login" ? 8 : kind === "contact" ? 5 : 30;
  const rows = await sql<{ count: number }>(query, [ipHash, kind]);
  if (Number(rows[0]?.count ?? 0) >= limit) return true;
  await sql("insert into rate_events (id, ip_hash, kind) values ($1, $2, $3)", [
    randomUUID(),
    ipHash,
    kind,
  ]);
  return false;
}
