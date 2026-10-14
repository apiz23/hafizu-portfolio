"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import GridRuler from "@/components/grid-ruler";
import SectionHeader from "@/components/section-header";

type Skill = {
  name: string;
  level: string;
  /** Image icon path (when the tool has a real logo). */
  src?: string;
  /** Fallback short glyph shown in the badge when there's no logo. */
  glyph?: string;
};

const skills: Skill[] = [
  { name: "Next.js", level: "Advanced", src: "/svg/nextjs.svg" },
  { name: "React", level: "Advanced", src: "/svg/react.svg" },
  { name: "TypeScript", level: "Advanced", src: "/svg/typescript.svg" },
  { name: "Tailwind CSS", level: "Advanced", src: "/svg/tailwindcss.svg" },
  { name: "Node.js", level: "Intermediate", src: "/svg/nodejs.svg" },
  { name: "PostgreSQL", level: "Intermediate", src: "/svg/postgresql.svg" },
  { name: "Supabase", level: "Intermediate", src: "/svg/supabase.svg" },
  { name: "Git", level: "Advanced", src: "/svg/git.svg" },
  { name: "Docker", level: "Familiar", src: "/svg/docker.svg" },
  { name: "Figma", level: "Familiar", src: "/svg/figma.svg" },
  { name: "Hermes", level: "Intermediate", src: "/svg/hermes.svg" },
  // Quality assurance — practice-based, no vendor logo (glyph badges)
  { name: "Manual Testing", level: "Intermediate", glyph: "MT" },
  { name: "Test Cases", level: "Intermediate", glyph: "TC" },
  { name: "Bug Reporting", level: "Intermediate", glyph: "BR" },
  { name: "UI / Functional QA", level: "Intermediate", glyph: "QA" },
  { name: "Technical Documentation", level: "Intermediate", glyph: "TD" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-12%" });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-alt relative border-t border-edge-strong/15 py-24 sm:py-28"
    >
      <GridRuler columns={6} />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10">
        {/* Header — index rhythm: label + title left, count right */}
        <SectionHeader
          index="01"
          label="Toolkit"
          title="Skills & tools"
          meta={
            <span className="hidden font-mono text-[11px] text-ink-dim sm:block">
              {skills.length} technologies
            </span>
          }
        />

        {/* Rule-based two-column index */}
        <ul className="mt-2 grid grid-cols-1 gap-x-16 md:grid-cols-2">
          {skills.map((skill, i) => (
            <motion.li
              key={skill.name}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              className="group flex items-center gap-3 border-b border-edge-strong/10 py-4 transition-colors hover:border-accent sm:gap-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center ring-hairline transition-transform duration-300 group-hover:-translate-y-0.5">
                {skill.src ? (
                  <Image
                    src={skill.src}
                    alt=""
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                ) : (
                  <span className="font-mono text-[11px] font-bold tracking-tight text-ink-dim">
                    {skill.glyph}
                  </span>
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-0">
                <span className="font-display text-lg leading-tight text-foreground sm:text-xl">
                  {skill.name}
                </span>

                {/* dotted leader */}
                <span
                  aria-hidden="true"
                  className="mx-2 hidden h-px flex-1 border-t border-dotted border-foreground/20 sm:block"
                />

                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-dim transition-colors group-hover:text-foreground sm:text-[11px]">
                  {skill.level}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
