"use client";

import { Github, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="fixed w-full flex justify-between py-5 px-10 bg-transparent opacity-80">
			<img
				src="/logo.png"
				alt="logo"
				className="h-12 md:h-14 transition-transform duration-300 hover:scale-125"
			/>
			<Link href="https://github.com/apiz23" target="_blank">
				<Github className="w-10 h-10 transition-transform duration-300 hover:scale-125" />
			</Link>
		</nav>
	);
}
