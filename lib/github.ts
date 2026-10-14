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
  if (process.env.GITHUB_TOKEN) {
    h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return h;
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

    const res = await fetch(url, { headers: headers(), cache: "no-store" });

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

