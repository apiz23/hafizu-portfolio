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
						className="group relative h-10 w-10 rounded-none bg-foreground text-background shadow-none transition-colors duration-200 hover:bg-accent hover:text-accent-foreground border-0"
						aria-label="Back to top"
					>
						<ArrowUp className="h-4 w-4" />

						<span className="absolute bottom-full left-0 mb-2 whitespace-nowrap rounded-none bg-foreground px-2 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-background opacity-0 transition-opacity group-hover:opacity-100">
							Back to top
						</span>
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
