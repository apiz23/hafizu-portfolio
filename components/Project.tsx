"use client";

import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { LinkPreview } from "@/components/ui/link-preview";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type ProjectType = {
  id: string;
  title: string;
  description: string;
  image_src: string;
  github_link: string;
  visit_link: string;
  featured: boolean;
  category: string;
  year: string;
  badges: string[];
};

const categories = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "webapp", label: "Web Apps" },
  { id: "frontend", label: "Frontend" },
];

const ITEMS_PER_PAGE = 5;

function SkeletonRow({ delay }: { delay: number }) {
  return (
    <div className="flex items-center gap-4 border-b border-edge-strong/10 py-5" style={{ animationDelay: `${delay}ms` }}>
      <div className="h-3 w-6 shrink-0 animate-pulse bg-foreground/10" />
      <div className="h-4 flex-1 animate-pulse bg-foreground/10" />
      <div className="hidden h-3 w-20 animate-pulse bg-foreground/10 sm:block" />
      <div className="h-3 w-4 shrink-0 animate-pulse bg-foreground/10" />
    </div>
  );
}

export default function Project({ showArchiveLink = true }: { showArchiveLink?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to load projects");
      setProjects(await res.json());
    } catch (err) {
      console.error(err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section ref={sectionRef} id="projects" className="relative border-t border-edge-strong/15 py-24 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="flex items-baseline justify-between rule-b pb-5">
          <div className="flex items-baseline gap-4">
            <span className="eyebrow">04 — Selected work</span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="display-md text-foreground"
            >
              Projects
            </motion.h2>
          </div>
          <span className="font-mono text-[12px] text-ink-dim">
            {loading ? "—" : `${filteredProjects.length} / ${projects.length}`}
          </span>
        </div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id)}
              aria-pressed={filter === cat.id}
              className={`px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-200 ${
                filter === cat.id
                  ? "bg-foreground text-background"
                  : "text-ink-dim ring-hairline hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* List */}
        {loading ? (
          <div className="mt-4">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <SkeletonRow key={i} delay={i * 60} />
            ))}
          </div>
        ) : error ? (
          <div className="mt-4 border-b border-edge-strong/10 py-16 text-center">
            <p className="mb-3 font-mono text-[13px] text-ink-dim">{error}</p>
            <button
              type="button"
              onClick={fetchProjects}
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground link-underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${filter}-${currentPage}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              {filteredProjects.length === 0 ? (
                <div className="border-b border-edge-strong/10 py-16 text-center">
                  <p className="font-mono text-[13px] text-ink-dim">
                    No projects in this category yet.
                  </p>
                </div>
              ) : (
                <>
                  {paginatedProjects.map((project, index) => {
                    const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
                    const rowClassName =
                      "group flex items-center gap-4 border-b border-edge-strong/10 py-5 transition-colors hover:border-accent cursor-pointer";
                    const rowContent = (
                      <>
                        <span
                          className="w-6 shrink-0 font-mono text-[12px] text-ink-dim/60 transition-colors group-hover:text-accent"
                          aria-hidden="true"
                        >
                          {String(globalIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 min-w-0 truncate font-display text-2xl leading-none text-foreground link-underline">
                          {project.title}
                        </span>
                        <span className="hidden max-w-[30ch] shrink-0 truncate text-[14px] text-ink-dim lg:inline">
                          {project.description}
                        </span>
                        <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
                          {project.badges.slice(0, 2).map((badge) => (
                            <span
                              key={badge}
                              className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-dim ring-hairline px-2 py-0.5"
                            >
                              {badge}
                            </span>
                          ))}
                        </span>
                        {project.year && (
                          <span className="hidden shrink-0 font-mono text-[11px] text-ink-dim/70 sm:inline">
                            {project.year}
                          </span>
                        )}
                        <span
                          className="shrink-0 font-mono text-sm text-foreground/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </>
                    );

                    const previewUrl = project.visit_link || project.github_link;

                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                      >
                        {!previewUrl ? (
                          <div className={rowClassName}>{rowContent}</div>
                        ) : (
                          <LinkPreview url={previewUrl} width={240} height={150} className={rowClassName}>
                            {rowContent}
                          </LinkPreview>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 1) setCurrentPage(currentPage - 1);
                              }}
                              className={currentPage === 1 ? "pointer-events-none opacity-40" : ""}
                            />
                          </PaginationItem>
                          {getPageNumbers().map((page, i) =>
                            page === "..." ? (
                              <PaginationItem key={`e-${i}`}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            ) : (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  isActive={currentPage === page}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage(page);
                                  }}
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          )}
                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                              }}
                              className={currentPage === totalPages ? "pointer-events-none opacity-40" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
        >
          {showArchiveLink && (
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground link-underline"
            >
              View all projects
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          )}
          <Link
            href="https://github.com/apiz23"
            target="_blank"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim link-underline"
          >
            View all on GitHub
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
