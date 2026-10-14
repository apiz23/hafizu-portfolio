import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Project from "@/components/Project";
import GridRuler from "@/components/grid-ruler";

export const metadata = {
  title: "Projects — Muhd Hafizuddin",
  description:
    "Selected software projects by Muhd Hafizuddin — engineering work, AI and automation experiments, and quality tooling.",
};

export default function ProjectsPage() {
  return (
    <main className="relative">
      {/* Page header */}
      <header className="relative overflow-hidden border-b border-edge-strong/15 pt-28 pb-14">
        <GridRuler columns={6} />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim link-underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back home
          </Link>

          <p className="eyebrow">Work archive</p>
          <h1 className="display-lg mt-3 text-foreground">
            Selected
            <br />
            <span className="italic text-ink-dim">projects.</span>
          </h1>
          <p className="mt-5 max-w-[52ch] text-pretty text-[15px] leading-relaxed text-ink-dim">
            A running list of the software I&apos;ve built — engineering work,
            AI and automation experiments, and quality tooling. Filter by theme
            or reach out about any of them.
          </p>
        </div>
      </header>

      {/* Reuse the same project list + filters + pagination as the homepage */}
      <Project showArchiveLink={false} />
    </main>
  );
}
