import React from "react";
import gsap from "gsap";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LoaderIcon } from "lucide-react";
import intern1 from "@/public/img/intern1.jpeg";
import Image from "next/image";
import { TextAnimate } from "./ui/text-animate";

export default function Experience() {
	return (
		<>
			<section className="pt-[70%] md:pt-[15%]">
				<div className="text-center">
					<TextAnimate
						animation="slideUp"
						by="word"
						className="scroll-m-20 text-5xl uppercase font-extrabold tracking-tight md:text-[12vh]"
					>
						Working Experience
					</TextAnimate>
				</div>
				<div className="max-w-3xl mx-auto p-4 mt-10">
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
					<Image
						src={intern1.src}
						alt="img"
						width={5000}
						height={5000}
						className="py-12"
					/>
				</div>
			</section>
		</>
	);
}
