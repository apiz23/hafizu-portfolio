import React from "react";
import TypingAnimation from "./magicui/typing-animation";
import gsap from "gsap";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LoaderIcon } from "lucide-react";

export default function Experience() {
	const gradualSpaceRef = React.useRef(null);

	React.useEffect(() => {
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
			<section className="pt-[70%] md:pt-[15%]">
				<div className="text-center" ref={gradualSpaceRef}>
					<TypingAnimation
						className="scroll-m-20 text-6xl uppercase font-extrabold tracking-tight md:text-[12vh]"
						text="Working Experience"
					/>
				</div>
				<div className="max-w-2xl mx-auto p-4 mt-10">
					<div className="grid grid-cols-7">
						<div className="col-span-1">
							<Avatar className="h-10 md:h-14 w-10 md:w-14 md:mt-0 mt-3.5">
								<AvatarImage src="https://media.glassdoor.com/sql/508401/xeersoft-squarelogo-1432219510383.png" />
								<AvatarFallback>
									<LoaderIcon className="animate-spin" />
								</AvatarFallback>
							</Avatar>
						</div>
						<div className="col-span-6">
							<Accordion type="single" collapsible>
								<AccordionItem value="item-1">
									<div className="flex flex-col">
										<div className="flex justify-between gap-x-2">
											<AccordionTrigger>
												<span>Xeersoft</span>
											</AccordionTrigger>
											<p className="pt-3.5">2023-2024</p>
										</div>
										<div className="font-sans text-xs">Software Developer Intern</div>
									</div>
									<AccordionContent className="text-justify font-thin">
										Starting At 14 August 2023 until 26 January 2024. Working as Software
										Developer Intern doing maintenance related a QR code system named
										&quot;Tokopak&quot;. Analyse and Designing and also Develop new
										functionality and feature from the existing system.
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
					<img
						src="https://i.pinimg.com/736x/c5/1e/d5/c51ed53972f630d7cce14296f3d758d2.jpg"
						alt="img"
						className="py-20"
					/>
				</div>
			</section>
		</>
	);
}
