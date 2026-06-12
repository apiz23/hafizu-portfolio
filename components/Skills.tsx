"use client";

import { motion } from "framer-motion";
import {
	SiDocker,
	SiFigma,
	SiGit,
	SiNodedotjs,
	SiPostgresql,
} from "react-icons/si";

const frontend = [
	{ name: "Next.js", fill: 92 },
	{ name: "React", fill: 90 },
	{ name: "Tailwind CSS", fill: 88 },
	{ name: "TypeScript", fill: 82 },
];

const backend = [
	{ name: "Git / GitHub", fill: 90 },
	{ name: "Supabase / PostgreSQL", fill: 78 },
	{ name: "Node.js", fill: 75 },
	{ name: "Docker", fill: 55 },
];

const tools = [
	{ icon: <SiFigma />, label: "Figma" },
	{ icon: <SiGit />, label: "Git" },
	{ icon: <SiNodedotjs />, label: "Node.js" },
	{ icon: <SiPostgresql />, label: "PostgreSQL" },
	{ icon: <SiDocker />, label: "Docker" },
];

function SkillBar({
	name,
	fill,
	delay,
}: {
	name: string;
	fill: number;
	delay: number;
}) {
	return (
		<div className="flex items-center gap-4">
			<span className="text-sm text-muted-foreground w-44 shrink-0">{name}</span>
			<div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
				<motion.div
					className="h-full bg-primary rounded-full"
					initial={{ width: 0 }}
					whileInView={{ width: `${fill}%` }}
					viewport={{ once: true }}
					transition={{ duration: 0.9, delay, ease: "easeOut" }}
				/>
			</div>
		</div>
	);
}

export default function Skills() {
	return (
		<section id="skills" className="py-20 md:py-32 bg-primary/[0.02]">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground mb-16"
				>
					SKILLS
				</motion.h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
					{/* Frontend */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}
					>
						<p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
							Frontend
						</p>
						<div className="flex flex-col gap-6">
							{frontend.map((skill, i) => (
								<SkillBar key={skill.name} {...skill} delay={i * 0.1} />
							))}
						</div>
					</motion.div>

					{/* Backend & Tools */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
					>
						<p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
							Backend & Tools
						</p>
						<div className="flex flex-col gap-6">
							{backend.map((skill, i) => (
								<SkillBar
									key={skill.name}
									{...skill}
									delay={i * 0.1 + 0.1}
								/>
							))}
						</div>
					</motion.div>
				</div>

				{/* Tool icons strip */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.4 }}
					className="mt-14 pt-10 border-t border-border flex flex-wrap gap-8 items-center"
				>
					<span className="text-xs uppercase tracking-widest text-muted-foreground">
						Also use
					</span>
					{tools.map(({ icon, label }) => (
						<div
							key={label}
							className="flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
						>
							<span className="text-xl">{icon}</span>
							<span className="text-xs">{label}</span>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
