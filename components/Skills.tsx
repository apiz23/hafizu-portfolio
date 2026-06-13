"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, clipReveal } from "@/lib/animations";
import {
	SiReact,
	SiNextdotjs,
	SiTypescript,
	SiTailwindcss,
	SiNodedotjs,
	SiPostgresql,
	SiDocker,
	SiFigma,
	SiGit,
	SiSupabase,
} from "react-icons/si";

const skills = [
	{ icon: <SiNextdotjs />, name: "Next.js", level: "Advanced" },
	{ icon: <SiReact />, name: "React", level: "Advanced" },
	{ icon: <SiTypescript />, name: "TypeScript", level: "Advanced" },
	{ icon: <SiTailwindcss />, name: "Tailwind CSS", level: "Advanced" },
	{ icon: <SiNodedotjs />, name: "Node.js", level: "Intermediate" },
	{ icon: <SiPostgresql />, name: "PostgreSQL", level: "Intermediate" },
	{ icon: <SiSupabase />, name: "Supabase", level: "Intermediate" },
	{ icon: <SiGit />, name: "Git", level: "Advanced" },
	{ icon: <SiDocker />, name: "Docker", level: "Familiar" },
	{ icon: <SiFigma />, name: "Figma", level: "Familiar" },
];

export default function Skills() {
	const h2Ref = useRef<HTMLHeadingElement>(null);
	const h2InView = useInView(h2Ref, { once: true, margin: "-10%" });
	const gridRef = useRef<HTMLDivElement>(null);
	const gridInView = useInView(gridRef, { once: true });

	return (
		<section
			id="skills"
			className="section-dark py-14 bg-background border-t border-border"
		>
			<div className="max-w-4xl mx-auto px-4 sm:px-8 w-full">
				<div className="flex justify-between items-end mb-8">
					<motion.h2
						ref={h2Ref}
						variants={clipReveal}
						initial="hidden"
						animate={h2InView ? "visible" : "hidden"}
						className="font-serif font-black uppercase tracking-[-0.04em] text-foreground"
						style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
					>
						SKILLS
					</motion.h2>
				</div>

				<div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-[1px] bg-border border border-border rounded-[6px] overflow-hidden">
					{skills.map((skill, index) => (
						<motion.div
							key={skill.name}
							custom={index}
							variants={fadeUp}
							initial="hidden"
							animate={gridInView ? "visible" : "hidden"}
							className="bg-background px-4 py-4 flex flex-col gap-1.5"
						>
							<span className="text-[20px] text-muted-foreground">{skill.icon}</span>
							<span className="font-mono text-[12px] font-bold text-foreground">
								{skill.name}
							</span>
							<span className="font-mono text-[11px] text-muted-foreground">
								{skill.level}
							</span>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
