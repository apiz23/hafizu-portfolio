"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "hf-admin-token";

/**
 * Shared admin token state, persisted in sessionStorage so unlocking on one
 * admin page unlocks the others for the session. The token is validated
 * server-side against the Supabase `tokens` table.
 */
export function useAdminToken() {
  const [token, setToken] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setToken(saved);
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  const save = useCallback((value: string) => {
    setToken(value);
    try {
      sessionStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
  }, []);

  const clear = useCallback(() => {
    setToken("");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { token, setToken, ready, save, clear };
}

/**
 * Validates an admin token against the server (Supabase `tokens` table).
 * Returns true when accepted.
 */
export async function validateToken(token: string): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Headers that carry the admin token on mutating requests. */
export function adminHeaders(token: string): Record<string, string> {
  return { "x-admin-token": token };
}
