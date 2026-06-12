"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";
import { useState, useEffect } from "react";

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
			className="flex items-center gap-4 sm:gap-6 border-t border-foreground/10 py-5 -mx-8 px-8"
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className="w-14 sm:w-16 h-7 bg-muted rounded animate-pulse shrink-0" />
			<div className="flex-1 h-4 bg-muted rounded animate-pulse" />
			<div className="hidden lg:block w-24 h-3.5 bg-muted/70 rounded animate-pulse" />
			<div className="hidden sm:block w-10 h-3.5 bg-muted/70 rounded animate-pulse" />
			<div className="w-4 h-4 bg-muted/50 rounded animate-pulse shrink-0" />
		</div>
	);
}

export default function Project() {
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
		filter === "all"
			? projects
			: projects.filter((p) => p.category === filter);

	return (
		<section id="projects" className="py-20 md:py-32 bg-background">
			<div className="w-full px-8">
				{/* Header row */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12"
				>
					<h2 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter text-foreground">
						PROJECTS
					</h2>
					<span className="font-mono text-sm text-muted-foreground shrink-0">
						{loading ? "—" : `${filteredProjects.length} projects`}
					</span>
				</motion.div>

				{/* Category filter */}
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
					className="flex flex-wrap gap-2 mb-12"
				>
					{categories.map((cat) => (
						<button
							key={cat.id}
							onClick={() => setFilter(cat.id)}
							className={`text-sm px-4 py-2 rounded-full cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
								filter === cat.id
									? "bg-foreground text-background"
									: "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
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
						<div className="border-t border-foreground/10" />
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
								<div className="border-t border-foreground/10 py-16 text-center">
									<p className="text-sm text-muted-foreground font-mono">
										No projects in this category yet.
									</p>
								</div>
							) : (
								filteredProjects.map((project, index) => (
									<motion.div
										key={project.id}
										initial={{ opacity: 0, y: 12 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: index * 0.04,
											duration: 0.3,
											ease: [0.22, 1, 0.36, 1],
										}}
									>
										<Link
											href={project.visit_link || "#"}
											target={project.visit_link ? "_blank" : undefined}
											className="group flex items-center gap-4 sm:gap-6 border-t border-foreground/10 py-5 hover:bg-foreground/[0.03] transition-colors duration-150 -mx-8 px-8"
										>
											{/* Number */}
											<span className="text-4xl sm:text-5xl font-black font-mono text-muted-foreground/20 group-hover:text-primary/30 transition-colors w-14 sm:w-16 shrink-0 leading-none">
												{String(index + 1).padStart(2, "0")}
											</span>

											{/* Featured label */}
											{project.featured && (
												<span className="hidden sm:block text-[10px] text-primary font-mono uppercase tracking-widest shrink-0">
													Featured
												</span>
											)}

											{/* Title */}
											<span className="flex-1 text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors min-w-0 truncate">
												{project.title}
											</span>

											{/* Tech — hidden on mobile */}
											<span className="hidden lg:flex gap-x-3 text-xs text-muted-foreground font-mono shrink-0">
												{project.badges.slice(0, 3).join(" · ")}
											</span>

											{/* Year */}
											<span className="hidden sm:block text-sm text-muted-foreground font-mono shrink-0">
												{project.year}
											</span>

											{/* Arrow */}
											<span
												className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
												aria-hidden="true"
											>
												→
											</span>
										</Link>
									</motion.div>
								))
							)}
							<div className="border-t border-foreground/10" />
						</motion.div>
					</AnimatePresence>
				)}

				{/* GitHub link */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
					className="mt-12"
				>
					<Link
						href="https://github.com/apiz23"
						target="_blank"
						className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
					>
						<Github className="h-4 w-4" />
						<span>View all on GitHub</span>
						<span
							className="group-hover:translate-x-0.5 transition-transform"
							aria-hidden="true"
						>
							→
						</span>
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
