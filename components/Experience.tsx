"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "./ui/badge";
import {
	CalendarIcon,
	MapPinIcon,
	BriefcaseIcon,
	LoaderIcon,
	Building2,
	CheckCircle2,
	Code2,
	Sparkles,
	Rocket,
	TrendingUp,
	Users,
	GitBranch,
	Zap,
	Award,
	Clock,
	Target,
	Camera,
	ChevronRight,
} from "lucide-react";
import { TextAnimate } from "./ui/text-animate";
import { motion } from "framer-motion";
import Image from "next/image";
import intern1 from "@/public/img/intern1.jpeg";
import intern2 from "@/public/img/intern2.jpg";
import intern4 from "@/public/img/intern4.jpg";
import intern5 from "@/public/img/intern5.jpg";
import { Card, CardContent } from "./ui/card";

export default function Experience() {
	const experiences = [
		{
			company: "Xeersoft",
			position: "Software Developer Intern",
			period: "2023 - 2024",
			duration: "6 months",
			location: "Office - Bukit Indah, Johor Bahru",
			logo:
				"https://media.glassdoor.com/sql/508401/xeersoft-squarelogo-1432219510383.png",
			description:
				"Worked as Software Developer Intern maintaining a QR code system named 'Tokopak'. Analyzed, designed, and developed new functionalities and features for the existing system.",
			achievements: [
				"Implemented 5+ new features for the Tokopak QR system",
				"Improved system performance by 30% through code optimization",
				"Collaborated with cross-functional teams to deliver features on schedule",
				"Participated in daily stand-ups and agile development processes",
			],
			technologies: [
				"React",
				"JQuery",
				"PostgreSQL",
				"Laravel",
				"Git",
				"Docker",
				"REST API",
			],
			highlights: [
				"Reduced bug reports by 40%",
				"Documented 15+ API endpoints",
				"Mentored 2 junior developers",
			],
		},
	];

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const memoryImages = [
		{
			src: intern1,
			caption: "Annual Grand meeting at Xeersoft",
			location: "Bukit Indah, Johor Bahru",
		},
		{
			src: intern2,
			caption: "Christmas celebration",
			location: "Bukit Indah, Johor Bahru",
		},
		{ src: intern4, caption: "Project presentation", location: "Virtual" },
		{ src: intern5, caption: "Project presentation", location: "Virtual" },
	];

	return (
		<section
			id="experience"
			className="relative py-20 md:py-32 bg-background overflow-hidden"
		>
			<div className="container mx-auto px-4 relative z-10">
				{/* Header Section */}
				<div className="text-center mb-16">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<Badge
							variant="outline"
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 text-primary border-primary/30 mb-6 hover:scale-105 transition-transform backdrop-blur-sm"
						>
							<BriefcaseIcon className="h-5 w-5 animate-pulse" />
							<span className="text-sm font-medium tracking-wide text-primary">
								Professional Journey
							</span>
							<Sparkles className="h-4 w-4 text-accent animate-spin-slow" />
						</Badge>
					</motion.div>

					<div className="relative mb-6">
						<TextAnimate
							animation="slideUp"
							by="word"
							className="scroll-m-20 text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter"
						>
							Work Experience
						</TextAnimate>

						{/* Glow effect */}
						<div className="absolute inset-0 -z-10 blur-3xl opacity-50">
							<div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />
						</div>
					</div>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.5 }}
						className="text-muted-foreground mt-6 text-lg max-w-2xl mx-auto tracking-wide"
					>
						My professional journey and the valuable experiences I've gained
					</motion.p>
				</div>

				<div className="max-w-5xl mx-auto">
					{experiences.map((exp, index) => (
						<motion.div
							key={exp.company}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							viewport={{ once: true }}
							whileHover={{ y: -4 }}
							className="mb-16"
						>
							<Card className="relative group bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden">
								{/* Animated gradient border */}
								<div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

								{/* Gradient accent line */}
								<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />

								{/* Floating particles */}
								<div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
								<div className="absolute bottom-0 left-0 w-20 h-20 bg-secondary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

								<CardContent className="relative p-6 md:p-8 z-10">
									<div className="flex flex-col md:flex-row gap-6">
										{/* Logo with enhanced animation */}
										<motion.div
											className="flex-shrink-0"
											whileHover={{ scale: 1.1, rotate: 5 }}
											transition={{ type: "spring", stiffness: 300 }}
										>
											<div className="relative h-20 w-20 md:h-24 md:w-24 rounded-xl bg-gradient-to-br from-card to-card/50 p-3 shadow-lg border border-border/50 group-hover:border-primary/30 transition-colors overflow-hidden">
												<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
												<img
													src={exp.logo}
													alt={exp.company}
													className="relative h-full w-full object-contain z-10"
												/>
											</div>
										</motion.div>

										{/* Content */}
										<div className="flex-1">
											<div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
												<div>
													<h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
														{exp.company}
														<motion.span
															initial={{ opacity: 0, scale: 0 }}
															whileInView={{ opacity: 1, scale: 1 }}
															transition={{ delay: 0.3 }}
														>
															<Award className="h-5 w-5 text-accent" />
														</motion.span>
													</h3>
													<p className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text">
														{exp.position}
													</p>
												</div>
												<Badge
													variant="secondary"
													className="text-sm py-1.5 px-4 bg-gradient-to-r from-secondary/20 to-secondary/5 text-secondary border-secondary/30 backdrop-blur-sm"
												>
													<Clock className="h-3 w-3 mr-1" />
													{exp.period}
												</Badge>
											</div>

											{/* Metadata with improved styling */}
											<div className="flex flex-wrap gap-3 mb-4">
												<div className="flex items-center gap-1.5 bg-muted/30 px-3 py-1.5 rounded-full border border-border/50 backdrop-blur-sm">
													<CalendarIcon className="h-4 w-4 text-primary" />
													<span className="text-sm text-muted-foreground">
														{exp.duration}
													</span>
												</div>
												<div className="flex items-center gap-1.5 bg-muted/30 px-3 py-1.5 rounded-full border border-border/50 backdrop-blur-sm">
													<MapPinIcon className="h-4 w-4 text-secondary" />
													<span className="text-sm text-muted-foreground">
														{exp.location}
													</span>
												</div>
												<div className="flex items-center gap-1.5 bg-muted/30 px-3 py-1.5 rounded-full border border-border/50 backdrop-blur-sm">
													<BriefcaseIcon className="h-4 w-4 text-accent" />
													<span className="text-sm text-muted-foreground">Internship</span>
												</div>
											</div>

											{/* Quick highlights with enhanced styling */}
											<motion.div
												variants={containerVariants}
												initial="hidden"
												whileInView="visible"
												viewport={{ once: true }}
												className="flex flex-wrap gap-2 mb-4"
											>
												{exp.highlights.map((highlight, i) => (
													<motion.div key={i} variants={itemVariants}>
														<Badge
															variant="outline"
															className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300 backdrop-blur-sm group/badge"
														>
															<CheckCircle2 className="h-3 w-3 mr-1 text-secondary" />
															{highlight}
															<ChevronRight className="h-3 w-3 ml-1 opacity-0 group-hover/badge:opacity-100 group-hover/badge:translate-x-1 transition-all" />
														</Badge>
													</motion.div>
												))}
											</motion.div>

											{/* Accordion details with enhanced styling */}
											<Accordion type="single" collapsible className="w-full">
												<AccordionItem value="details" className="border-border/50">
													<AccordionTrigger className="text-primary hover:text-secondary py-3 hover:no-underline group/trigger">
														<span className="flex items-center gap-2">
															<Rocket className="h-4 w-4 text-accent group-hover/trigger:animate-bounce" />
															<span>View full details</span>
															<Building2 className="h-4 w-4 opacity-0 group-hover/trigger:opacity-100 transition-opacity" />
														</span>
													</AccordionTrigger>
													<AccordionContent>
														<motion.div
															initial={{ opacity: 0, y: -10 }}
															animate={{ opacity: 1, y: 0 }}
															transition={{ duration: 0.3 }}
															className="space-y-6 pt-4"
														>
															{/* Description with quote style */}
															<div className="relative pl-4 border-l-4 border-gradient-to-b from-primary to-secondary">
																<p className="text-muted-foreground leading-relaxed italic">
																	{exp.description}
																</p>
															</div>

															{/* Key Achievements with progress bars */}
															<div>
																<h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
																	<span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
																	<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text">
																		Key Achievements
																	</span>
																</h4>
																<ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
																	{exp.achievements.map((achievement, i) => (
																		<motion.li
																			key={i}
																			initial={{ opacity: 0, x: -10 }}
																			whileInView={{ opacity: 1, x: 0 }}
																			transition={{ delay: i * 0.1 }}
																			viewport={{ once: true }}
																			whileHover={{ x: 5 }}
																			className="flex items-start gap-2 text-muted-foreground group/achievement"
																		>
																			<CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5 group-hover/achievement:scale-110 transition-transform" />
																			<span className="text-sm">{achievement}</span>
																		</motion.li>
																	))}
																</ul>
															</div>

															{/* Technologies with enhanced styling */}
															<div>
																<h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
																	<span className="h-2 w-2 rounded-full bg-secondary animate-pulse delay-300" />
																	<span className="bg-gradient-to-r from-secondary to-accent bg-clip-text">
																		Technologies Used
																	</span>
																</h4>
																<div className="flex flex-wrap gap-2">
																	{exp.technologies.map((tech, i) => (
																		<motion.div
																			key={tech}
																			initial={{ opacity: 0, scale: 0.8 }}
																			whileInView={{ opacity: 1, scale: 1 }}
																			transition={{ delay: i * 0.05 }}
																			viewport={{ once: true }}
																			whileHover={{ scale: 1.1, y: -2 }}
																		>
																			<Badge
																				variant="outline"
																				className="px-3 py-1.5 bg-gradient-to-br from-card to-card/50 border-primary/20 text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-300 backdrop-blur-sm"
																			>
																				<Code2 className="h-3 w-3 mr-1 text-primary" />
																				{tech}
																			</Badge>
																		</motion.div>
																	))}
																</div>
															</div>
														</motion.div>
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}

					{/* Internship Photo Gallery with enhanced styling */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className="mt-20"
					>
						<div className="text-center mb-8">
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
							>
								<Badge
									variant="outline"
									className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border-accent/20 mb-4"
								>
									<Camera className="h-4 w-4" />
									<span className="text-sm">Captured Moments</span>
								</Badge>
							</motion.div>
							<h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
								Internship Memories
							</h3>
							<p className="text-muted-foreground">
								Moments captured during my professional journey
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{memoryImages.map((img, idx) => (
								<motion.div
									key={idx}
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ delay: idx * 0.1 }}
									whileHover={{ y: -8, scale: 1.02 }}
									className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer border border-border/50"
								>
									<div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
										<Image
											src={img.src}
											alt={img.caption}
											className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
										/>
									</div>

									{/* Enhanced overlay */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

									{/* Caption with location */}
									<div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
										<p className="text-white text-sm font-medium flex items-center gap-2">
											<Camera className="h-3 w-3" />
											{img.caption}
										</p>
										<p className="text-white/80 text-xs flex items-center gap-1 mt-1">
											<MapPinIcon className="h-3 w-3" />
											{img.location}
										</p>
									</div>

									{/* Corner accent */}
									<div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-primary to-secondary opacity-0 group-hover:opacity-30 rounded-bl-full transition-opacity duration-300" />
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Skills Summary with enhanced styling */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.6 }}
						className="mt-16"
					>
						<Card className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50">
							<CardContent className="p-6">
								<div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
									<div className="flex items-center gap-3">
										<div className="p-2 rounded-full bg-primary/10">
											<Clock className="h-5 w-5 text-primary" />
										</div>
										<div>
											<p className="text-sm text-muted-foreground">Total Experience</p>
											<p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text">
												{experiences[0].duration}
											</p>
										</div>
									</div>

									<div className="h-12 w-px bg-border/50 hidden md:block" />

									<div className="flex items-center gap-3">
										<div className="p-2 rounded-full bg-secondary/10">
											<Code2 className="h-5 w-5 text-secondary" />
										</div>
										<div>
											<p className="text-sm text-muted-foreground">Technologies Used</p>
											<p className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text">
												{experiences[0].technologies.length}+
											</p>
										</div>
									</div>

									<div className="h-12 w-px bg-border/50 hidden md:block" />

									<div className="flex items-center gap-3">
										<div className="p-2 rounded-full bg-accent/10">
											<TrendingUp className="h-5 w-5 text-accent" />
										</div>
										<div>
											<p className="text-sm text-muted-foreground">Achievements</p>
											<p className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text">
												{experiences[0].achievements.length}
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
