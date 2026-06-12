"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { RiTwitterXFill } from "react-icons/ri";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function Contact() {
	const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
		"idle",
	);
	const currentYear = new Date().getFullYear();

	const fireConfetti = () => {
		confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
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

	return (
		<section id="contact" className="py-20 md:py-32 bg-background">
			<div className="max-w-5xl mx-auto px-8 w-full">
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-5xl md:text-7xl font-serif font-black uppercase tracking-tighter text-foreground mb-6"
				>
					LET&apos;S WORK TOGETHER.
				</motion.h2>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.1 }}
					className="mb-12"
				>
					<Link
						href="mailto:piz230601@gmail.com"
						className="text-lg md:text-2xl text-muted-foreground hover:text-primary transition-colors font-mono"
					>
						piz230601@gmail.com
					</Link>
				</motion.div>

				{/* Inline contact form */}
				<motion.form
					onSubmit={handleSubmit}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.15 }}
					className="space-y-4 max-w-xl mb-16"
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label htmlFor="contact-name" className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">
								Name
							</label>
							<Input
								id="contact-name"
								type="text"
								name="name"
								placeholder="John Doe"
								required
							/>
						</div>
						<div>
							<label htmlFor="contact-email" className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">
								Email
							</label>
							<Input
								id="contact-email"
								type="email"
								name="email"
								placeholder="john@example.com"
								required
							/>
						</div>
					</div>

					<div>
						<label htmlFor="contact-subject" className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">
							Subject
						</label>
						<Input
							id="contact-subject"
							type="text"
							name="subject"
							placeholder="What's this about?"
							required
						/>
					</div>

					<div>
						<label htmlFor="contact-message" className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">
							Message
						</label>
						<Textarea
							id="contact-message"
							placeholder="Your message..."
							rows={4}
							name="message"
							required
							className="resize-none"
						/>
					</div>

					<Button
						type="submit"
						disabled={formStatus !== "idle"}
						className="rounded-full px-8"
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
				</motion.form>

				{/* Social row + footer */}
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: 0.2 }}
					className="border-t border-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
				>
					<div className="flex items-center gap-6">
						<Link
							href="https://github.com/apiz23"
							target="_blank"
							aria-label="GitHub"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<Github className="h-5 w-5" />
						</Link>
						<Link
							href="https://www.linkedin.com/in/muh-hafizuddin/"
							target="_blank"
							aria-label="LinkedIn"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<Linkedin className="h-5 w-5" />
						</Link>
						<Link
							href="https://x.com/piz230601"
							target="_blank"
							aria-label="Twitter / X"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<RiTwitterXFill className="h-5 w-5" />
						</Link>
					</div>
					<p className="text-xs text-muted-foreground font-mono">
						© {currentYear} Hafizuddin Hamid
					</p>
				</motion.div>
			</div>
		</section>
	);
}
