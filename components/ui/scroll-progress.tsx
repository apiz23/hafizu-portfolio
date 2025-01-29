"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps, useScroll, useSpring } from "motion/react";
import React from "react";
interface ScrollProgressProps
	extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

export const ScrollProgress = React.forwardRef<
	HTMLDivElement,
	ScrollProgressProps
>(({ className, ...props }, ref) => {
	const { scrollYProgress } = useScroll();

	const scaleX = useSpring(scrollYProgress, {
		stiffness: 200,
		damping: 50,
		restDelta: 0.001,
	});

	return (
		<motion.div
			ref={ref}
			className={cn(
				"fixed inset-x-0 top-0 z-[1000] h-1 origin-left bg-gradient-to-r from-teal-500 via-purple-600 to-blue-600",
				className
			)}
			style={{
				scaleX,
			}}
			{...props}
		/>
	);
});

ScrollProgress.displayName = "ScrollProgress";
