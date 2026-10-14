"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Loader2, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import { adminHeaders } from "@/lib/use-admin-secret";
import { normalizeCategory, PROJECT_CATEGORIES } from "@/lib/utils";

export type EditableProject = {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  featured: boolean;
  image_src: string;
  github_link: string;
  visit_link: string;
  badges: string[];
};

const fieldClass =
  "bg-background border-edge focus-visible:border-hover rounded-[2px]";

export default function EditProjectDialog({
  project,
  token,
  open,
  onOpenChange,
  onSaved,
}: {
  project: EditableProject | null;
  token: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (updated: EditableProject) => void;
}) {
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [visitLink, setVisitLink] = useState("");
  const [category, setCategory] = useState("engineering");
  const [year, setYear] = useState("");
  const [featured, setFeatured] = useState(false);
  const [badges, setBadges] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Load the row into local state whenever the dialog opens for a project.
  useEffect(() => {
    if (!open || !project) return;
    setTitle(project.title ?? "");
    setDescription(project.description ?? "");
    setGithubLink(project.github_link ?? "");
    setVisitLink(project.visit_link ?? "");
    setCategory(normalizeCategory(project.category));
    setYear(project.year ?? "");
    setFeatured(!!project.featured);
    setBadges(Array.isArray(project.badges) ? project.badges.join(", ") : "");
    setImageSrc(project.image_src ?? "");
    setFile(null);
    setPreviewUrl(null);
  }, [open, project]);

  const onFile = (f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
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

      const res = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: adminHeaders(token),
        body: formData,
      });
      const result = await res.json();
      if (res.status === 401) throw new Error("Session expired — reload");
      if (!res.ok) throw new Error(result.error);

      toast.success("Project updated");
      onSaved(result as EditableProject);
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const shownImage = previewUrl || imageSrc;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-none border-edge bg-background p-0">
        <DialogHeader className="border-b border-edge px-6 py-4">
          <DialogTitle className="font-mono text-[13px] font-normal uppercase tracking-[0.1em] text-muted-foreground">
            Edit Project
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {project?.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSave}>
          <div className="space-y-5 px-6 py-5">
            <div className="space-y-2">
              <Label htmlFor="e-title">Title</Label>
              <Input
                id="e-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="e-desc">Description</Label>
              <Textarea
                id="e-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={fieldClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="e-gh">GitHub Link</Label>
                <Input
                  id="e-gh"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="e-live">Live URL</Label>
                <Input
                  id="e-live"
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
                    {PROJECT_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="e-year">Year</Label>
                <Input
                  id="e-year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="e-badges">Badges (comma separated)</Label>
              <Input
                id="e-badges"
                value={badges}
                onChange={(e) => setBadges(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                id="e-featured"
                checked={featured}
                onCheckedChange={(v) => setFeatured(v === true)}
              />
              <Label htmlFor="e-featured" className="cursor-pointer">
                Featured project
              </Label>
            </div>

            <div className="space-y-2">
              <Label>Thumbnail</Label>
              <div className="flex items-start gap-4">
                <label
                  className="flex h-24 w-32 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-edge bg-background transition-colors hover:border-hover"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
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
                    Upload
                  </span>
                </label>
                {shownImage && (
                  <div className="relative h-24 w-32 overflow-hidden border border-edge">
                    <Image
                      src={shownImage}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover"
                      unoptimized={
                        shownImage.startsWith("blob:") ||
                        shownImage.includes("opengraph.githubassets.com")
                      }
                    />
                    {file && (
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setPreviewUrl(null);
                        }}
                        className="absolute right-1 top-1 grid h-5 w-5 place-items-center bg-background/80"
                        aria-label="Remove new image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="flex items-center justify-end gap-2 border-t border-edge px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-[2px] font-mono text-[12px] uppercase tracking-[0.08em]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="gap-2 rounded-[2px] font-mono text-[12px] uppercase tracking-[0.08em]"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
