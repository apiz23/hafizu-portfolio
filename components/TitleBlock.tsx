"use client";

import { motion } from "framer-motion";
import { useActiveSection } from "@/lib/use-active-section";

const sheets = [
	{ id: "home", label: "Intro" },
	{ id: "skills", label: "Skills" },
	{ id: "education", label: "Education" },
	{ id: "experience", label: "Experience" },
	{ id: "projects", label: "Projects" },
	{ id: "contact", label: "Contact" },
];

export default function TitleBlock() {
	const activeId = useActiveSection(sheets);
	const active = sheets.findIndex((s) => s.id === activeId);

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.6, duration: 0.5 }}
			aria-hidden="true"
			className="hidden sm:block fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 select-none"
		>
			<div className="border border-[hsl(var(--border))] bg-[hsl(var(--background))]/90 backdrop-blur-sm rounded-[2px] font-mono text-[10px] leading-tight text-foreground overflow-hidden">
				<div className="px-3 py-1.5 border-b border-[hsl(var(--border))] flex items-center justify-between gap-6">
					<span className="uppercase tracking-[0.1em] text-muted-foreground">Sheet</span>
					<span className="font-semibold">
						{String(active + 1).padStart(2, "0")}/{String(sheets.length).padStart(2, "0")}
					</span>
				</div>
				<div className="px-3 py-1.5 border-b border-[hsl(var(--border))]">
					<span className="uppercase tracking-[0.06em]">{sheets[active].label}</span>
				</div>
				<div className="px-3 py-1.5 flex items-center justify-between gap-6 text-muted-foreground">
					<span>Scale 1:1</span>
					<span>Rev 2026.07</span>
				</div>
				<div className="px-3 py-1.5 border-t border-[hsl(var(--border))] text-muted-foreground">
					Drawn — HF.
				</div>
			</div>
		</motion.div>
	);
}
