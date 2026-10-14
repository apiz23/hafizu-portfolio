"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminToken, validateToken } from "@/lib/use-admin-secret";

/**
 * Renders an unlock screen until a valid admin token is entered, then renders
 * its children with the token passed through. The token is checked server-side
 * against the Supabase `tokens` table.
 */
export default function AdminGate({
  children,
}: {
  children: (token: string) => React.ReactNode;
}) {
  const { token, setToken, ready, save, clear } = useAdminToken();
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const probed = useRef(false);

  // Auto-unlock when a token is already stored for this session.
  useEffect(() => {
    if (!ready || probed.current || !token) return;
    probed.current = true;
    validateToken(token).then((ok) => {
      if (ok) setUnlocked(true);
      else clear();
    });
  }, [ready, token, clear]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setChecking(true);
    setError("");
    const ok = await validateToken(token);
    setChecking(false);
    if (ok) {
      save(token);
      setUnlocked(true);
    } else {
      setError("Incorrect token");
    }
  };

  if (unlocked) return <>{children(token)}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm border border-edge p-6">
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground mb-1">
          Access
        </p>
        <h1 className="font-display uppercase tracking-[-0.02em] text-foreground text-2xl mb-1">
          Admin Access
        </h1>
        <p className="text-sm text-muted-foreground mb-5">
          Enter your admin token to continue.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            autoFocus
            className="rounded-[2px]"
          />
          {error && (
            <p className="font-mono text-[12px] text-destructive">{error}</p>
          )}
          <Button
            type="submit"
            disabled={checking}
            className="w-full rounded-[2px] font-mono text-[12px] uppercase tracking-[0.08em]"
          >
            {checking ? "Checking…" : "Unlock"}
          </Button>
        </form>
      </div>
    </div>
  );
}
