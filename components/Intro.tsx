"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import {
	SiReact,
	SiNextdotjs,
	SiTypescript,
	SiTailwindcss,
	SiNodedotjs,
	SiPostgresql,
} from "react-icons/si";
import {
	ScrollVelocityContainer,
	ScrollVelocityRow,
} from "./ui/scroll-based-velocity";
import { RiExternalLinkLine } from "react-icons/ri";

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	visible: (i: number = 0) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			delay: i * 0.08,
			ease: [0.22, 1, 0.36, 1] as const,
		},
	}),
};

const heroName = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.05,
		},
	},
};

const heroWord = {
	hidden: { opacity: 0, y: 28 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
	},
};

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

export default function Intro() {
	const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		document
			.getElementById("projects")
			?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<section
			id="home"
			className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pb-12 pt-28"
		>
			<div className="w-full px-8">
				{/* Available badge */}
				<motion.div
					custom={0}
					variants={fadeUp}
					initial="hidden"
					animate="visible"
					className="mb-8"
				>
					<Badge
						variant="outline"
						className="w-fit inline-flex items-center gap-2 px-4 py-1.5 border-primary/30 bg-primary/5 text-primary rounded-full text-sm"
					>
						<span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
						Available for opportunities · Johor, MY
					</Badge>
				</motion.div>

				{/* Name — 3-line editorial, per-word stagger */}
				<motion.h1
					variants={heroName}
					initial="hidden"
					animate="visible"
					className="font-serif font-black uppercase leading-[0.85] tracking-tighter text-foreground"
					style={{ fontSize: "clamp(4rem, 13vw, 12rem)" }}
				>
					<motion.span className="block" variants={heroWord}>
						MUHA
					</motion.span>
					<motion.span className="block" variants={heroWord}>
						F<span className="text-primary">I</span>Z
					</motion.span>
					<motion.span className="block" variants={heroWord}>
						UDDIN
					</motion.span>
				</motion.h1>

				{/* Horizontal rule — animates from left */}
				<div className="my-8">
					<motion.div
						className="h-[2px] w-full bg-foreground"
						initial={{ scaleX: 0 }}
						animate={{ scaleX: 1 }}
						transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
						style={{ transformOrigin: "left" }}
					/>
				</div>

				{/* Bottom row: role + bio left, stats right */}
				<motion.div
					custom={3}
					variants={fadeUp}
					initial="hidden"
					animate="visible"
					className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8"
				>
					<div className="max-w-[50ch]">
						<p className="text-base text-muted-foreground font-medium mb-2">
							Software Engineering Student
						</p>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Final-year SE student at UTHM Malaysia. Built full-stack systems
							with Next.js, TypeScript, and PostgreSQL — from a QR commerce
							platform during my internship at Xeersoft to personal projects
							connecting real users.
						</p>
					</div>
					<div className="flex gap-8 shrink-0">
						<div className="text-right">
							<p className="text-4xl font-black font-mono text-foreground leading-none">
								12+
							</p>
							<p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
								Projects
							</p>
						</div>
						<div className="text-right">
							<p className="text-4xl font-black font-mono text-foreground leading-none">
								1yr
							</p>
							<p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
								Experience
							</p>
						</div>
					</div>
				</motion.div>

				{/* CTAs */}
				<motion.div
					custom={4}
					variants={fadeUp}
					initial="hidden"
					animate="visible"
					className="flex flex-wrap items-center gap-3 mb-8"
				>
					<Button size="lg" className="rounded-full px-7 group" asChild>
						<Link href="#projects" scroll={false} onClick={scrollToProjects}>
							View My Work
							<ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-200" />
						</Link>
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="rounded-full px-7"
						asChild
					>
						<Link
							href="https://docs.google.com/document/d/1SsIiM2VCZnLpso4zuoE6EraAcZrMW_pmXiKLz_1Go8Y/edit?usp=sharing"
							target="_blank"
						>
							<RiExternalLinkLine className="mr-2 h-4 w-4" />
							View Resume
						</Link>
					</Button>
				</motion.div>

				{/* Social icons */}
				<motion.div
					custom={5}
					variants={fadeUp}
					initial="hidden"
					animate="visible"
					className="flex items-center gap-4"
				>
					<Link
						href="https://github.com/apiz23"
						target="_blank"
						aria-label="GitHub"
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						<Github className="h-5 w-5" />
					</Link>
					<Link
						href="https://www.linkedin.com/in/muh-hafizuddin/"
						target="_blank"
						aria-label="LinkedIn"
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						<Linkedin className="h-5 w-5" />
					</Link>
					<Link
						href="#contact"
						aria-label="Contact"
						className="text-muted-foreground hover:text-foreground transition-colors"
					>
						<Mail className="h-5 w-5" />
					</Link>
				</motion.div>
			</div>

			{/* Tech logos strip */}
			<motion.div
				custom={6}
				variants={fadeUp}
				initial="hidden"
				animate="visible"
				className="mt-16 w-full overflow-hidden"
			>
				<ScrollVelocityContainer className="py-4">
					<ScrollVelocityRow baseVelocity={20} direction={1}>
						<div className="flex items-center gap-12 px-4">
							{techLogos.map((logo, i) => (
								<Link
									key={i}
									href={logo.href}
									target="_blank"
									aria-label={logo.title}
									className="text-5xl md:text-6xl text-muted-foreground/50 hover:text-primary transition-colors"
								>
									{logo.node}
								</Link>
							))}
						</div>
					</ScrollVelocityRow>
				</ScrollVelocityContainer>
			</motion.div>
		</section>
	);
}
