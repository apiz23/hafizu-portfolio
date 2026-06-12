"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
	{ label: "Skills", href: "#skills" },
	{ label: "Education", href: "#education" },
	{ label: "Experience", href: "#experience" },
	{ label: "Work", href: "#projects" },
	{ label: "Contact", href: "#contact" },
];

function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
	e.preventDefault();
	document
		.getElementById(href.replace("#", ""))
		?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [active, setActive] = useState("home");

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 40);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const ids = ["home", "skills", "education", "experience", "projects", "contact"];
		const observers: IntersectionObserver[] = [];

		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (!el) return;
			const obs = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) setActive(id);
				},
				{ rootMargin: "-30% 0px -60% 0px" },
			);
			obs.observe(el);
			observers.push(obs);
		});

		return () => observers.forEach((o) => o.disconnect());
	}, []);

	return (
		<motion.header
			initial={{ opacity: 0, y: -14 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? "bg-background/88 backdrop-blur-md border-b border-foreground/[0.07]"
					: "bg-transparent"
			}`}
		>
			<div className="w-full px-8 h-14 flex items-center justify-between">
				{/* Monogram */}
				<Link
					href="#home"
					onClick={(e) => scrollTo(e, "#home")}
					className="font-mono font-bold text-sm tracking-[0.18em] text-foreground hover:text-primary transition-colors"
					aria-label="Back to top"
				>
					HF.
				</Link>

				{/* Desktop links */}
				<nav
					className="hidden sm:flex items-center gap-7"
					aria-label="Site navigation"
				>
					{navLinks.map(({ label, href }) => {
						const id = href.replace("#", "");
						const isActive = active === id;
						return (
							<Link
								key={href}
								href={href}
								onClick={(e) => scrollTo(e, href)}
								className={`text-[11px] font-mono uppercase tracking-widest transition-colors ${
									isActive
										? "text-foreground"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								{label}
								{isActive && (
									<motion.span
										layoutId="nav-dot"
										className="ml-1 inline-block h-1 w-1 rounded-full bg-primary align-middle"
										transition={{ type: "spring", stiffness: 400, damping: 30 }}
									/>
								)}
							</Link>
						);
					})}
				</nav>

				{/* Mobile: contact only */}
				<Link
					href="#contact"
					onClick={(e) => scrollTo(e, "#contact")}
					className="sm:hidden text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
				>
					Contact
				</Link>
			</div>
		</motion.header>
	);
}
