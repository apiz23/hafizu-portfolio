"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
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
			<div className="container">
				{/* Header row */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12"
				>
					<h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground">
						PROJECTS
					</h2>
					<span className="font-mono text-sm text-muted-foreground shrink-0">
						{filteredProjects.length} projects
					</span>
				</motion.div>

				{/* Category filter — text-only pills */}
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
							className={`text-sm px-4 py-1.5 rounded-full transition-colors ${
								filter === cat.id
									? "bg-foreground text-background"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{cat.label}
						</button>
					))}
				</motion.div>

				{/* Numbered list */}
				{loading ? (
					<div className="border-t border-foreground/10 py-16 text-center">
						<p className="text-sm text-muted-foreground font-mono">
							Loading...
						</p>
					</div>
				) : (
					<>
						{filteredProjects.map((project, index) => (
							<motion.div
								key={project.id}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.05 }}
							>
								<Link
									href={project.visit_link}
									target="_blank"
									className="group flex items-center gap-4 sm:gap-6 border-t border-foreground/10 py-5 hover:bg-primary/[0.02] transition-colors -mx-8 px-8"
								>
									{/* Number */}
									<span className="text-4xl sm:text-5xl font-black text-muted-foreground/20 group-hover:text-primary/30 transition-colors w-14 sm:w-16 shrink-0 font-mono leading-none">
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
									<span className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0">
										→
									</span>
								</Link>
							</motion.div>
						))}
						<div className="border-t border-foreground/10" />
					</>
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
						<span className="group-hover:translate-x-0.5 transition-transform">
							→
						</span>
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
