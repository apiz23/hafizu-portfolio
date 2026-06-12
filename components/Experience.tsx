"use client";

import { motion } from "framer-motion";

const experiences = [
	{
		company: "Xeersoft",
		period: "2023 – 2024",
		position: "Software Developer Intern",
		location: "Bukit Indah, Johor Bahru",
		achievements: [
			"Implemented 5+ new features for the Tokopak QR commerce system",
			"Improved system performance by 30% through code optimization",
			"Collaborated with cross-functional teams to deliver features on schedule",
			"Participated in daily stand-ups and agile development processes",
		],
		technologies: [
			"React",
			"jQuery",
			"PostgreSQL",
			"Laravel",
			"Git",
			"Docker",
			"REST API",
		],
	},
];

export default function Experience() {
	return (
		<section id="experience" className="py-20 md:py-32 bg-background">
			<div className="w-full px-8">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter text-foreground mb-16"
				>
					EXPERIENCE
				</motion.h2>

				{experiences.map((exp, index) => (
					<motion.div
						key={exp.company}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1 }}
						className="group border-t border-foreground/10 py-10 hover:bg-primary/[0.02] transition-colors -mx-8 px-8"
					>
						<div className="grid grid-cols-1 md:grid-cols-[180px_1fr_180px] gap-6 items-start">
							{/* Left: year + company */}
							<div>
								<p className="font-mono text-sm text-muted-foreground">
									{exp.period}
								</p>
								<p className="font-mono text-sm font-semibold text-foreground mt-1">
									{exp.company}
								</p>
								<p className="text-xs text-muted-foreground mt-0.5">
									{exp.location}
								</p>
							</div>

							{/* Center: role + achievements */}
							<div>
								<h3 className="text-xl font-bold text-foreground mb-5">
									{exp.position}
								</h3>
								<ul className="space-y-2.5">
									{exp.achievements.map((achievement, i) => (
										<li
											key={i}
											className="flex items-start gap-3 text-sm text-muted-foreground"
										>
											<span className="text-primary mt-0.5 shrink-0 font-mono">
												—
											</span>
											{achievement}
										</li>
									))}
								</ul>
							</div>

							{/* Right: tech tags */}
							<div className="flex flex-wrap gap-1.5 md:justify-end">
								{exp.technologies.map((tech) => (
									<span
										key={tech}
										className="text-xs text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</motion.div>
				))}

				<div className="border-t border-foreground/10" />
			</div>
		</section>
	);
}
