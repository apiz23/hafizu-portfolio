import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/projects/preview?repo=owner/name
 *
 * Proxies GitHub's social-preview (OpenGraph) image for a repo, server-side,
 * and caches it. This is the same image GitHub shows when you share the repo.
 *
 * Why proxy: requesting many `opengraph.githubassets.com` URLs directly from
 * the browser in a burst gets rate-limited (HTTP 429), which is why the admin
 * thumbnails were falling back. Fetching server-side (optionally with a token,
 * which raises limits) and caching avoids that.
 */

const CACHE_SECONDS = 60 * 60 * 24; // 24h

export async function GET(req: NextRequest) {
  const repo = req.nextUrl.searchParams.get("repo");

  if (!repo || !/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    return NextResponse.json({ error: "Invalid repo" }, { status: 400 });
  }

  const url = `https://opengraph.githubassets.com/1/${repo}`;

  const headers: Record<string, string> = {
    Accept: "image/png,image/*",
    "User-Agent": "hafizu-portfolio",
  };
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    let upstream = await fetch(url, {
      headers,
      next: { revalidate: CACHE_SECONDS },
    });

    // A bad token 401s — retry unauthenticated (public OG images don't need auth).
    if (upstream.status === 401 && token) {
      const { Authorization, ...rest } = headers;
      upstream = await fetch(url, { headers: rest, next: { revalidate: CACHE_SECONDS } });
    }

    if (!upstream.ok) {
      return NextResponse.json(
        { error: `GitHub preview ${upstream.status}` },
        { status: 502 }
      );
    }

    const buf = await upstream.arrayBuffer();
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "image/png",
        "Cache-Control": `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}, immutable`,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch preview" },
      { status: 500 }
    );
  }
}
