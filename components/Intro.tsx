"use client";

import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	MapPin,
	Code2,
	BookOpen,
	Github,
	Linkedin,
	Mail,
	Download,
	ArrowDown,
	Sparkles,
	GraduationCap,
} from "lucide-react";
import profile from "@/public/img/profile.jpg";
import { TextAnimate } from "./ui/text-animate";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import LogoLoop from "./LogoLoop";
import {
	SiReact,
	SiNextdotjs,
	SiTypescript,
	SiTailwindcss,
	SiNodedotjs,
	SiPostgresql,
} from "react-icons/si";

export default function Intro() {
	const [isMounted, setIsMounted] = useState(false);
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		setIsMounted(true);
		setWindowWidth(window.innerWidth);

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const skills = [
		"Next.js",
		"React",
		"TypeScript",
		"Node.js",
		"PostgreSQL",
		"TailwindCSS",
	];

	// Tech logos for the loop
	const techLogos = [
		{ node: <SiReact />, title: "React", href: "https://react.dev" },
		{ node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
		{
			node: <SiTypescript />,
			title: "TypeScript",
			href: "https://www.typescriptlang.org",
		},
		{
			node: <SiTailwindcss />,
			title: "Tailwind CSS",
			href: "https://tailwindcss.com",
		},
		{ node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
		{
			node: <SiPostgresql />,
			title: "PostgreSQL",
			href: "https://www.postgresql.org",
		},
	];

	// Responsive sizing
	const getAvatarSize = () => {
		if (windowWidth < 640) return "h-32 w-32";
		if (windowWidth < 768) return "h-40 w-40";
		if (windowWidth < 1024) return "h-48 w-48";
		return "h-56 w-56";
	};

	const getTitleSize = () => {
		if (windowWidth < 640) return "text-3xl";
		if (windowWidth < 768) return "text-4xl";
		if (windowWidth < 1024) return "text-5xl";
		return "text-6xl";
	};

	// Framer Motion variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 10,
			},
		},
	};

	// Smooth scroll function
	const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const projectsSection = document.getElementById("projects");
		if (projectsSection) {
			projectsSection.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	if (!isMounted) {
		return (
			<section className="relative min-h-screen flex items-center justify-center bg-background">
				<div className="flex flex-col items-center gap-4">
					<div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary" />
					<div className="animate-pulse text-primary font-medium tracking-wide">
						Loading...
					</div>
				</div>
			</section>
		);
	}

	return (
		<section
			id="home"
			className="relative min-h-screen flex items-center justify-center overflow-hidden pt-10 md:pt-0 bg-gradient-to-b from-background via-background/95 to-background"
		>
			{/* Animated background - more subtle */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
				<div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 md:w-80 md:h-80 bg-accent/5 rounded-full blur-3xl animate-pulse [animation-delay:4s]" />

				{/* Grid pattern overlay */}
				<div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="max-w-5xl mx-auto"
				>
					{/* Avatar Section - static */}
					<motion.div
						className="flex justify-center mb-8 md:mb-10"
						variants={itemVariants}
					>
						<div className="relative">
							{/* Glow effect */}
							<div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-110" />

							<Avatar
								className={`relative ${getAvatarSize()} border-4 border-background shadow-2xl ring-2 ring-primary/20`}
							>
								<AvatarImage
									src={profile.src}
									alt="Hafizuddin Hamid"
									className="object-cover"
								/>
								<AvatarFallback>
									<div className="animate-pulse bg-muted h-full w-full" />
								</AvatarFallback>
							</Avatar>
						</div>
					</motion.div>

					{/* Text Content */}
					<div className="text-center space-y-6 sm:space-y-7 md:space-y-8">
						{/* Greeting Badge */}
						<motion.div variants={itemVariants}>
							<Badge
								variant="outline"
								className="inline-flex items-center gap-2 px-4 py-2 border-primary/20 bg-primary/5 text-primary rounded-full text-sm"
							>
								<Sparkles className="h-4 w-4" />
								<span className="tracking-wide">Available for opportunities</span>
							</Badge>
						</motion.div>

						{/* Name with gradient */}
						<motion.div variants={itemVariants}>
							<TextAnimate
								animation="slideUp"
								by="word"
								className="scroll-m-20 text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter"
							>
								MUHD HAFIZUDDIN
							</TextAnimate>
						</motion.div>

						{/* Title with animated underline */}
						<motion.div variants={itemVariants} className="relative inline-block">
							<h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium tracking-wide">
								Software Engineering Student
							</h2>
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
								className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-full origin-left"
							/>
						</motion.div>

						{/* Location */}
						<motion.div
							variants={itemVariants}
							className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
						>
							<MapPin className="h-4 w-4 text-primary" />
							<span className="tracking-wide">JOHOR, Malaysia</span>
						</motion.div>

						{/* About Section - improved card design */}
						<motion.div variants={itemVariants} className="max-w-3xl mx-auto mt-8">
							<div className="relative">
								{/* Decorative element */}
								<div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />

								<div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30">
									<div className="flex items-center gap-3 mb-4">
										<div className="p-2 rounded-lg bg-primary/10">
											<GraduationCap className="h-5 w-5 text-primary" />
										</div>
										<h3 className="text-lg font-semibold text-card-foreground tracking-tight">
											About Me
										</h3>
									</div>
									<p className="text-sm md:text-base text-muted-foreground leading-relaxed tracking-wide">
										I am a dedicated software engineering student passionate about
										full-stack development and creating innovative solutions. Skilled in
										modern frameworks like Next.js and Tailwind CSS, I enjoy building
										impactful projects and continuously learning new technologies to solve
										real-world problems.
									</p>
								</div>
							</div>
						</motion.div>

						{/* Logo Loop Section - NEW */}
						<motion.div variants={itemVariants} className="mt-10 w-full">
							<div className="relative h-24 md:h-28 w-full overflow-hidden">
								<LogoLoop
									logos={techLogos}
									speed={100}
									direction="left"
									logoHeight={60}
									gap={60}
									hoverSpeed={0}
									scaleOnHover
									fadeOut
									fadeOutColor="#ffffff"
									ariaLabel="Technology partners"
								/>
							</div>
						</motion.div>

						{/* CTA Buttons - improved design */}
						<motion.div
							variants={itemVariants}
							className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
						>
							<Button
								size="lg"
								className="w-full sm:w-auto group border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 px-8"
								asChild
							>
								<Link href="#projects" scroll={false} onClick={scrollToProjects}>
									<span className="relative z-10 flex items-center justify-center tracking-wide">
										View My Work
										<ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
									</span>
									<div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
								</Link>
							</Button>

							<Button
								size="lg"
								variant="outline"
								className="w-full sm:w-auto group border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 px-8"
							>
								<Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
								<span className="tracking-wide">Download Resume</span>
							</Button>
						</motion.div>

						{/* Social Links - added for completeness */}
						<motion.div
							variants={itemVariants}
							className="flex justify-center gap-4 pt-4"
						>
							<Link
								href="https://github.com"
								target="_blank"
								className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
							>
								<Github className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
							</Link>
							<Link
								href="https://linkedin.com"
								target="_blank"
								className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
							>
								<Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
							</Link>
							<Link
								href="mailto:email@example.com"
								className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
							>
								<Mail className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
							</Link>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
