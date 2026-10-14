import supabase from "@/lib/supabase";

/**
 * Server-side admin token check.
 *
 * Tokens live in the Supabase `tokens` table (columns: token, created_at,
 * expires_at). This runs on the server only — the client never reads the
 * table directly, so a leaked anon key cannot enumerate admin tokens.
 *
 * A row is valid when:
 *   - token matches exactly, AND
 *   - expires_at is null, or expires_at is in the future.
 */
export async function isValidAdminToken(token: string | null | undefined): Promise<boolean> {
  if (!token || typeof token !== "string") return false;

  const { data, error } = await supabase
    .from("tokens")
    .select("token, expires_at")
    .eq("token", token)
    .maybeSingle();

  if (error || !data) return false;

  if (data.expires_at) {
    const expires = new Date(data.expires_at).getTime();
    if (Number.isFinite(expires) && expires < Date.now()) return false;
  }

  return true;
}

/** Convenience: read the token from a request header and validate it. */
export async function isAuthorized(req: Request): Promise<boolean> {
  const token =
    req.headers.get("x-admin-token") ||
    // Accept the legacy header name too, so older clients keep working.
    req.headers.get("x-admin-secret");
  return isValidAdminToken(token);
}
