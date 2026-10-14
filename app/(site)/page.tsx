import Project from "@/components/Project";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Intro from "@/components/Intro";
import Skills from "@/components/Skills";
import Marquee from "@/components/Marquee";
import { getEducationData, type EducationData } from "@/lib/education";

// Education data comes from the database. Revalidate periodically so the page
// is served statically (CDN-cached) while the chart still refreshes.
export const revalidate = 300;

const stackItems = [
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

const practiceItems = [
  "Debugging",
  "Test Cases",
  "Bug Reporting",
  "Automation",
  "AI Agents",
  "Documentation",
  "Code Review",
  "Refactoring",
  "Reliability",
];

export default async function Home() {
	let education: EducationData | null = null;
	try {
		education = await getEducationData("bachelor");
	} catch {
		// Fall back to client-side fetch if the database is unreachable.
		education = null;
	}

	return (
		<main>
			<Intro />
			<Marquee items={stackItems} duration={70} />
			<Skills />
			<Education initialData={education} />
			<Experience />
			<Project />
			<Marquee items={practiceItems} duration={70} reverse />
			<Contact />
		</main>
	);
}
