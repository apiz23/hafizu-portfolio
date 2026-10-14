import { NextResponse } from "next/server";
import { isValidAdminToken } from "@/lib/admin-auth";

/**
 * POST /api/admin/verify
 * Body: { token: string }
 * Checks the token against the Supabase `tokens` table. Returns 200 when valid,
 * 401 otherwise. The client uses this to unlock admin pages.
 */
export async function POST(req: Request) {
  let token = "";
  try {
    const body = await req.json();
    token = (body?.token ?? "").toString();
  } catch {
    // fall through with empty token
  }

  const ok = await isValidAdminToken(token);
  return NextResponse.json({ ok }, { status: ok ? 200 : 401 });
}
