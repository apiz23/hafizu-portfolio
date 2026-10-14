import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Load a local image from /public and return it as a data URI so Satori
 * (next/og) can render it. Cached per process.
 */
let avatarCache: string | null = null;

export function avatarDataUri(): string {
  if (avatarCache) return avatarCache;
  const buf = readFileSync(join(process.cwd(), "public/img/github-avatar.jpg"));
  avatarCache = `data:image/jpeg;base64,${buf.toString("base64")}`;
  return avatarCache;
}

export const BRAND = {
  ink: "#2F1664",
  paper: "#F9F4F2",
  gold: "#EACB49",
  inkDim: "#6B5A8F",
};
