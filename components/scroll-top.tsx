"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const handleScroll = () => setShow(window.scrollY > 300);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ opacity: 0, scale: 0.5, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.5, y: 20 }}
					transition={{ duration: 0.2 }}
					className="fixed bottom-4 left-4 z-30"
				>
					<Button
						size="icon"
						onClick={scrollToTop}
						className="relative w-10 h-10 rounded-[2px] bg-foreground hover:bg-[hsl(var(--redline))] text-background shadow-none transition-colors duration-200 group"
						aria-label="Back to top"
					>
						<ArrowUp className="h-4 w-4" />

						<span className="absolute bottom-full left-0 mb-2 bg-foreground text-background font-mono text-[11px] uppercase tracking-[0.08em] py-1 px-2 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
							Back to top
						</span>
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
