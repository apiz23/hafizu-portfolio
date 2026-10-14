"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { EASE_OUT_EXPO } from "@/lib/animations";
import GridRuler from "@/components/grid-ruler";
import { OrbitRings, ArchOutline } from "@/components/decor";

const stats = [
  { value: "12+", label: "Projects" },
  { value: "1+", label: "Years Exp." },
  { value: "UTHM", label: "Final Year" },
];

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const fade = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 0.35]
  );
  const rise = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 60]
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      <GridRuler columns={6} />

      {/* Decorative props */}
      <OrbitRings
        size={560}
        className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 opacity-90 lg:block"
      />
      <OrbitRings
        size={320}
        className="pointer-events-none absolute -left-32 bottom-[-6rem] hidden opacity-60 xl:block"
      />
      <ArchOutline
        width={200}
        className="pointer-events-none absolute left-[8%] top-24 hidden opacity-50 xl:block"
      />

      <motion.div
        style={{ opacity: fade, y: rise }}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 sm:px-10"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3"
        >
          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          <span className="eyebrow">Software Engineering Student · UTHM Malaysia</span>
          <span
            aria-hidden="true"
            className="hidden h-3 w-px bg-edge-strong/20 sm:block"
          />
          <span className="bg-accent px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent-foreground">
            Open to work
          </span>
        </motion.div>

        {/* Headline — GitHub avatar sits behind it as a faded ink watermark */}
        <div className="relative mx-auto mt-8 max-w-[16ch]">
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(64vw,540px)] w-[min(64vw,540px)] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative h-full w-full [mask-image:radial-gradient(circle,black_28%,transparent_70%)]">
              <Image
                src="/img/github-avatar.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 640px) 64vw, 540px"
                className="object-cover object-top grayscale opacity-[0.15] mix-blend-multiply sm:opacity-[0.2]"
              />
            </div>
          </motion.div>

          <h1 className="relative z-10 text-center display-xl text-foreground">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE_OUT_EXPO }}
              className="block"
            >
              I build software,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: EASE_OUT_EXPO }}
              className="block italic text-ink-dim"
            >
              automate workflows.
            </motion.span>
          </h1>
        </div>

        {/* Sub-copy + CTAs */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: EASE_OUT_EXPO }}
            className="max-w-[46ch] text-pretty text-[15px] leading-relaxed text-ink-dim"
          >
            I&apos;m Muhd Hafizuddin — a final-year Software Engineering student at
            UTHM building production-grade web systems with Next.js, TypeScript
            and PostgreSQL, and exploring what&apos;s next with AI-powered
            developer tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36, ease: EASE_OUT_EXPO }}
            className="flex flex-col gap-3 sm:flex-row md:justify-end"
          >
            <Link
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-foreground px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-background"
            >
              <span className="relative z-10">View Work</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-300 ease-out group-hover:translate-y-0"
              />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-accent-foreground">
                ↓
              </span>
            </Link>
            <Link
              href="https://docs.google.com/document/d/1SsIiM2VCZnLpso4zuoE6EraAcZrMW_pmXiKLz_1Go8Y/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground ring-ink transition-colors hover:bg-foreground hover:text-background"
            >
              Résumé ↗
            </Link>
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44, ease: EASE_OUT_EXPO }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-3 rule-y"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-6 text-center ${i > 0 ? "border-l border-edge-strong/15" : ""}`}
            >
              <dd className="font-display text-4xl leading-none text-foreground">
                {s.value}
              </dd>
              <dt className="eyebrow mt-2 block">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden="true"
      >
        <span className="eyebrow">Scroll</span>
        <span className="block h-8 w-px bg-gradient-to-b from-foreground/40 to-transparent" />
      </motion.div>
    </section>
  );
}
