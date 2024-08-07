import React from "react";
import TypingAnimation from "./magicui/typing-animation";
import gsap from "gsap";
import { Card, CardContent } from "./ui/card";
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
			<section className="min-h-screen pt-[70%] md:pt-[15%]">
				<div className="text-center" ref={gradualSpaceRef}>
					<TypingAnimation
						className="scroll-m-20 text-6xl uppercase font-extrabold tracking-tight md:text-[14vh]"
						text="Working Experience"
					/>
				</div>
				<div className="max-w-2xl mx-auto p-4 mt-10">
					<div className="grid grid-cols-7">
						<div className="col-span-1">
							<Avatar className="h-14 w-14">
								<AvatarImage src="https://media.glassdoor.com/sql/508401/xeersoft-squarelogo-1432219510383.png" />
								<AvatarFallback>
									<LoaderIcon className="animate-spin" />
								</AvatarFallback>
							</Avatar>
						</div>
						<div className="col-span-6 flex justify-between">
							<p className="pt-5 ps-2">Xeersoft</p>
							<p className="pt-5">2023-2024</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
