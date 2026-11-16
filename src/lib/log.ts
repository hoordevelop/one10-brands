export function logError(scope: string, error: unknown) {
  const message = error instanceof Error ? error.message : "unknown error";
  const redacted = message.replace(/postgres(?:ql)?:\/\/\S+/gi, "[redacted]");
  console.error(`[one10] ${scope}: ${redacted.slice(0, 400)}`);
}
