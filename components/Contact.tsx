import React, { useState } from "react";
import { TextAnimate } from "./ui/text-animate";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import {
	Mail,
	Phone,
	MapPin,
	Send,
	Github,
	Linkedin,
	Sparkles,
	Download,
	ArrowUp,
	CheckCircle2,
	MessageCircle,
	Zap,
	Heart,
	Rocket,
	Globe,
	Clock,
	Coffee,
} from "lucide-react";
import Link from "next/link";
import { RiTwitterXFill } from "react-icons/ri";

export default function Contact() {
	const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
		"idle",
	);
	const currentYear = new Date().getFullYear();

	const contactInfo = [
		{
			icon: Mail,
			label: "Email",
			value: "hafizuddin@example.com",
			href: "mailto:hafizuddin@example.com",
			color: "text-primary",
			bgColor: "bg-primary/10",
			hoverBg: "group-hover:bg-primary/20",
		},
		{
			icon: Phone,
			label: "Phone",
			value: "+60 12-345 6789",
			href: "tel:+60123456789",
			color: "text-secondary",
			bgColor: "bg-secondary/10",
			hoverBg: "group-hover:bg-secondary/20",
		},
		{
			icon: MapPin,
			label: "Location",
			value: "Kuala Lumpur, Malaysia",
			href: "https://maps.google.com/?q=Kuala+Lumpur+Malaysia",
			color: "text-accent",
			bgColor: "bg-accent/10",
			hoverBg: "group-hover:bg-accent/20",
		},
	];

	const socialLinks = [
		{
			icon: Github,
			href: "https://github.com/apiz23",
			label: "GitHub",
			username: "@apiz23",
			color: "text-primary",
			bgColor: "bg-primary/10",
			hoverColor: "hover:text-primary",
			hoverBg: "hover:bg-primary/20",
		},
		{
			icon: Linkedin,
			href: "https://linkedin.com/in/hafizuddin",
			label: "LinkedIn",
			username: "hafizuddin",
			color: "text-secondary",
			bgColor: "bg-secondary/10",
			hoverColor: "hover:text-secondary",
			hoverBg: "hover:bg-secondary/20",
		},
		{
			icon: RiTwitterXFill,
			href: "https://x.com/piz230601",
			label: "X (Twitter)",
			username: "@piz230601",
			color: "text-accent",
			bgColor: "bg-accent/10",
			hoverColor: "hover:text-accent",
			hoverBg: "hover:bg-accent/20",
		},
	];

	const quickLinks = [
		{ label: "Home", href: "#home", icon: "🏠", color: "text-primary" },
		{ label: "Projects", href: "#projects", icon: "💻", color: "text-secondary" },
		{
			label: "Experience",
			href: "#experience",
			icon: "⚡",
			color: "text-accent",
		},
		{ label: "Education", href: "#education", icon: "📚", color: "text-primary" },
	];

	const funFacts = [
		{
			icon: <Clock className="h-3.5 w-3.5" />,
			text: "Reply within 24h",
			color: "text-primary",
			bgColor: "bg-primary/10",
		},
		{
			icon: <Heart className="h-3.5 w-3.5" />,
			text: "Open to collabs",
			color: "text-secondary",
			bgColor: "bg-secondary/10",
		},
		{
			icon: <Coffee className="h-3.5 w-3.5" />,
			text: "Coffee lover",
			color: "text-accent",
			bgColor: "bg-accent/10",
		},
		{
			icon: <Rocket className="h-3.5 w-3.5" />,
			text: "Available now",
			color: "text-primary",
			bgColor: "bg-primary/10",
		},
	];

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormStatus("sending");
		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 1500));
		setFormStatus("sent");
		// Reset after 3 seconds
		setTimeout(() => setFormStatus("idle"), 3000);
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			<section
				id="contact"
				className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-background"
			>
				{/* Background decorations with more color */}
				<div className="absolute inset-0 -z-10">
					{/* Colored orbs */}
					<div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
					<div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />

					{/* Decorative dots pattern */}
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
							backgroundSize: "40px 40px",
							opacity: 0.1,
						}}
					/>
				</div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
					{/* Section Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="text-center mb-12 md:mb-16"
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20 backdrop-blur-sm">
							<Sparkles className="h-4 w-4 text-primary" />
							<span className="text-sm font-medium">Let's Connect</span>
						</div>

						<TextAnimate
							animation="slideUp"
							by="word"
							className="scroll-m-20 text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-foreground"
						>
							Get In Touch
						</TextAnimate>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2, duration: 0.5 }}
							className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto"
						>
							Have a question or want to work together?{" "}
							<span className="text-primary font-semibold">
								I'd love to hear from you!
							</span>
						</motion.p>

						{/* Fun Facts Strip - Improved with colored backgrounds */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.3, duration: 0.5 }}
							className="flex flex-wrap justify-center gap-3 mt-8"
						>
							{funFacts.map((fact, index) => (
								<Badge
									key={index}
									variant="outline"
									className={`px-4 py-2 border-none ${fact.bgColor} hover:scale-105 transition-all duration-300 cursor-default group shadow-sm`}
								>
									<span
										className={`mr-1.5 ${fact.color} group-hover:scale-110 transition-transform`}
									>
										{fact.icon}
									</span>
									<span className="text-sm text-foreground">{fact.text}</span>
								</Badge>
							))}
						</motion.div>
					</motion.div>

					{/* Main Content Grid */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="max-w-6xl mx-auto"
					>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
							{/* Contact Information - Left Side */}
							<div className="space-y-8">
								{/* Contact Cards - Improved with colored icons */}
								<motion.div variants={itemVariants}>
									<h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
										<span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
											<Mail className="h-4 w-4 text-primary" />
										</span>
										<span className="text-foreground">Contact Information</span>
									</h3>
									<div className="space-y-4">
										{contactInfo.map((info) => {
											const Icon = info.icon;
											return (
												<motion.div
													key={info.label}
													whileHover={{ x: 8 }}
													transition={{ type: "spring", stiffness: 300 }}
												>
													<Link
														href={info.href}
														target={info.label === "Location" ? "_blank" : undefined}
														rel={
															info.label === "Location" ? "noopener noreferrer" : undefined
														}
														className="block"
													>
														<Card className="group bg-card border border-border hover:border-transparent hover:shadow-lg transition-all duration-300 relative overflow-hidden">
															{/* Hover color overlay */}
															<div
																className={`absolute inset-0 ${info.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
															/>
															<CardContent className="p-5 flex items-center gap-4 relative">
																<div
																	className={`p-3 rounded-xl ${info.bgColor} ${info.hoverBg} group-hover:scale-110 transition-all duration-300 shadow-sm`}
																>
																	<Icon className={`h-5 w-5 ${info.color}`} />
																</div>
																<div>
																	<p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
																		{info.label}
																	</p>
																	<p
																		className={`text-foreground font-medium group-hover:${info.color} transition-colors`}
																	>
																		{info.value}
																	</p>
																</div>
															</CardContent>
														</Card>
													</Link>
												</motion.div>
											);
										})}
									</div>
								</motion.div>

								{/* Social Links - Improved with colored backgrounds */}
								<motion.div variants={itemVariants}>
									<h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
										<span className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
											<Globe className="h-4 w-4 text-secondary" />
										</span>
										<span className="text-foreground">Connect With Me</span>
									</h3>
									<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
										{socialLinks.map((social) => {
											const Icon = social.icon;
											return (
												<motion.div
													key={social.label}
													whileHover={{ y: -4 }}
													whileTap={{ scale: 0.98 }}
												>
													<Link
														href={social.href}
														target="_blank"
														rel="noopener noreferrer"
														className="block"
													>
														<Card className="group bg-card border border-border hover:border-transparent hover:shadow-lg transition-all duration-300 overflow-hidden">
															<CardContent className="p-5 text-center relative">
																{/* Colored background on hover */}
																<div
																	className={`absolute inset-0 ${social.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
																/>
																<div className="relative">
																	<div
																		className={`w-12 h-12 mx-auto mb-3 rounded-xl ${social.bgColor} group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-sm`}
																	>
																		<Icon className={`h-6 w-6 ${social.color}`} />
																	</div>
																	<p className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors">
																		{social.label}
																	</p>
																	<p className="text-xs text-muted-foreground mt-1">
																		{social.username}
																	</p>
																</div>
															</CardContent>
														</Card>
													</Link>
												</motion.div>
											);
										})}
									</div>
								</motion.div>

								{/* Quick Links - Improved with emoji icons */}
								<motion.div variants={itemVariants}>
									<h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
										<span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
											<Zap className="h-4 w-4 text-accent" />
										</span>
										<span className="text-foreground">Quick Links</span>
									</h3>
									<div className="flex flex-wrap gap-2">
										{quickLinks.map((link) => (
											<Link key={link.label} href={link.href}>
												<Badge
													variant="outline"
													className="px-4 py-2 border-border bg-card/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer group"
												>
													<span className="mr-1.5 text-lg group-hover:scale-110 transition-transform">
														{link.icon}
													</span>
													<span
														className={`text-foreground group-hover:${link.color} transition-colors`}
													>
														{link.label}
													</span>
												</Badge>
											</Link>
										))}
									</div>
								</motion.div>
							</div>

							{/* Contact Form - Right Side */}
							<motion.div variants={itemVariants}>
								<Card className="bg-card border border-border shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
									{/* Decorative elements with color */}
									<div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
									<div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-full blur-2xl" />
									<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/5 rounded-full blur-2xl" />

									<CardContent className="p-6 md:p-8 relative">
										<div className="flex items-center gap-3 mb-6">
											<div className="p-3 rounded-xl bg-primary shadow-md">
												<MessageCircle className="h-5 w-5 text-primary-foreground" />
											</div>
											<div>
												<h3 className="text-2xl font-bold text-foreground">
													Send a Message
												</h3>
												<p className="text-sm text-muted-foreground">
													I'll get back to you within 24h
												</p>
											</div>
										</div>

										<form onSubmit={handleSubmit} className="space-y-5">
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<div className="space-y-2">
													<label className="text-sm text-muted-foreground flex items-center gap-1">
														<span className="text-primary">*</span> Name
													</label>
													<Input
														type="text"
														placeholder="John Doe"
														className="bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
														required
													/>
												</div>
												<div className="space-y-2">
													<label className="text-sm text-muted-foreground flex items-center gap-1">
														<span className="text-secondary">*</span> Email
													</label>
													<Input
														type="email"
														placeholder="john@example.com"
														className="bg-background border-input focus:border-secondary focus:ring-1 focus:ring-secondary transition-all duration-300"
														required
													/>
												</div>
											</div>

											<div className="space-y-2">
												<label className="text-sm text-muted-foreground flex items-center gap-1">
													<span className="text-accent">*</span> Subject
												</label>
												<Input
													type="text"
													placeholder="What's this about?"
													className="bg-background border-input focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
													required
												/>
											</div>

											<div className="space-y-2">
												<label className="text-sm text-muted-foreground flex items-center gap-1">
													<span className="text-primary">*</span> Message
												</label>
												<Textarea
													placeholder="Your message here..."
													rows={4}
													className="bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 resize-none"
													required
												/>
											</div>

											<Button
												type="submit"
												disabled={formStatus !== "idle"}
												className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl transition-all duration-300 group relative overflow-hidden h-12"
											>
												<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
												{formStatus === "idle" && (
													<span className="flex items-center justify-center relative z-10">
														Send Message
														<Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
													</span>
												)}
												{formStatus === "sending" && (
													<span className="flex items-center justify-center relative z-10">
														Sending...
														<div className="ml-2 h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
													</span>
												)}
												{formStatus === "sent" && (
													<span className="flex items-center justify-center relative z-10">
														Message Sent!
														<CheckCircle2 className="ml-2 h-4 w-4 animate-bounce" />
													</span>
												)}
											</Button>
										</form>

										{/* Alternative contact */}
										<div className="flex items-center justify-center gap-2 mt-6 text-sm">
											<span className="text-muted-foreground">Quick email:</span>
											<Link
												href="mailto:hafizuddin@example.com"
												className="text-primary hover:text-primary/80 font-medium hover:underline transition-colors inline-flex items-center gap-1"
											>
												<Mail className="h-3 w-3" />
												hafizuddin@example.com
											</Link>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</div>
					</motion.div>

					{/* Footer Bottom Bar */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.5, duration: 0.5 }}
						className="mt-20 pt-8 border-t border-border/30"
					>
						<div className="flex flex-col md:flex-row justify-between items-center gap-4">
							<div className="text-sm text-muted-foreground">
								© {currentYear}{" "}
								<span className="text-primary font-semibold">Hafizuddin Hamid</span>.
								All rights reserved.
							</div>

							<div className="flex items-center gap-4">
								<Button
									variant="ghost"
									size="sm"
									className="text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
									asChild
								>
									<Link href="#">Privacy Policy</Link>
								</Button>
								<Button
									variant="ghost"
									size="sm"
									className="text-muted-foreground hover:text-secondary hover:bg-secondary/5 transition-colors"
									asChild
								>
									<Link href="#">Terms of Service</Link>
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="rounded-full border-border hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-300 group"
									onClick={scrollToTop}
								>
									<ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
								</Button>
							</div>
						</div>
					</motion.div>
				</div>
			</section>
		</>
	);
}
