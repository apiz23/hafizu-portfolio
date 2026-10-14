import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";
import {
  fetchUserRepos,
  humanizeRepoName,
  repoOgImage,
  toRepoOption,
  type GitHubRepo,
} from "@/lib/github";
import { isAuthorized } from "@/lib/admin-auth";

/** Guard shared by both handlers. Returns an error response or null. */
async function requireAdmin(req: Request) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!process.env.GITHUB_USERNAME) {
    return NextResponse.json(
      { error: "GITHUB_USERNAME is not set" },
      { status: 500 }
    );
  }
  return null;
}

/**
 * GET /api/projects/sync
 * Lists the user's public repos so the admin can pick which to sync.
 * Marks each with whether it's already in the projects table.
 */
export async function GET(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    const repos = await fetchUserRepos(process.env.GITHUB_USERNAME!, {
      includeForks: false,
    });

    const { data: existing, error } = await supabase
      .from("projects")
      .select("github_link")
      .not("github_link", "is", null);
    if (error) throw error;

    const added = new Set((existing ?? []).map((r: any) => r.github_link));

    const list = repos.map((r) => ({
      ...toRepoOption(r),
      alreadyAdded: added.has(r.html_url),
    }));

    return NextResponse.json({ repos: list });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to list repos" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects/sync
 * Body: { repos: string[] }  — GitHub full_names (or html_urls) to sync.
 * Fetches the user's repos, keeps only the selected ones, and upserts them
 * into `projects` keyed by github_link. Curated fields are preserved on rows
 * that already exist.
 */
export async function POST(req: Request) {
  const denied = await requireAdmin(req);
  if (denied) return denied;

  try {
    let selected: string[] = [];
    try {
      const body = await req.json();
      if (Array.isArray(body?.repos)) selected = body.repos;
    } catch {
      // no/invalid body -> nothing selected
    }

    if (selected.length === 0) {
      return NextResponse.json(
        { error: "No repositories selected" },
        { status: 400 }
      );
    }

    const wanted = new Set(selected.map((s) => s.toLowerCase()));
    const all = await fetchUserRepos(process.env.GITHUB_USERNAME!, {
      includeForks: false,
    });

    const matches = (r: GitHubRepo) =>
      wanted.has(r.full_name.toLowerCase()) ||
      wanted.has(r.html_url.toLowerCase());

    const repos = all.filter(matches);

    if (repos.length === 0) {
      return NextResponse.json(
        { error: "None of the selected repositories were found" },
        { status: 404 }
      );
    }

    const { data: existing, error: readError } = await supabase
      .from("projects")
      .select("id, github_link, category, featured, image_src, badges")
      .not("github_link", "is", null);
    if (readError) throw readError;

    const byLink = new Map((existing ?? []).map((r: any) => [r.github_link, r]));

    const toInsert: any[] = [];
    const toUpdate: { id: string; values: any }[] = [];

    for (const repo of repos) {
      const row = byLink.get(repo.html_url);

      const synced = {
        title: humanizeRepoName(repo.name),
        description: repo.description ?? "",
        visit_link: repo.homepage ?? "",
        year: new Date(repo.pushed_at).getFullYear().toString(),
        // Use GitHub's generated social preview as the thumbnail — no upload,
        // no storage, always available for public repos.
        image_src: repoOgImage(repo.full_name),
        badges: Array.from(
          new Set([
            ...(repo.language ? [repo.language] : []),
            ...repo.topics.slice(0, 4),
          ])
        ),
      };

      if (row) {
        const curatedBadges: string[] = Array.isArray(row.badges) ? row.badges : [];
        toUpdate.push({
          id: row.id,
          values: {
            ...synced,
            // Preserve a custom thumbnail if one was uploaded; only backfill
            // the GitHub preview when the row has no image.
            image_src: row.image_src || synced.image_src,
            badges: Array.from(new Set([...curatedBadges, ...synced.badges])),
          },
        });
      } else {
        toInsert.push({
          ...synced,
          github_link: repo.html_url,
          category: "fullstack",
          featured: false,
        });
      }
    }

    let inserted = 0;
    let updated = 0;

    if (toInsert.length) {
      const { error: insertError } = await supabase
        .from("projects")
        .insert(toInsert);
      if (insertError) throw insertError;
      inserted = toInsert.length;
    }

    for (const { id, values } of toUpdate) {
      const { error: updateError } = await supabase
        .from("projects")
        .update(values)
        .eq("id", id);
      if (updateError) throw updateError;
      updated += 1;
    }

    return NextResponse.json({
      ok: true,
      fetched: repos.length,
      inserted,
      updated,
      needsCuration: toInsert.map((r) => r.github_link),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Sync failed" },
      { status: 500 }
    );
  }
}
