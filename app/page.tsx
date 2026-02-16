"use client";

import Project from "@/components/Project";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Intro from "@/components/Intro";

export default function Home() {
	return (
		<main>
			<div className="relative z-0">
				<Intro />
				<Education />
				<Experience />
				<Project />
				<Contact />
			</div>

			{/* Optional: Sticky Cursor (uncomment if you want it) */}
			{/* <StickyCursor /> */}
		</main>
	);
}
