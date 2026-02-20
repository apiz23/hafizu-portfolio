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
					className="fixed bottom-6 right-6 z-[9999]"
				>
					<Button
						size="icon"
						onClick={scrollToTop}
						className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-gray-800 to-gray-900 hover:from-blue-600 hover:to-blue-700 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white shadow-xl shadow-gray-900/50 hover:scale-110 transition-all duration-300 group"
						aria-label="Scroll to top"
					>
						<ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-1" />

						{/* Dark ripple effect */}
						<span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />

						{/* Dark tooltip */}
						<span className="absolute -top-10 right-0 bg-gray-900 text-gray-200 text-xs py-1.5 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-gray-700">
							Back to top
						</span>
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
