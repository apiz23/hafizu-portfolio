"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypingAnimation from "./magicui/typing-animation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LoaderIcon } from "lucide-react";

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
			<section className="h-screen">
				<div className="pt-14 md:pt-[5%] grid grid-cols-1 md:grid-cols-1 mx-auto gap-4">
					<div className="col-span-1 flex justify-center">
						<Avatar className="h-[25vh] w-[25vh]">
							<AvatarImage src="https://i.pinimg.com/736x/64/4b/5d/644b5d581a4fb29e91523c1318f9e32c.jpg" />
							<AvatarFallback>
								<LoaderIcon className="animate-spin" />
							</AvatarFallback>
						</Avatar>
					</div>
					<div className="col-span-1 pt-10">
						<TypingAnimation
							className="scroll-m-20 font-extrabold text-4xl md:text-8xl"
							text="Hafizuddin Hamid"
						/>
						<h4 className="scroll-m-20 text-xl flex justify-center font-semibold tracking-tight capitalize my-5">
							software engineering student
						</h4>
						<div className="grid grid-cols-1 gap-4 md:mt-10 p-4 max-w-3xl mx-auto">
							<p className="font-medium">About</p>
							<p className="font-medium text-justify break-words">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
								porro ipsam autem nisi soluta eligendi consequatur quas harum vel
								praesentium cupiditate, alias a voluptate sit inventore incidunt iusto
								itaque necessitatibus!
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
