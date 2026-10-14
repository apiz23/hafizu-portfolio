"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import {
  Upload,
  Loader2,
  Github,
  Star,
  ArrowLeft,
  Pencil,
  Trash2,
  Plus,
  RefreshCw,
  Search,
  X,
} from "lucide-react";

import AdminGate from "@/components/admin-gate";
import EditProjectDialog, {
  type EditableProject,
} from "@/components/edit-project-dialog";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { adminHeaders } from "@/lib/use-admin-secret";

const categories = [
  { value: "webapp", label: "Web App" },
  { value: "fullstack", label: "Full Stack" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "mobile", label: "Mobile App" },
];

const fieldClass = "bg-background border-edge focus-visible:border-hover rounded-[2px]";

type RepoOption = {
  full_name: string;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  pushed_at: string;
  alreadyAdded: boolean;
};

function AdminInner({ token }: { token: string }) {
  const router = useRouter();

  /* ---------------- projects list ---------------- */
  const [projects, setProjects] = useState<EditableProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editing, setEditing] = useState<EditableProject | null>(null);

  const loadProjects = useCallback(async () => {
    setLoadingProjects(true);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to load projects");
      setProjects(await res.json());
    } catch (err: any) {
      toast.error(err.message || "Failed to load projects");
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const onDelete = async (p: EditableProject) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    setDeletingId(p.id);
    try {
      const res = await fetch(`/api/projects/${p.id}`, {
        method: "DELETE",
        headers: adminHeaders(token),
      });
      if (res.status === 401) throw new Error("Session expired — reload");
      if (!res.ok) {
        const r = await res.json();
        throw new Error(r.error);
      }
      setProjects((prev) => prev.filter((x) => x.id !== p.id));
      toast.success("Project deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  /* ---------------- github picker ---------------- */
  const [pickerOpen, setPickerOpen] = useState(false);
  const [repos, setRepos] = useState<RepoOption[]>([]);
  const [reposLoading, setReposLoading] = useState(false);
  const [selectedRepos, setSelectedRepos] = useState<Set<string>>(new Set());
  const [repoQuery, setRepoQuery] = useState("");
  const [syncing, setSyncing] = useState(false);

  const openPicker = async () => {
    setPickerOpen(true);
    setRepoQuery("");
    setSelectedRepos(new Set());
    setReposLoading(true);
    try {
      const res = await fetch("/api/projects/sync", {
        headers: adminHeaders(token),
      });
      const result = await res.json();
      if (res.status === 401) throw new Error("Session expired — reload");
      if (!res.ok) throw new Error(result.error);
      setRepos(result.repos as RepoOption[]);
    } catch (err: any) {
      toast.error(err.message || "Failed to load repos");
      setPickerOpen(false);
    } finally {
      setReposLoading(false);
    }
  };

  const toggleRepo = (fullName: string) => {
    setSelectedRepos((prev) => {
      const next = new Set(prev);
      if (next.has(fullName)) next.delete(fullName);
      else next.add(fullName);
      return next;
    });
  };

  const syncSelected = async () => {
    if (selectedRepos.size === 0) {
      toast.error("Select at least one repository");
      return;
    }
    setSyncing(true);
    try {
      const res = await fetch("/api/projects/sync", {
        method: "POST",
        headers: { ...adminHeaders(token), "content-type": "application/json" },
        body: JSON.stringify({ repos: Array.from(selectedRepos) }),
      });
      const result = await res.json();
      if (res.status === 401) throw new Error("Session expired — reload");
      if (!res.ok) throw new Error(result.error);

      toast.success(
        `Synced ${result.fetched} repo(s) — ${result.inserted} new, ${result.updated} updated`
      );
      setPickerOpen(false);
      await loadProjects();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "GitHub sync failed");
    } finally {
      setSyncing(false);
    }
  };

  const filteredRepos = repos.filter((r) => {
    const q = repoQuery.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      (r.description ?? "").toLowerCase().includes(q) ||
      (r.language ?? "").toLowerCase().includes(q)
    );
  });

  /* ---------------- add form ---------------- */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [visitLink, setVisitLink] = useState("");
  const [category, setCategory] = useState("webapp");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [featured, setFeatured] = useState(false);
  const [badges, setBadges] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onFile = (f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setGithubLink("");
    setVisitLink("");
    setCategory("webapp");
    setYear(new Date().getFullYear().toString());
    setFeatured(false);
    setBadges("");
    setFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
  };

  const onAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("github_link", githubLink);
      formData.append("visit_link", visitLink);
      formData.append("category", category);
      formData.append("year", year);
      formData.append("featured", String(featured));
      formData.append("badges", badges);
      if (file) formData.append("file", file);

      const interval = setInterval(
        () => setUploadProgress((p) => Math.min(p + 10, 90)),
        200
      );

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: adminHeaders(token),
        body: formData,
      });

      clearInterval(interval);
      setUploadProgress(100);

      const result = await res.json();
      if (res.status === 401) throw new Error("Session expired — reload");
      if (!res.ok) throw new Error(result.error);

      toast.success("Project added");
      resetForm();
      await loadProjects();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to add project");
      setUploadProgress(0);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to site
          </Link>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-foreground">
                <Logo size={40} label={null} />
              </span>
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                  Admin
                </p>
                <h1
                  className="font-display uppercase tracking-[-0.02em] text-foreground"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  Projects
                </h1>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={openPicker}
              className="gap-2 rounded-[2px] font-mono text-[12px] uppercase tracking-[0.08em]"
            >
              <Github className="h-3.5 w-3.5" />
              Sync from GitHub
            </Button>
          </div>
        </div>

        {/* Project list as Cards */}
        <section className="mb-14">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground">
              Existing ({loadingProjects ? "…" : projects.length})
            </h2>
          </div>

          {loadingProjects ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : projects.length === 0 ? (
            <p className="border border-edge py-20 text-center font-mono text-[13px] text-muted-foreground">
              No projects yet. Add one below or sync from GitHub.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <Card
                  key={p.id}
                  className="flex flex-col overflow-hidden rounded-[2px] border-edge bg-surface-alt shadow-none"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-edge bg-background">
                    {p.image_src ? (
                      <Image
                        src={p.image_src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover"
                        unoptimized={
                          p.image_src.includes("opengraph.githubassets.com")
                        }
                      />
                    ) : (
                      <span className="grid h-full place-items-center font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                        no image
                      </span>
                    )}
                    {p.featured && (
                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-accent-foreground">
                        <Star className="h-3 w-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>

                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="truncate font-display text-xl tracking-[-0.01em]">
                      {p.title}
                    </CardTitle>
                    <CardDescription className="font-mono text-[11px] uppercase tracking-[0.08em]">
                      {p.category}
                      {p.year ? ` · ${p.year}` : ""}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 p-4 pt-2">
                    <p className="line-clamp-2 text-[13px] text-muted-foreground">
                      {p.description || "No description."}
                    </p>
                  </CardContent>

                  <CardFooter className="gap-2 border-t border-edge p-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditing(p)}
                      className="flex-1 gap-1.5 rounded-[2px] font-mono text-[11px] uppercase tracking-[0.08em]"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(p)}
                      disabled={deletingId === p.id}
                      className="h-8 w-8 rounded-[2px] text-destructive hover:text-destructive"
                      aria-label="Delete"
                    >
                      {deletingId === p.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Add project */}
        <section>
          <h2 className="mb-4 flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground">
            <Plus className="h-4 w-4" />
            Add Project
          </h2>
          <Card className="rounded-[2px] border-edge bg-surface-alt shadow-none">
            <form onSubmit={onAdd}>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={fieldClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className={fieldClass}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Link</Label>
                    <Input
                      id="github"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="visit">Live URL</Label>
                    <Input
                      id="visit"
                      value={visitLink}
                      onChange={(e) => setVisitLink(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className={fieldClass}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badges">Badges (comma separated)</Label>
                  <Input
                    id="badges"
                    value={badges}
                    onChange={(e) => setBadges(e.target.value)}
                    className={fieldClass}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="featured"
                    checked={featured}
                    onCheckedChange={(v) => setFeatured(v === true)}
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Featured project
                  </Label>
                </div>

                {/* Image */}
                <div className="space-y-2">
                  <Label>Thumbnail (optional)</Label>
                  <div className="flex items-start gap-4">
                    <label
                      className={`flex h-24 w-32 cursor-pointer flex-col items-center justify-center border-2 border-dashed bg-background transition-colors ${
                        dragActive ? "border-hover" : "border-edge"
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                        onFile(e.dataTransfer.files?.[0] ?? null);
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                      />
                      <Upload className="mb-1 h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-[10px] uppercase text-muted-foreground">
                        Drag or click
                      </span>
                    </label>
                    {previewUrl && (
                      <div className="relative h-24 w-32 overflow-hidden border border-edge">
                        <Image
                          src={previewUrl}
                          alt=""
                          fill
                          sizes="128px"
                          className="object-cover"
                          unoptimized
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setPreviewUrl(null);
                          }}
                          className="absolute right-1 top-1 grid h-5 w-5 place-items-center bg-background/80"
                          aria-label="Remove image"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    Leave empty for GitHub-synced projects — they use the repo
                    preview automatically.
                  </p>
                </div>

                {saving && uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-center font-mono text-[11px] text-muted-foreground">
                      Uploading… {uploadProgress}%
                    </p>
                  </div>
                )}
              </CardContent>

              <CardFooter className="justify-end border-t border-edge p-4">
                <Button
                  type="submit"
                  disabled={saving}
                  className="gap-2 rounded-[2px] font-mono text-[12px] uppercase tracking-[0.08em]"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  {saving ? "Publishing…" : "Add Project"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </section>
      </div>

      {/* Edit dialog */}
      <EditProjectDialog
        project={editing}
        token={token}
        open={!!editing}
        onOpenChange={(open) => {
          if (!open) setEditing(null);
        }}
        onSaved={(updated) => {
          setProjects((prev) =>
            prev.map((p) => (p.id === updated.id ? { ...p, ...updated } : p))
          );
          router.refresh();
        }}
      />

      {/* GitHub repo picker */}
      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent className="max-w-2xl rounded-none border-edge bg-background p-0">
          <DialogHeader className="border-b border-edge px-6 py-4">
            <DialogTitle className="font-mono text-[13px] font-normal uppercase tracking-[0.1em] text-muted-foreground">
              Sync from GitHub
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Pick the repositories to add to your portfolio.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={repoQuery}
                onChange={(e) => setRepoQuery(e.target.value)}
                placeholder="Filter repositories…"
                className={`${fieldClass} pl-9`}
              />
            </div>

            {reposLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredRepos.length === 0 ? (
              <p className="py-16 text-center font-mono text-[13px] text-muted-foreground">
                {repos.length === 0
                  ? "No public repositories found."
                  : "No repositories match your filter."}
              </p>
            ) : (
              <div className="max-h-[52vh] overflow-y-auto border border-edge">
                {filteredRepos.map((repo) => {
                  const checked = selectedRepos.has(repo.full_name);
                  return (
                    <button
                      type="button"
                      key={repo.full_name}
                      onClick={() => toggleRepo(repo.full_name)}
                      className={`flex w-full items-start gap-3 border-b border-edge px-4 py-3 text-left transition-colors last:border-b-0 ${
                        checked ? "bg-hover/[0.06]" : "hover:bg-surface-alt"
                      }`}
                    >
                      <Checkbox
                        checked={checked}
                        className="pointer-events-none mt-0.5"
                        tabIndex={-1}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate font-mono text-[13px] text-foreground">
                            {repo.name}
                          </span>
                          {repo.alreadyAdded && (
                            <span className="shrink-0 border border-edge px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                              added
                            </span>
                          )}
                          {repo.stars > 0 && (
                            <span className="inline-flex shrink-0 items-center gap-0.5 font-mono text-[11px] text-muted-foreground">
                              <Star className="h-3 w-3" />
                              {repo.stars}
                            </span>
                          )}
                        </span>
                        {repo.description && (
                          <span className="mt-0.5 block truncate text-[13px] text-muted-foreground">
                            {repo.description}
                          </span>
                        )}
                        <span className="mt-1 flex flex-wrap items-center gap-1.5">
                          {repo.language && (
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {repo.language}
                            </span>
                          )}
                          {repo.topics.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground/70"
                            >
                              #{t}
                            </span>
                          ))}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <DialogFooter className="flex items-center justify-between border-t border-edge px-6 py-4 sm:justify-between">
            <span className="font-mono text-[12px] text-muted-foreground">
              {selectedRepos.size} selected
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPickerOpen(false)}
                className="rounded-[2px] font-mono text-[12px] uppercase tracking-[0.08em]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={syncSelected}
                disabled={syncing || selectedRepos.size === 0}
                className="gap-2 rounded-[2px] font-mono text-[12px] uppercase tracking-[0.08em]"
              >
                {syncing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {syncing ? "Syncing…" : "Sync selected"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function AdminProjectsPage() {
  return <AdminGate>{(token) => <AdminInner token={token} />}</AdminGate>;
}
