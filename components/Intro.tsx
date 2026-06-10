"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MapPin, ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import profile from "@/public/img/profile2.jpg";
import { TextAnimate } from "./ui/text-animate";
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
			className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pb-12 pt-16"
		>
			{/* Subtle ambient */}
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[100px]" />
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Two-column: text left, avatar right */}
				<div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
					{/* Left: text */}
					<div className="flex flex-col gap-6">
						{/* Status */}
						<motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
							<Badge
								variant="outline"
								className="w-fit inline-flex items-center gap-2 px-4 py-1.5 border-primary/30 bg-primary/5 text-primary rounded-full text-sm"
							>
								<span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
								Available for opportunities
							</Badge>
						</motion.div>

						{/* Name */}
						<motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
							<TextAnimate
								animation="slideUp"
								by="word"
								className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9]"
							>
								MUHD HAFIZUDDIN
							</TextAnimate>
						</motion.div>

						{/* Role + location */}
						<motion.div
							custom={2}
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							className="flex flex-wrap items-center gap-x-4 gap-y-1.5"
						>
							<span className="text-lg md:text-xl text-muted-foreground font-medium">
								Software Engineering Student
							</span>
							<span className="text-border hidden sm:inline">·</span>
							<span className="flex items-center gap-1.5 text-sm text-muted-foreground">
								<MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
								Johor, Malaysia
							</span>
						</motion.div>

						{/* Bio — no card wrapper */}
						<motion.p
							custom={3}
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							className="text-base text-muted-foreground leading-relaxed max-w-[55ch]"
						>
							Final-year Software Engineering student at UTHM Malaysia. Built
							full-stack systems with Next.js, TypeScript, and PostgreSQL — from
							a QR commerce platform during my internship at Xeersoft to personal
							projects connecting real users. Looking for opportunities to ship
							things that matter.
						</motion.p>

						{/* CTAs */}
						<motion.div
							custom={4}
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							className="flex flex-wrap items-center gap-3"
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

						{/* Social icons — bare, no card borders */}
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

					{/* Right: avatar */}
					<motion.div
						custom={2}
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						className="flex justify-center lg:justify-end order-first lg:order-last"
					>
						<Avatar className="h-44 w-44 sm:h-56 sm:w-56 lg:h-64 lg:w-64 border-2 border-border shadow-lg">
							<AvatarImage
								src={profile.src}
								alt="Hafizuddin Hamid"
								className="object-cover"
							/>
							<AvatarFallback>
								<div className="bg-muted h-full w-full" />
							</AvatarFallback>
						</Avatar>
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
			</div>
		</section>
	);
}
