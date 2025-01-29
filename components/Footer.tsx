import React from "react";
import { TextAnimate } from "./ui/text-animate";

export default function Footer() {
	return (
		<>
			<section className="min-h-screen pt-[70%] md:pt-[20%]">
				<div className="text-center">
					<TextAnimate
						animation="slideUp"
						by="word"
						className="scroll-m-20 text-6xl uppercase font-extrabold tracking-tight md:text-[12vh]"
					>
						Contact
					</TextAnimate>
				</div>
			</section>
		</>
	);
}
