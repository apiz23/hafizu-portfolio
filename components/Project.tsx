"use client";
import { useEffect, useRef } from "react";
import TypingAnimation from "./magicui/typing-animation";
import gsap from "gsap";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Project() {
	const gradualSpaceRef = useRef(null);

	useEffect(() => {
		if (gradualSpaceRef.current) {
			gsap.fromTo(
				gradualSpaceRef.current,
				{ opacity: 0, y: 100 },
				{
					opacity: 1,
					y: 0,
					duration: 3.5,
					ease: "power4.out",
					scrollTrigger: {
						trigger: gradualSpaceRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				}
			);
		}
	}, []);

	const projects = [
		{
			title: "Hafizu Blog",
			description:
				"A full-stack website for personal use, designed to share study resources and include an admin page for managing data and additional functionalities.",
			imageSrc: "/img/hafizu-blog.png",
			badges: [
				"Next.js",
				"Typescript",
				"TailwindCSS",
				"PostgreSQL",
				"Shadcn UI",
				"Next Auth",
			],
			githubLink: "https://github.com/apiz23/hafizu-blog",
			visitLink: "https://hafizu-blog.vercel.app/",
		},
		{
			title: "your fsktm candidates",
			description:
				"A website to learn about your FSKTM candidates at UTHM who will be competing in the election 2024/2025",
			imageSrc: "/img/your-fsktm-candidates.png",
			badges: ["Next.js", "Typescript", "TailwindCSS", "Shadcn UI"],
			githubLink: "https://github.com/apiz23/your-fsktm-candidates",
			visitLink: "https://your-fsktm-candidates.vercel.app/",
		},
		{
			title: "random quotes anime",
			description:
				"A website that provides random anime quotes to inspire and entertain fans.",
			imageSrc: "/img/random-quotes-anime.png",
			badges: ["Next.js", "Typescript", "TailwindCSS", "Shadcn UI"],
			githubLink: "https://github.com/apiz23/random-quote-anime",
			visitLink: "https://random-quote-anime.vercel.app/quotes",
		},
		{
			title: "space and equipment booking system UTHM Pagoh",
			description:
				"A space and equipment booking system for UTHM Pagoh, developed as my final year diploma project.",
			imageSrc: "/img/fyp-dip.png",
			badges: ["React.js", "Bootstrap 5", "Email.js", "SCSS"],
			githubLink: "https://github.com/apiz23/Fyp-dip",
			visitLink: "https://space-equipment.vercel.app/home",
		},
	];

	return (
		<>
			<section className="pt-[70%] md:pt-[15%] mb-10">
				<div className="text-center" ref={gradualSpaceRef}>
					<TypingAnimation
						className="scroll-m-20 text-6xl uppercase font-extrabold tracking-tight md:text-[12vh]"
						text="Project Showcase"
					/>
				</div>
			</section>
			<div className="min-h-screen pt-[10%] pb-20">
				{projects.map((project, index) => (
					<div key={index} className="block max-w-3xl mx-auto p-2 md:p-0 mt-10">
						<Image
							alt={project.title}
							src={project.imageSrc}
							className="w-full object-cover"
							width={2000}
							height={2000}
						/>
						<div className="p-4">
							<div className="mt-2 flex flex-wrap gap-1">
								{project.badges.map((badge, badgeIndex) => (
									<Badge key={badgeIndex}>{badge}</Badge>
								))}
							</div>
							<h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl capitalize">
								{project.title}
							</h3>
							<p className="mt-2 text-gray-700 text-justify">{project.description}</p>
							<div className="flex justify-between md:justify-end gap-2 py-5">
								<Link href={project.githubLink} target="_blank" className="flex-1">
									<Button variant="outline" className="w-full">
										GitHub
									</Button>
								</Link>
								<Link href={project.visitLink} target="_blank" className="flex-1">
									<Button variant="outline" className="w-full">
										Visit
									</Button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
