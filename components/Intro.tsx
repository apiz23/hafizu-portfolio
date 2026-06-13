"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { RiExternalLinkLine } from "react-icons/ri";
import { fadeUp } from "@/lib/animations";

export default function Intro() {
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["center start", "end start"],
  });

  const scrollY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -40]
  );
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex flex-col justify-center bg-background pt-24 pb-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        {/* Left: all text */}
        <div className="flex-1 min-w-0 relative z-10">

        {/* Available badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-7"
        >
          <span className="inline-flex items-center gap-2 border border-[#bbf7d0] bg-[#f0fdf4] rounded-[3px] px-3 py-1 font-mono text-[12px] uppercase tracking-[0.1em] text-[#16a34a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
            Available for opportunities · Johor, MY
          </span>
        </motion.div>

        {/* Name — entrance via fadeUp, scroll-out via MotionValues */}
        <motion.div style={{ y: scrollY, opacity: scrollOpacity }}>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-serif font-black uppercase leading-[0.92] tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            <span className="block">MUHD</span>
            <span className="block">HAFIZUDDIN</span>
          </motion.h1>
        </motion.div>

        {/* Rule */}
        <motion.div
          className="h-[2px] w-full bg-foreground my-5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
        />

        {/* Bio row */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6"
        >
          <div className="max-w-[38ch]">
            <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-muted-foreground mb-2">
              Software Engineering Student
            </p>
            <p className="text-sm text-muted-foreground leading-[1.65]">
              Final-year SE student at UTHM Malaysia. Built full-stack systems
              with Next.js, TypeScript, and PostgreSQL — from a QR commerce
              platform during my internship at Xeersoft to personal projects
              connecting real users.
            </p>
          </div>
          <div className="flex gap-8 shrink-0">
            <div className="text-right">
              <p className="font-mono font-bold text-[28px] text-foreground leading-none">12+</p>
              <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground mt-1">Projects</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-bold text-[28px] text-foreground leading-none">1yr</p>
              <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground mt-1">Experience</p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-3 mt-6"
        >
          <Link
            href="#projects"
            scroll={false}
            onClick={scrollToProjects}
            className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-[12px] uppercase tracking-[0.08em] px-5 py-2.5 rounded-[3px] hover:opacity-80 transition-opacity"
          >
            View My Work ↓
          </Link>
          <Link
            href="https://docs.google.com/document/d/1SsIiM2VCZnLpso4zuoE6EraAcZrMW_pmXiKLz_1Go8Y/edit?usp=sharing"
            target="_blank"
            className="inline-flex items-center gap-2 border border-[#e8e8e8] text-muted-foreground font-mono text-[12px] uppercase tracking-[0.08em] px-5 py-2.5 rounded-[3px] hover:text-foreground hover:border-[#111] transition-colors"
          >
            <RiExternalLinkLine className="h-3.5 w-3.5" />
            Resume
          </Link>
        </motion.div>

        {/* Socials */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-5 mt-5"
        >
          <Link
            href="https://github.com/apiz23"
            target="_blank"
            aria-label="GitHub"
            className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/muh-hafizuddin/"
            target="_blank"
            aria-label="LinkedIn"
            className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href="#contact"
            aria-label="Contact"
            className="font-mono text-[13px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </Link>
        </motion.div>
        </div>{/* end left */}

        {/* Right: avatar */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="hidden lg:block shrink-0 pt-10"
        >
          <Image
            src="/img/profile2.jpg"
            alt="Hafizuddin Hamid"
            width={200}
            height={260}
            priority
            className="object-cover object-top w-[200px] h-[260px]"
            style={{ borderRadius: "3px" }}
          />
        </motion.div>

        </div>{/* end flex row */}
      </div>
    </section>
  );
}
