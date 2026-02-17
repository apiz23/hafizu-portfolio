import React, { useState } from "react";
import { TextAnimate } from "./ui/text-animate";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
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
		},
		{
			icon: Phone,
			label: "Phone",
			value: "+60 1111263463",
		},
		{
			icon: MapPin,
			label: "Location",
			value: "Johor, Malaysia",
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
			className="relative py-16 md:py-32 overflow-hidden bg-background"
		>
			{/* Simple background */}
			<div className="absolute inset-0 -z-10">
				<div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header - Mobile optimized */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-center mb-12 md:mb-16"
				>
					<div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary mb-4 md:mb-6">
						<Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
						<span className="text-xs md:text-sm font-medium">Get In Touch</span>
					</div>

					<TextAnimate
						animation="slideUp"
						by="word"
						className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 px-2"
					>
						Let's Connect
					</TextAnimate>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2 }}
						className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
					>
						Have a question or want to work together? I'd love to hear from you!
					</motion.p>
				</motion.div>

				{/* Main Content - Mobile first grid */}
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
						{/* Contact Information - Reordered for mobile */}
						<div className="order-2 lg:order-1 space-y-6 md:space-y-8">
							{/* Contact Info Cards */}
							<div>
								<h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 px-1">
									Contact Information
								</h3>
								<div className="space-y-3 md:space-y-4">
									{contactInfo.map((info) => {
										const Icon = info.icon;
										return (
											<div key={info.label} className="block group">
												<Card className="hover:shadow-md transition-shadow">
													<CardContent className="p-3 md:p-5 flex items-center gap-3 md:gap-4">
														<div className="p-2 md:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
															<Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
														</div>
														<div className="min-w-0 flex-1">
															<p className="text-xs md:text-sm text-muted-foreground">
																{info.label}
															</p>
															<p className="text-sm md:text-base text-foreground font-medium group-hover:text-primary transition-colors truncate">
																{info.value}
															</p>
														</div>
													</CardContent>
												</Card>
											</div>
										);
									})}
								</div>
							</div>

							{/* Social Links - Better grid for mobile */}
							<div>
								<h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 px-1">
									Social Media
								</h3>
								<div className="grid grid-cols-3 gap-2 md:gap-4">
									{socialLinks.map((social) => {
										const Icon = social.icon;
										return (
											<Link
												key={social.label}
												href={social.href}
												target="_blank"
												className="group"
											>
												<Card className="hover:shadow-md transition-shadow h-full">
													<CardContent className="p-3 md:p-4 text-center">
														<div className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-1.5 md:mb-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
															<Icon className="h-4 w-4 md:h-6 md:w-6 text-primary" />
														</div>
														<p className="text-xs md:text-sm font-medium text-foreground truncate">
															{social.label}
														</p>
														<p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 md:mt-1 truncate">
															{social.username}
														</p>
													</CardContent>
												</Card>
											</Link>
										);
									})}
								</div>
							</div>
						</div>

						{/* Contact Form - Order first on mobile */}
						<div className="order-1 lg:order-2">
							<Card className="shadow-lg">
								<CardContent className="p-4 md:p-6 lg:p-8">
									<div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
										<div className="p-2 md:p-3 rounded-lg bg-primary/10 flex-shrink-0">
											<MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
										</div>
										<div>
											<h3 className="text-lg md:text-xl lg:text-2xl font-semibold">
												Send a Message
											</h3>
											<p className="text-xs md:text-sm text-muted-foreground">
												I'll get back within 24h
											</p>
										</div>
									</div>

									<form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
											<div>
												<label className="text-xs md:text-sm text-muted-foreground mb-1.5 md:mb-2 block">
													Name
												</label>
												<Input
													type="text"
													name="name"
													placeholder="John Doe"
													required
													className="h-9 md:h-10 text-sm"
												/>
											</div>
											<div>
												<label className="text-xs md:text-sm text-muted-foreground mb-1.5 md:mb-2 block">
													Email
												</label>
												<Input
													type="email"
													name="email"
													placeholder="john@example.com"
													required
													className="h-9 md:h-10 text-sm"
												/>
											</div>
										</div>

										<div>
											<label className="text-xs md:text-sm text-muted-foreground mb-1.5 md:mb-2 block">
												Subject
											</label>
											<Input
												type="text"
												name="subject"
												placeholder="What's this about?"
												required
												className="h-9 md:h-10 text-sm"
											/>
										</div>

										<div>
											<label className="text-xs md:text-sm text-muted-foreground mb-1.5 md:mb-2 block">
												Message
											</label>
											<Textarea
												placeholder="Your message here..."
												rows={4}
												name="message"
												required
												className="text-sm resize-none"
											/>
										</div>

										<Button
											type="submit"
											disabled={formStatus !== "idle"}
											className="w-full h-10 md:h-12 text-sm md:text-base"
											variant="outline"
										>
											{formStatus === "idle" && (
												<>
													Send Message
													<Send className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
												</>
											)}
											{formStatus === "sending" && (
												<>
													Sending...
													<div className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
												</>
											)}
											{formStatus === "sent" && (
												<>
													Message Sent!
													<CheckCircle2 className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
												</>
											)}
										</Button>
									</form>

									<p className="text-center text-xs md:text-sm text-muted-foreground mt-4 md:mt-6">
										Quick email?{" "}
										<Link
											href="mailto:piz230601@gmail.com"
											className="text-primary hover:underline text-xs md:text-sm"
										>
											piz230601@gmail.com
										</Link>
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>

				{/* Footer - Mobile optimized */}
				<motion.footer
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.3 }}
					className="mt-12 md:mt-20 pt-6 md:pt-8 border-t border-border"
				>
					<div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
						<p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
							© {currentYear} Hafizuddin Hamid. All rights reserved.
						</p>

						<div className="flex items-center gap-2 md:gap-4">
							<Button
								variant="ghost"
								size="sm"
								className="h-8 px-2 md:px-3 text-xs md:text-sm"
								asChild
							>
								<Link href="#">Privacy</Link>
							</Button>
							<Button
								variant="ghost"
								size="sm"
								className="h-8 px-2 md:px-3 text-xs md:text-sm"
								asChild
							>
								<Link href="#">Terms</Link>
							</Button>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 md:h-10 md:w-10 rounded-full"
								onClick={scrollToTop}
							>
								<ArrowUp className="h-3.5 w-3.5 md:h-4 md:w-4" />
							</Button>
						</div>
					</div>
				</motion.footer>
			</div>
		</section>
	);
}
