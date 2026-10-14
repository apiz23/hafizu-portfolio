import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Portfolio project themes. These are the categories the site filters by, so
 * they should read as a story rather than a stack: what gets built, what gets
 * automated, and how quality is proven.
 */
export const PROJECT_CATEGORIES = [
  { value: "engineering", label: "Engineering" },
  { value: "ai-automation", label: "AI & Automation" },
  { value: "quality", label: "Quality & Reliability" },
] as const;

const LEGACY_CATEGORY_MAP: Record<string, string> = {
  fullstack: "engineering",
  webapp: "engineering",
  frontend: "engineering",
  backend: "engineering",
  mobile: "engineering",
};

/**
 * Map a stored category to a current theme. Older rows used stack-based
 * categories (fullstack/webapp/frontend/...); those fold into "engineering" so
 * existing projects keep showing up without a data migration.
 */
export function normalizeCategory(category: string | null | undefined): string {
  if (!category) return "engineering";
  if (PROJECT_CATEGORIES.some((c) => c.value === category)) return category;
  return LEGACY_CATEGORY_MAP[category] ?? "engineering";
}
