"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypingAnimation from "./magicui/typing-animation";
import BoxReveal from "./magicui/box-reveal";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { BorderBeam } from "./magicui/border-beam";
import { LinkPreview } from "./link-preview";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
	const wordPullUpRef = useRef(null);
	const gradualSpaceRef = useRef(null);
	const biodata = [
		<img
			src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
			alt="TypeScript Logo"
			key="typescript-logo"
		/>,
		<img
			src="https://upload.wikimedia.org/wikipedia/commons/9/95/UTHM_Logo.png"
			alt="UTHM Logo"
			className="h-full w-full"
			key="uthm-logo"
		/>,
	];
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
			<section className="h-screen bg-orange-100">
				<div className="text-center pt-[50%] md:pt-[15%]">
					<TypingAnimation
						className="scroll-m-20 text-6xl font-extrabold tracking-tight md:text-[14vh]"
						text="Hafizuddin Hamid"
					/>
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight capitalize my-5">
						software engineering student
					</h4>
				</div>
			</section>
			<section className="min-h-screen bg-orange-100">
				<div className="lg:ms-10 pt-[12%] grid grid-cols-1 lg:grid-cols-10 lg:gap-5 text-justify">
					<div
						ref={wordPullUpRef}
						className="lg:max-w-6xl ms-5 lg:ms-40 col-span-1 lg:col-span-6"
					>
						<BoxReveal boxColor={"#5046e6"} duration={0.5}>
							<p className="text-7xl lg:text-[5.5rem] font-extrabold">
								Biodata<span className="text-[#5046e6]">.</span>
							</p>
						</BoxReveal>
						<BoxReveal duration={0.7}>
							<p className="text-3xl font-bold tracking-[0.05em] text-black lg:text-5xl lg:leading-[5rem]">
								My Name Is Muhd Hafizuddin. Student from Universiti Tun Hussein Onn
								Malaysia
								<LinkPreview
									url="https://uthm.edu.my/en/"
									className="font-bold  bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
								>
									{" "}
									UTHM{". "}
								</LinkPreview>
							</p>
						</BoxReveal>
						<BoxReveal duration={0.7}>
							<p className="text-3xl font-bold tracking-[0.05em] text-black lg:text-5xl lg:leading-[5rem]">
								Love to teach especially Math and Programming.Hobby is to learn Related
								to
								<LinkPreview
									url="https://www.typescriptlang.org/"
									className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
								>
									{" "}
									Typescript{" "}
								</LinkPreview>
								and Data Structure or Maybe
								<LinkPreview
									url="https://en.wikipedia.org/wiki/API"
									className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
								>
									{" "}
									API{" "}
								</LinkPreview>
							</p>
						</BoxReveal>
					</div>
					<div className="col-span-1 lg:col-span-4 px-10 lg:py-10 py-16 lg:px-20">
						<Carousel
							plugins={[
								Autoplay({
									delay: 3000,
								}),
							]}
						>
							<CarouselContent>
								{biodata.map((item, index) => (
									<CarouselItem key={index}>
										<Card className="relative bg-tranparent">
											<CardContent className="py-2.5 flex items-center justify-center">
												{item}
											</CardContent>
											<BorderBeam size={1000} duration={5} delay={1} />
										</Card>
									</CarouselItem>
								))}
							</CarouselContent>
						</Carousel>
					</div>
				</div>
			</section>
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
