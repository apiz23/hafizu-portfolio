import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypingAnimation from "./magicui/typing-animation";
import WordPullUp from "./magicui/word-pull-up";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
	const wordPullUpRef = useRef(null);

	useEffect(() => {
		if (wordPullUpRef.current) {
			gsap.fromTo(
				wordPullUpRef.current,
				{ opacity: 0, y: 100 },
				{
					opacity: 1,
					y: 0,
					duration: 1.5,
					ease: "power3.out",
					scrollTrigger: {
						trigger: wordPullUpRef.current,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				}
			);
		}
	}, []);

	return (
		<>
			<section className="min-h-screen bg-orange-100">
				<div className="text-center pt-[15%]">
					<TypingAnimation
						className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-[14vh]"
						text="Hafizuddin Hamid"
					/>
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight capitalize my-5">
						software engineering student
					</h4>
				</div>
			</section>
			<section className="min-h-screen bg-orange-100">
				<div className="ms-10 pt-[15%]">
					<div ref={wordPullUpRef} className="max-w-6xl ms-40">
						<WordPullUp
							className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
							words="My Name Is Muhd Hafizuddin, And I am..."
						/>
					</div>
				</div>
			</section>
		</>
	);
}
