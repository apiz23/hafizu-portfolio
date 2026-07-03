"use client";

import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { clipReveal, EASE_OUT_EXPO } from "@/lib/animations";
import { LinkPreview } from "@/components/ui/link-preview";

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

function SkeletonRow({ delay }: { delay: number }) {
	return (
		<div
			className="flex items-center gap-4 border-t border-border py-3.5"
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className="w-6 h-3 bg-border rounded animate-pulse shrink-0" />
			<div className="flex-1 h-4 bg-border rounded animate-pulse" />
			<div className="hidden sm:block w-24 h-3 bg-border rounded animate-pulse" />
			<div className="hidden sm:block w-10 h-3 bg-border rounded animate-pulse" />
			<div className="w-4 h-3 bg-border rounded animate-pulse shrink-0" />
		</div>
	);
}

export default function Project() {
	const h2Ref = useRef<HTMLHeadingElement>(null);
	const h2InView = useInView(h2Ref, { once: true, margin: "-10%" });
	const filterRef = useRef<HTMLDivElement>(null);
	const filterInView = useInView(filterRef, { once: true });
	const githubRef = useRef<HTMLDivElement>(null);
	const githubInView = useInView(githubRef, { once: true });

	const [filter, setFilter] = useState<string>("all");
	const [projects, setProjects] = useState<ProjectType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const res = await fetch("/api/projects");
				const data = await res.json();
				setProjects(data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchProjects();
	}, []);

	const filteredProjects =
		filter === "all" ? projects : projects.filter((p) => p.category === filter);

	return (
		<section id="projects" className="py-14 bg-background border-t border-border">
			<div className="max-w-4xl mx-auto px-4 sm:px-8">
				{/* Header row */}
				<div className="flex justify-between items-baseline">
					<motion.h2
						ref={h2Ref}
						variants={clipReveal}
						initial="hidden"
						animate={h2InView ? "visible" : "hidden"}
						className="font-serif font-black uppercase tracking-[-0.04em]"
						style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
					>
						PROJECTS
					</motion.h2>
					<span className="font-mono text-[13px] text-muted-foreground">
						{loading ? "—" : `${projects.length} projects`}
					</span>
				</div>

				{/* Category filter */}
				<motion.div
					ref={filterRef}
					initial={{ opacity: 0, y: 12 }}
					animate={filterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
					transition={{ delay: 0.1 }}
					className="flex flex-wrap gap-2 mt-4 mb-2"
				>
					{categories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => setFilter(cat.id)}
							aria-pressed={filter === cat.id}
							className={`font-mono text-[11px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-[2px] border transition-colors cursor-pointer focus-visible:outline-none ${
								filter === cat.id
									? "bg-foreground text-background border-foreground"
									: "bg-background text-muted-foreground border-border hover:border-foreground hover:text-foreground"
							}`}
						>
							{cat.label}
						</button>
					))}
				</motion.div>

				{/* Project list */}
				{loading ? (
					<div>
						{Array.from({ length: 5 }).map((_, i) => (
							<SkeletonRow key={i} delay={i * 60} />
						))}
						<div className="border-t border-border" />
					</div>
				) : (
					<AnimatePresence mode="wait">
						<motion.div
							key={filter}
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -8 }}
							transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
						>
							{filteredProjects.length === 0 ? (
								<div className="border-t border-border py-16 text-center">
									<p className="font-mono text-[13px] text-muted-foreground">
										No projects in this category yet.
									</p>
								</div>
							) : (
								filteredProjects.map((project, index) => (
									<motion.div
										key={project.id}
										initial={{ opacity: 0, y: 16 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: index * 0.05,
											duration: 0.4,
											ease: EASE_OUT_EXPO,
										}}
									>
										{(() => {
											const rowClassName =
												"border-t border-border py-3.5 flex items-center gap-4 cursor-pointer group hover:bg-[#fafafa] transition-colors duration-150";
											const rowContent = (
												<>
													{/* Number */}
													<span className="font-mono text-[13px] text-[#ccc] w-6 shrink-0" aria-hidden="true">
														{String(index + 1).padStart(2, "0")}
													</span>

													{/* Title */}
													<span className="text-[16px] font-semibold text-foreground flex-1 min-w-0 truncate">
														{project.title}
													</span>

													{/* Tech tags */}
													<span className="hidden sm:flex gap-2 shrink-0">
														{project.badges.slice(0, 3).map((badge) => (
															<span key={badge} className="font-mono text-[12px] text-muted-foreground">
																{badge}
															</span>
														))}
													</span>

													{/* Year */}
													<span className="hidden sm:inline font-mono text-[12px] text-muted-foreground shrink-0">
														{project.year}
													</span>

													{/* Arrow */}
													<span
														className="font-mono text-[16px] text-[#ccc] group-hover:text-foreground transition-colors shrink-0"
														aria-hidden="true"
													>
														→
													</span>
												</>
											);

											return project.visit_link && project.image_src ? (
												<LinkPreview
													url={project.visit_link}
													isStatic
													imageSrc={project.image_src}
													width={240}
													height={150}
													className={rowClassName}
												>
													{rowContent}
												</LinkPreview>
											) : (
												<Link
													href={project.visit_link || "#"}
													target={project.visit_link ? "_blank" : undefined}
													className={rowClassName}
												>
													{rowContent}
												</Link>
											);
										})()}
									</motion.div>
								))
							)}
							<div className="border-t border-border" />
						</motion.div>
					</AnimatePresence>
				)}

				{/* GitHub link */}
				<motion.div
					ref={githubRef}
					initial={{ opacity: 0, y: 16 }}
					animate={githubInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
					transition={{ delay: 0.3 }}
					className="mt-6"
				>
					<Link
						href="https://github.com/apiz23"
						target="_blank"
						className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
					>
						<Github className="h-3 w-3" />
						<span>View all on GitHub</span>
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
