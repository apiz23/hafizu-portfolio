"use client";
import { useEffect } from "react";
import Header from "@/components/Intro";
import StickyCursor from "@/components/StickyCursor";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Project from "@/components/Project";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
	useEffect(() => {
		const lenis = new Lenis();

		lenis.on("scroll", ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove((time) => {
				lenis.raf(time * 1000);
			});
		};
	}, []);

	return (
		<>
			<div className="hidden md:block">
				<StickyCursor />
			</div>
			<Header />
			<Experience />
			<Education />
			<Project />
			<Footer />
		</>
	);
}
