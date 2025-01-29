"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LoaderIcon } from "lucide-react";
import profile from "@/public/img/profile.jpg";
import { TextAnimate } from "./ui/text-animate";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
	return (
		<>
			<section className="mb-0 md:mb-20 h-fit ">
				<div className="pt-14 md:pt-[5%] grid grid-cols-1 md:grid-cols-1 mx-auto gap-4">
					<div className="col-span-1 flex justify-center">
						<Avatar className="h-[25vh] w-[25vh]">
							<AvatarImage src={profile.src} className="object-cover" />
							<AvatarFallback>
								<LoaderIcon className="animate-spin" />
							</AvatarFallback>
						</Avatar>
					</div>
					<div className="col-span-1 pt-10">
						<TextAnimate
							animation="slideUp"
							by="word"
							className="scroll-m-20 font-extrabold text-4xl md:text-8xl text-center"
						>
							Hafizuddin Hamid
						</TextAnimate>
						<h4 className="scroll-m-20 text-xl flex justify-center font-semibold tracking-tight capitalize my-5">
							software engineering student
						</h4>
						<div className="grid grid-cols-1 gap-4 md:mt-10 p-4 max-w-3xl mx-auto">
							<p className="font-semibold text-lg">About</p>
							<p className="font-medium text-justify break-words">
								I am a dedicated software engineering student passionate about
								full-stack development and creating innovative solutions. Skilled in
								modern frameworks like Next.js and Tailwind CSS, I enjoy building
								impactful projects and continuously learning new technologies.
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
