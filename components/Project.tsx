"use client";

import { Badge } from "./ui/badge";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { TextAnimate } from "./ui/text-animate";
import { motion } from "framer-motion";
import {
	Github,
	ExternalLink,
	Code2,
	Star,
	GitFork,
	Eye,
	Rocket,
	Sparkles,
	Calendar,
	TrendingUp,
	Layers,
} from "lucide-react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { useState } from "react";

export default function Project() {
	const [filter, setFilter] = useState<string>("all");

	const projects = [
		{
			title: "Hafizu Blog",
			description:
				"A full-stack personal blog platform for sharing study resources and technical articles. Features include user authentication, admin dashboard, and content management system.",
			imageSrc: "/img/hafizu-blog.png",
			badges: [
				"Next.js 14",
				"TypeScript",
				"TailwindCSS",
				"PostgreSQL",
				"Shadcn UI",
				"NextAuth.js",
			],
			githubLink: "https://github.com/apiz23/hafizu-blog",
			visitLink: "https://hafizu-blog.vercel.app/",
			featured: true,
			category: "fullstack",
			stats: { stars: 12, forks: 3, views: 1200 },
			year: "2024",
		},
		{
			title: "Your FSKTM Candidates",
			description:
				"An interactive voting information platform for UTHM FSKTM faculty elections 2024/2025. Provides detailed candidate profiles and election information.",
			imageSrc: "/img/your-fsktm-candidates.png",
			badges: [
				"Next.js 14",
				"TypeScript",
				"TailwindCSS",
				"Shadcn UI",
				"Framer Motion",
			],
			githubLink: "https://github.com/apiz23/your-fsktm-candidates",
			visitLink: "https://your-fsktm-candidates.vercel.app/",
			featured: false,
			category: "webapp",
			stats: { stars: 8, forks: 2, views: 800 },
			year: "2024",
		},
		{
			title: "Random Quotes Anime",
			description:
				"A curated collection of inspirational anime quotes. Features random quote generation, filtering by anime series, and responsive design for all devices.",
			imageSrc: "/img/random-quotes-anime.png",
			badges: ["Next.js 14", "TypeScript", "TailwindCSS", "Shadcn UI", "REST API"],
			githubLink: "https://github.com/apiz23/random-quote-anime",
			visitLink: "https://random-quote-anime.vercel.app/quotes",
			featured: false,
			category: "frontend",
			stats: { stars: 15, forks: 4, views: 1500 },
			year: "2023",
		},
		{
			title: "Space & Equipment Booking System",
			description:
				"A comprehensive booking system for UTHM Pagoh campus. Diploma final year project enabling students and staff to reserve spaces and equipment efficiently.",
			imageSrc: "/img/fyp-dip.png",
			badges: ["React.js", "Bootstrap 5", "Email.js", "SCSS", "Node.js"],
			githubLink: "https://github.com/apiz23/Fyp-dip",
			visitLink: "https://space-equipment.vercel.app/home",
			featured: true,
			category: "fullstack",
			stats: { stars: 20, forks: 5, views: 2000 },
			year: "2023",
		},
	];

	const categories = [
		{ id: "all", label: "All Projects", icon: Sparkles, color: "text-primary" },
		{
			id: "fullstack",
			label: "Full Stack",
			icon: Layers,
			color: "text-secondary",
		},
		{ id: "frontend", label: "Frontend", icon: Eye, color: "text-accent" },
		{ id: "webapp", label: "Web Apps", icon: Rocket, color: "text-chart-4" },
	];

	const filteredProjects =
		filter === "all" ? projects : projects.filter((p) => p.category === filter);

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section
			id="projects"
			className="py-20 md:py-32 relative overflow-hidden bg-background"
		>
			{/* Background decorations with more color */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
				<div className="absolute top-1/3 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

				{/* Grid pattern */}
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
						backgroundSize: "40px 40px",
						opacity: 0.05,
					}}
				/>
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20 backdrop-blur-sm">
							<Rocket className="h-4 w-4" />
							<span className="text-sm font-medium">My Work</span>
						</div>
					</motion.div>

					<TextAnimate
						animation="slideUp"
						by="word"
						className="scroll-m-20 text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-foreground"
					>
						Project Showcase
					</TextAnimate>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto"
					>
						A collection of my best work, side projects, and{" "}
						<span className="text-primary font-semibold">
							open source contributions
						</span>
					</motion.p>
				</div>

				{/* Category Filter - Improved with colored icons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
					className="flex flex-wrap justify-center gap-3 mb-12"
				>
					{categories.map((cat) => {
						const Icon = cat.icon;
						return (
							<Button
								key={cat.id}
								variant={filter === cat.id ? "default" : "outline"}
								size="sm"
								onClick={() => setFilter(cat.id)}
								className={`rounded-full transition-all duration-300 group ${
									filter === cat.id
										? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
										: "border-border/50 hover:border-primary/50 hover:bg-primary/5 text-foreground"
								}`}
							>
								<Icon
									className={`h-4 w-4 mr-2 ${filter === cat.id ? "text-primary-foreground" : cat.color}`}
								/>
								{cat.label}
								{filter === cat.id && (
									<span className="ml-2 h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
								)}
							</Button>
						);
					})}
				</motion.div>

				{/* Projects Grid */}
				<div className="max-w-6xl mx-auto">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="grid grid-cols-1 lg:grid-cols-2 gap-8"
					>
						{filteredProjects.map((project, index) => (
							<motion.div
								key={project.title}
								variants={itemVariants}
								className={project.featured ? "lg:col-span-2" : ""}
							>
								<Card
									className={`group relative h-full bg-card border border-border hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden ${
										project.featured ? "lg:flex" : ""
									}`}
								>
									{/* Gradient overlay on hover */}
									<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

									{/* Featured ribbon - FIXED: Now properly contained */}
									{project.featured && (
										<div className="absolute top-4 right-4 z-20 max-w-[calc(100%-2rem)]">
											<div className="relative">
												<div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-md opacity-70" />
												<Badge className="relative bg-gradient-to-r from-primary to-secondary text-white border-none px-4 py-1.5 shadow-lg flex items-center gap-1 whitespace-nowrap">
													<Star className="h-3 w-3 fill-current flex-shrink-0" />
													<span className="truncate">Featured Project</span>
												</Badge>
											</div>
										</div>
									)}

									{/* Image section */}
									<div
										className={`relative overflow-hidden ${
											project.featured ? "lg:w-1/2" : "w-full"
										}`}
									>
										{/* Image overlay gradient */}
										<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 z-10" />

										{/* Category badge */}
										<div className="absolute top-4 left-4 z-20 max-w-[calc(100%-2rem)]">
											<Badge
												variant="outline"
												className="bg-card/90 backdrop-blur-sm border-primary/30 text-foreground shadow-sm flex items-center"
											>
												{project.category === "fullstack" && (
													<Layers className="h-3 w-3 mr-1 text-primary flex-shrink-0" />
												)}
												{project.category === "frontend" && (
													<Eye className="h-3 w-3 mr-1 text-accent flex-shrink-0" />
												)}
												{project.category === "webapp" && (
													<Rocket className="h-3 w-3 mr-1 text-secondary flex-shrink-0" />
												)}
												<span className="truncate">
													{project.category.charAt(0).toUpperCase() +
														project.category.slice(1)}
												</span>
											</Badge>
										</div>

										{/* Year badge */}
										<div className="absolute bottom-4 left-4 z-20 max-w-[calc(100%-2rem)]">
											<div className="flex items-center gap-1 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50 shadow-sm">
												<Calendar className="h-3 w-3 text-primary flex-shrink-0" />
												<span className="text-xs font-medium text-foreground">
													{project.year}
												</span>
											</div>
										</div>

										<Image
											alt={project.title}
											src={project.imageSrc}
											width={2000}
											height={2000}
											className="w-full h-64 lg:h-full object-cover transition-transform duration-700 group-hover:scale-110"
										/>
									</div>

									{/* Content section */}
									<div
										className={`p-6 lg:p-8 relative z-10 ${project.featured ? "lg:w-1/2" : "w-full"}`}
									>
										{/* Tech badges - Improved with colored backgrounds */}
										<div className="flex flex-wrap gap-2 mb-4">
											{project.badges.slice(0, 4).map((badge, badgeIndex) => {
												const colors = [
													"bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
													"bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20",
													"bg-accent/10 text-accent border-accent/20 hover:bg-accent/20",
													"bg-chart-4/10 text-chart-4 border-chart-4/20 hover:bg-chart-4/20",
												];
												return (
													<Badge
														key={badgeIndex}
														variant="outline"
														className={`${colors[badgeIndex % colors.length]} transition-all duration-300 hover:scale-105`}
													>
														<Code2 className="h-3 w-3 mr-1 flex-shrink-0" />
														<span className="truncate">{badge}</span>
													</Badge>
												);
											})}
											{project.badges.length > 4 && (
												<Badge
													variant="outline"
													className="border-border/50 bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
												>
													+{project.badges.length - 4}
												</Badge>
											)}
										</div>

										{/* Title */}
										<CardTitle className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
											{project.title}
										</CardTitle>

										{/* Description */}
										<CardDescription className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
											{project.description}
										</CardDescription>

										{/* Project stats - Improved with colored icons */}
										<div className="flex items-center gap-4 mb-6">
											<div className="flex items-center gap-1.5 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
												<Star className="h-4 w-4 text-primary fill-primary/20 flex-shrink-0" />
												<span className="text-sm font-medium text-foreground">
													{project.stats.stars}
												</span>
											</div>
											<div className="flex items-center gap-1.5 bg-secondary/5 px-3 py-1.5 rounded-full border border-secondary/10">
												<GitFork className="h-4 w-4 text-secondary flex-shrink-0" />
												<span className="text-sm font-medium text-foreground">
													{project.stats.forks}
												</span>
											</div>
											<div className="flex items-center gap-1.5 bg-accent/5 px-3 py-1.5 rounded-full border border-accent/10">
												<Eye className="h-4 w-4 text-accent flex-shrink-0" />
												<span className="text-sm font-medium text-foreground">
													{project.stats.views}
												</span>
											</div>
										</div>

										{/* Action buttons - Improved */}
										<div className="flex gap-3">
											<Button
												className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 group/btn"
												asChild
											>
												<Link href={project.visitLink} target="_blank">
													<ExternalLink className="mr-2 h-4 w-4 transition-all group-hover/btn:scale-110 group-hover/btn:rotate-12 flex-shrink-0" />
													<span className="truncate">Live Demo</span>
												</Link>
											</Button>
											<Button
												variant="outline"
												className="flex-1 border-2 border-border hover:border-secondary hover:bg-secondary/5 hover:text-secondary transition-all duration-300 group/btn"
												asChild
											>
												<Link href={project.githubLink} target="_blank">
													<Github className="mr-2 h-4 w-4 transition-all group-hover/btn:scale-110 group-hover/btn:rotate-12 flex-shrink-0" />
													<span className="truncate">Source Code</span>
												</Link>
											</Button>
										</div>
									</div>
								</Card>
							</motion.div>
						))}
					</motion.div>

					{/* View all projects link */}
					{filteredProjects.length > 0 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.5 }}
							className="text-center mt-16"
						>
							<div className="relative inline-block">
								<div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-30" />
								<Button
									variant="outline"
									size="lg"
									className="relative rounded-full border-2 border-border hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300 group px-8"
									asChild
								>
									<Link href="https://github.com/apiz23" target="_blank">
										<span className="mr-2">View all on GitHub</span>
										<Github className="h-4 w-4 transition-all group-hover:rotate-12 group-hover:scale-110 flex-shrink-0" />
										<TrendingUp className="h-4 w-4 ml-2 text-primary opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
									</Link>
								</Button>
							</div>
						</motion.div>
					)}
				</div>
			</div>
		</section>
	);
}
