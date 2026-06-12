"use client";

import Project from "@/components/Project";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Intro from "@/components/Intro";
import Skills from "@/components/Skills";

export default function Home() {
	return (
		<main>
			<div className="relative z-0">
				<Intro />
				<Skills />
				<Education />
				<Experience />
				<Project />
				<Contact />
			</div>
		</main>
	);
}
