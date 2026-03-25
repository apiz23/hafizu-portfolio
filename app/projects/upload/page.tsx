"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Loader2,
  CheckCircle,
  Github,
  Globe,
  Calendar,
  Tag,
  Star,
  ArrowLeft,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

// Import missing icons
import { Code, Layout, Server, Smartphone } from "lucide-react";

const categories = [
  { value: "webapp", label: "Web App", icon: Globe, color: "blue" },
  { value: "fullstack", label: "Full Stack", icon: Code, color: "purple" },
  { value: "frontend", label: "Frontend", icon: Layout, color: "green" },
  { value: "backend", label: "Backend", icon: Server, color: "orange" },
  { value: "mobile", label: "Mobile App", icon: Smartphone, color: "red" },
];

export default function UploadProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [visitLink, setVisitLink] = useState("");
  const [category, setCategory] = useState("webapp");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [featured, setFeatured] = useState(false);
  const [badges, setBadges] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    } else if (description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (!githubLink.trim()) {
      newErrors.github_link = "GitHub link is required";
    } else if (!isValidUrl(githubLink)) {
      newErrors.github_link = "Please enter a valid URL";
    }

    if (visitLink && !isValidUrl(visitLink)) {
      newErrors.visit_link = "Please enter a valid URL";
    }

    if (!category) {
      newErrors.category = "Please select a category";
    }

    if (year && (year.length !== 4 || isNaN(Number(year)))) {
      newErrors.year = "Please enter a valid year";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Invalid file type", {
          description: "Please upload an image file (PNG, JPG, GIF)",
        });
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Image size must be less than 10MB",
        });
        return;
      }
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);

      toast.success("Image uploaded", {
        description: "Your thumbnail has been added successfully",
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      if (droppedFile.size > 10 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Image size must be less than 10MB",
        });
        return;
      }
      setFile(droppedFile);
      const url = URL.createObjectURL(droppedFile);
      setPreviewUrl(url);

      toast.success("Image uploaded", {
        description: "Your thumbnail has been added successfully",
      });
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl(null);
    toast.info("Image removed", {
      description: "The thumbnail has been removed",
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

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

      if (file) {
        formData.append("file", file);
      }

      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      setUploadProgress(100);

      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      toast.success("Project published successfully! 🎉");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to upload project");
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8 sm:py-12">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" className="mb-4 gap-2" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </Button>
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Share Your Creation
            </h1>
            <p className="text-muted-foreground">
              Showcase your project to the community and get feedback
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Provide all the necessary information about your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., AI-Powered Dashboard"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  A catchy title for your project
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your project..."
                  className="min-h-[120px] resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Describe what your project does and what makes it special
                </p>
              </div>

              <Separator />

              {/* Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github_link">GitHub Link *</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="github_link"
                        placeholder="https://github.com/username/project"
                        className="pl-9"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                      />
                    </div>
                    {errors.github_link && (
                      <p className="text-sm text-red-500">
                        {errors.github_link}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visit_link">Live Demo</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="visit_link"
                        placeholder="https://your-project.com"
                        className="pl-9"
                        value={visitLink}
                        onChange={(e) => setVisitLink(e.target.value)}
                      />
                    </div>
                    {errors.visit_link && (
                      <p className="text-sm text-red-500">
                        {errors.visit_link}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Category and Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          <div className="flex items-center gap-2">
                            <cat.icon className="w-4 h-4" />
                            {cat.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="year"
                      placeholder="2024"
                      className="pl-9"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                  {errors.year && (
                    <p className="text-sm text-red-500">{errors.year}</p>
                  )}
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <Label htmlFor="badges">Technologies</Label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="badges"
                    placeholder="React, TypeScript, Tailwind CSS, Node.js"
                    className="pl-9"
                    value={badges}
                    onChange={(e) => setBadges(e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Separate technologies with commas
                </p>
              </div>

              {/* Featured Checkbox */}
              <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <Checkbox
                  id="featured"
                  checked={featured}
                  onCheckedChange={(checked) => setFeatured(checked as boolean)}
                />
                <div className="space-y-1 leading-none">
                  <Label
                    htmlFor="featured"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Star className="w-4 h-4 text-yellow-500" />
                    Feature this project
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Featured projects appear at the top of the list
                  </p>
                </div>
              </div>

              <Separator />

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Project Thumbnail</Label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-muted-foreground/25"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    {previewUrl ? (
                      <div className="space-y-3">
                        <div className="relative w-full h-48 rounded-lg overflow-hidden">
                          <Image
                            src={previewUrl}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Badge variant="default" className="gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Image uploaded
                          </Badge>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={removeImage}
                            className="gap-1"
                          >
                            <X className="w-3 h-3" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Drag & drop an image here, or click to select
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  A thumbnail image to represent your project
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              {/* Upload Progress */}
              {loading && uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-full space-y-2">
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-xs text-center text-muted-foreground">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full gap-2"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Publishing Project...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Publish Project
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
