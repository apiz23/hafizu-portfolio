"use client";
import { useEffect, useRef } from "react";
import TypingAnimation from "./magicui/typing-animation";
import gsap from "gsap";

export default function Project() {
	const gradualSpaceRef = useRef(null);

	useEffect(() => {
		if (gradualSpaceRef.current) {
			gsap.fromTo(
				gradualSpaceRef.current,
				{ opacity: 0, y: 100 },
				{
					opacity: 1,
					y: 0,
					duration: 3.5,
					ease: "power4.out",
					scrollTrigger: {
						trigger: gradualSpaceRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				}
			);
		}
	}, []);
	return (
		<>
			<section className="min-h-screen bg-orange-100 pt-[70%] md:pt-[15%]">
				<div className="text-center" ref={gradualSpaceRef}>
					<TypingAnimation
						className="scroll-m-20 text-6xl uppercase font-extrabold tracking-tight md:text-[14vh]"
						text="Project Showcase"
					/>
				</div>
			</section>
		</>
	);
}
