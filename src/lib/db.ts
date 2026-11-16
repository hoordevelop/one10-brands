import "server-only";
import { readdir, readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";
import pg from "pg";

const databaseUrl = process.env.DATABASE_URL?.trim() ?? "";

type DbGlobals = { one10Pool?: pg.Pool; one10Local?: Promise<PGlite> };
const globals = globalThis as unknown as DbGlobals;

export async function sql<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  if (databaseUrl !== "") {
    globals.one10Pool ??= new pg.Pool({ connectionString: databaseUrl, max: 5 });
    return (await globals.one10Pool.query(text, params)).rows as T[];
  }
  globals.one10Local ??= startLocal().catch((error: unknown) => {
    globals.one10Local = undefined;
    throw error;
  });
  return (await (await globals.one10Local).query<T>(text, params)).rows;
}

async function startLocal(): Promise<PGlite> {
  const db = new PGlite();
  const files = (await readdir("migrations").catch(() => []))
    .filter((f) => f.endsWith(".sql"))
    .sort();
  for (const file of files) {
    await db.exec(await readFile(`migrations/${file}`, "utf8"));
  }
  return db;
}
