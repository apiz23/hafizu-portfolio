/**
 * Server-only GitHub helpers. Never import this from a client component —
 * the token must stay on the server.
 */

const GITHUB_API = "https://api.github.com";

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string;
  created_at: string;
  updated_at: string;
};

function headers(): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "hafizu-portfolio",
  };
  // Optional: works without a token for public repos, but raises rate limits
  // (60/hr -> 5000/hr) and is required if you ever include private repos.
  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    h.Authorization = `Bearer ${token}`;
  }
  return h;
}

/**
 * A repo is rendered with a preview thumbnail. Public repos always have a
 * GitHub-generated social preview image (renders name/owner/stars/description),
 * so we use that as the default preview — no upload or storage needed.
 */
export function repoPreviewImage(fullName: string): string {
  return `https://opengraph.githubassets.com/1/${fullName}`;
}

/**
 * The repo owner's avatar. Always available and cached — used as a reliable
 * fallback when the GitHub social-preview image is rate-limited (429) or
 * otherwise unavailable.
 */
export function repoOwnerAvatar(fullName: string): string {
  const owner = fullName.split("/")[0];
  return `https://github.com/${owner}.png?size=80`;
}

/** Bare repo shape for the admin picker (preview metadata included). */
export function toRepoOption(r: GitHubRepo) {
  return {
    full_name: r.full_name,
    name: r.name,
    html_url: r.html_url,
    description: r.description,
    language: r.language,
    topics: r.topics.slice(0, 5),
    stars: r.stargazers_count,
    forks: r.forks_count,
    homepage: r.homepage,
    pushed_at: r.pushed_at,
    // Preview metadata — used by the admin picker and as the project thumbnail.
    preview_image: repoPreviewImage(r.full_name),
    owner_avatar: repoOwnerAvatar(r.full_name),
  };
}

/**
 * Fetch all repos for a user, paginating until exhausted.
 *
 * Filtering layers:
 *  - private repos are always excluded (public portfolio only)
 *  - forks excluded unless `includeForks`
 *  - if `topic` is set, ONLY repos carrying that GitHub topic are returned,
 *    so you control the portfolio by tagging repos on GitHub.
 */
export async function fetchUserRepos(
  username: string,
  {
    includeForks = false,
    perPage = 100,
    topic,
  }: { includeForks?: boolean; perPage?: number; topic?: string } = {}
): Promise<GitHubRepo[]> {
  const all: GitHubRepo[] = [];
  let page = 1;

  while (true) {
    const url = `${GITHUB_API}/users/${encodeURIComponent(
      username
    )}/repos?per_page=${perPage}&page=${page}&sort=pushed&type=owner`;

    let res = await fetch(url, { headers: headers(), cache: "no-store" });

    // A bad/expired GITHUB_TOKEN returns 401 "Bad credentials". Rather than
    // failing the whole sync, retry unauthenticated so public repos still work
    // (rate-limited, but functional).
    if (res.status === 401 && process.env.GITHUB_TOKEN) {
      const h = headers();
      delete h.Authorization;
      res = await fetch(url, { headers: h, cache: "no-store" });
    }

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`GitHub API ${res.status}: ${body.slice(0, 200)}`);
    }

    const batch = (await res.json()) as GitHubRepo[];
    if (batch.length === 0) break;

    all.push(...batch);
    if (batch.length < perPage) break;
    page += 1;
    if (page > 10) break; // hard safety cap (1000 repos)
  }

  return all.filter(
    (r) =>
      !r.private &&
      (includeForks || !r.fork) &&
      (!topic || r.topics.map((t) => t.toLowerCase()).includes(topic.toLowerCase()))
  );
}

/** Turn "my-cool_repo" into "My Cool Repo". */
export function humanizeRepoName(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * GitHub's auto-generated social preview image for a repo. Public repos always
 * have one; it renders name, owner, stars, forks and description. We store this
 * as the project thumbnail instead of uploading anything to storage.
 */
export function repoOgImage(fullName: string): string {
  return `https://opengraph.githubassets.com/1/${fullName}`;
}

/** Derive "owner/repo" from a GitHub repo URL. Returns null if it can't. */
export function fullNameFromUrl(url: string): string | null {
  const m = url.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!m) return null;
  return `${m[1]}/${m[2].replace(/\.git$/, "")}`;
}

