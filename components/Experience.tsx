"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/section-header";

const experiences = [
  {
    company: "OC Global Technology Sdn Bhd",
    period: "Aug 2026 — Present",
    position: "Software Tester Intern (QA)",
    location: "Johor Bahru, Malaysia · On-site",
    periodPill: "1 mo",
    achievements: [
      "Execute manual test cases and data-driven testing across the company's digital platforms",
      "Perform UI checks and functional validation to catch defects before release",
      "Log, reproduce, and document bugs with clear steps for the development team",
      "Prepare and maintain test documentation, user manuals, and QA reports",
    ],
    technologies: [
      "Software Testing",
      "Quality Assurance",
      "Manual Testing",
      "Test Cases",
      "Bug Reporting",
      "Technical Documentation",
    ],
  },
  {
    company: "Xeersoft",
    period: "2023 — 2024",
    position: "Software Developer Intern",
    location: "Bukit Indah, Johor Bahru",
    periodPill: "1 yr",
    achievements: [
      "Implemented 5+ new features for Tokopak QR commerce system",
      "Improved system performance by 30% through code optimization",
      "Collaborated with cross-functional teams to deliver features on schedule",
      "Participated in daily stand-ups and agile development processes",
    ],
    technologies: ["React", "jQuery", "PostgreSQL", "Laravel", "Git", "Docker", "REST API"],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-alt relative border-t border-edge-strong/15 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <SectionHeader
          index="03"
          label="Track record"
          title="Experience"
          variant="reversed"
        />
        </div>

        <div className="mt-4">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 18 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group grid grid-cols-1 gap-6 border-b border-edge-strong/10 py-8 md:grid-cols-[260px_1fr] md:gap-12"
            >
              {/* Meta column */}
              <div>
                <span className="inline-block bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-foreground">
                  {exp.periodPill}
                </span>
                <p className="mt-3 font-display text-xl leading-tight text-foreground">
                  {exp.company}
                </p>
                <p className="mt-1 font-mono text-[12px] text-ink-dim">{exp.location}</p>
                <p className="mt-0.5 font-mono text-[12px] text-ink-dim">{exp.period}</p>
              </div>

              {/* Body column */}
              <div>
                <h3 className="font-display text-2xl leading-tight text-foreground">
                  {exp.position}
                </h3>
                <ul className="mt-5 space-y-3">
                  {exp.achievements.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-dim"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.6em] inline-block h-1 w-1 shrink-0 rounded-full bg-foreground/40 transition-colors group-hover:bg-accent"
                      />
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-dim ring-hairline px-2.5 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
