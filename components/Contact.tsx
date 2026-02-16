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
	ArrowUp,
	CheckCircle2,
	MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { RiTiktokFill } from "react-icons/ri";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function Contact() {
	const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
		"idle",
	);
	const currentYear = new Date().getFullYear();

	const contactInfo = [
		{
			icon: Mail,
			label: "Email",
			value: "piz230601@gmail.com",
			href: "mailto:piz230601@gmail.com",
		},
		{
			icon: Phone,
			label: "Phone",
			value: "+60 1111263463",
			href: "tel:+0601111263463",
		},
		{
			icon: MapPin,
			label: "Location",
			value: "Kuala Lumpur, Malaysia",
			href: "https://maps.google.com/?q=Kuala+Lumpur+Malaysia",
		},
	];

	const socialLinks = [
		{
			icon: Github,
			href: "https://github.com/apiz23",
			label: "GitHub",
			username: "@apiz23",
		},
		{
			icon: Linkedin,
			href: "https://www.linkedin.com/in/muh-hafizuddin/",
			label: "LinkedIn",
			username: "muh_hafizuddin",
		},
		{
			icon: RiTiktokFill,
			href: "https://www.tiktok.com/@hafizu_2",
			label: "TikTok",
			username: "@hafizu_2",
		},
	];

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

	const fireConfetti = () => {
		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const formData = new FormData(form);

		const payload = {
			name: formData.get("name"),
			email: formData.get("email"),
			subject: formData.get("subject"),
			message: formData.get("message"),
		};

		const sendPromise = fetch("/api/send-email", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		}).then((res) => {
			if (!res.ok) throw new Error("Failed");
			return res.json();
		});

		setFormStatus("sending");

		toast.promise(sendPromise, {
			loading: "Sending your message...",
			success: () => {
				setFormStatus("sent");
				fireConfetti();
				form.reset();
				setTimeout(() => setFormStatus("idle"), 3000);
				return "Message sent successfully!";
			},
			error: "Failed to send message. Try again.",
		});
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<section
			id="contact"
			className="relative py-20 md:py-32 overflow-hidden bg-background"
		>
			{/* Simple background */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
						<Sparkles className="h-4 w-4" />
						<span className="text-sm font-medium">Get In Touch</span>
					</div>

					<TextAnimate
						animation="slideUp"
						by="word"
						className="text-4xl md:text-6xl font-bold text-foreground mb-6"
					>
						Let's Connect
					</TextAnimate>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="text-muted-foreground text-lg max-w-2xl mx-auto"
					>
						Have a question or want to work together? I'd love to hear from you!
					</motion.p>
				</motion.div>

				{/* Main Content */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="max-w-6xl mx-auto"
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
						{/* Contact Information */}
						<motion.div variants={itemVariants} className="space-y-8">
							<div>
								<h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
								<div className="space-y-4">
									{contactInfo.map((info) => {
										const Icon = info.icon;
										return (
											<Link
												key={info.label}
												href={info.href}
												target={info.label === "Location" ? "_blank" : undefined}
												className="block group"
											>
												<Card className="hover:shadow-md transition-shadow">
													<CardContent className="p-5 flex items-center gap-4">
														<div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
															<Icon className="h-5 w-5 text-primary" />
														</div>
														<div>
															<p className="text-sm text-muted-foreground">{info.label}</p>
															<p className="text-foreground font-medium group-hover:text-primary transition-colors">
																{info.value}
															</p>
														</div>
													</CardContent>
												</Card>
											</Link>
										);
									})}
								</div>
							</div>

							<div>
								<h3 className="text-2xl font-semibold mb-6">Social Media</h3>
								<div className="grid grid-cols-3 gap-4">
									{socialLinks.map((social) => {
										const Icon = social.icon;
										return (
											<Link
												key={social.label}
												href={social.href}
												target="_blank"
												className="group"
											>
												<Card className="hover:shadow-md transition-shadow">
													<CardContent className="p-4 text-center">
														<div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
															<Icon className="h-6 w-6 text-primary" />
														</div>
														<p className="text-sm font-medium text-foreground">
															{social.label}
														</p>
														<p className="text-xs text-muted-foreground mt-1">
															{social.username}
														</p>
													</CardContent>
												</Card>
											</Link>
										);
									})}
								</div>
							</div>
						</motion.div>

						{/* Contact Form */}
						<motion.div variants={itemVariants}>
							<Card className="shadow-lg">
								<CardContent className="p-6 md:p-8">
									<div className="flex items-center gap-3 mb-6">
										<div className="p-3 rounded-lg bg-primary/10">
											<MessageCircle className="h-5 w-5 text-primary" />
										</div>
										<div>
											<h3 className="text-2xl font-semibold">Send a Message</h3>
											<p className="text-sm text-muted-foreground">
												I'll get back to you within 24 hours
											</p>
										</div>
									</div>

									<form onSubmit={handleSubmit} className="space-y-5">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											<div>
												<label className="text-sm text-muted-foreground mb-2 block">
													Name
												</label>
												<Input type="text" name="name" placeholder="John Doe" required />
											</div>
											<div>
												<label className="text-sm text-muted-foreground mb-2 block">
													Email
												</label>
												<Input
													type="email"
													name="email"
													placeholder="john@example.com"
													required
												/>
											</div>
										</div>

										<div>
											<label className="text-sm text-muted-foreground mb-2 block">
												Subject
											</label>
											<Input
												type="text"
												name="subject"
												placeholder="What's this about?"
												required
											/>
										</div>

										<div>
											<label className="text-sm text-muted-foreground mb-2 block">
												Message
											</label>
											<Textarea
												placeholder="Your message here..."
												rows={4}
												name="message"
												required
											/>
										</div>

										<Button
											type="submit"
											disabled={formStatus !== "idle"}
											className="w-full h-12 text-base"
										>
											{formStatus === "idle" && (
												<>
													Send Message
													<Send className="ml-2 h-4 w-4" />
												</>
											)}
											{formStatus === "sending" && (
												<>
													Sending...
													<div className="ml-2 h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
												</>
											)}
											{formStatus === "sent" && (
												<>
													Message Sent!
													<CheckCircle2 className="ml-2 h-4 w-4" />
												</>
											)}
										</Button>
									</form>

									<p className="text-center text-sm text-muted-foreground mt-6">
										Quick email?{" "}
										<Link
											href="mailto:piz230601@gmail.com"
											className="text-primary hover:underline"
										>
											piz230601@gmail.com
										</Link>
									</p>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</motion.div>

				{/* Footer */}
				<motion.footer
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
					className="mt-20 pt-8 border-t border-border"
				>
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-sm text-muted-foreground">
							© {currentYear} Hafizuddin Hamid. All rights reserved.
						</p>

						<div className="flex items-center gap-4">
							<Button variant="ghost" size="sm" asChild>
								<Link href="#">Privacy</Link>
							</Button>
							<Button variant="ghost" size="sm" asChild>
								<Link href="#">Terms</Link>
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="rounded-full"
								onClick={scrollToTop}
							>
								<ArrowUp className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</motion.footer>
			</div>
		</section>
	);
}
