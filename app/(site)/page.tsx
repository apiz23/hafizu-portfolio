"use client";

import Project from "@/components/Project";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Intro from "@/components/Intro";
import Skills from "@/components/Skills";
import Marquee from "@/components/Marquee";

const marqueeItems = [
  "Next.js",
  "TypeScript",
  "React",
  "PostgreSQL",
  "Node.js",
  "Tailwind CSS",
  "Supabase",
  "System Design",
  "Software Testing",
];

export default function Home() {
	return (
		<main>
			<Intro />
			<Marquee items={marqueeItems} duration={70} />
			<Skills />
			<Education />
			<Experience />
			<Project />
			<Marquee items={marqueeItems} duration={70} reverse />
			<Contact />
		</main>
	);
}