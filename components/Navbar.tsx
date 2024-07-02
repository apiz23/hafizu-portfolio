"use client";

import { Menu } from "lucide-react";

export default function Navbar() {
	return (
		<nav className="fixed w-full flex justify-between py-5 px-10 bg-transparent">
			<img
				src="/logo.png"
				alt="logo"
				className="h-14 transition-transform duration-300 hover:scale-125"
			/>
			<Menu className="w-10 h-10 transition-transform duration-300 hover:scale-125" />
		</nav>
	);
}
