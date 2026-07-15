"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, clipReveal } from "@/lib/animations";

const experiences = [
  {
    company: "Xeersoft",
    period: "2023 – 2024",
    position: "Software Developer Intern",
    location: "Bukit Indah, Johor Bahru",
    achievements: [
      "Implemented 5+ new features for the Tokopak QR commerce system",
      "Improved system performance by 30% through code optimization",
      "Collaborated with cross-functional teams to deliver features on schedule",
      "Participated in daily stand-ups and agile development processes",
    ],
    technologies: ["React", "jQuery", "PostgreSQL", "Laravel", "Git", "Docker", "REST API"],
  },
];

export default function Experience() {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const h2InView = useInView(h2Ref, { once: true, margin: "-10%" });
  const rowsRef = useRef<HTMLDivElement>(null);
  const rowsInView = useInView(rowsRef, { once: true });

  return (
    <section id="experience" className="section-dark py-14 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 w-full">

        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted-foreground mb-1">
          Sheet 04 / Experience
        </p>
        <motion.h2
          ref={h2Ref}
          variants={clipReveal}
          initial="hidden"
          animate={h2InView ? "visible" : "hidden"}
          className="font-serif font-black uppercase tracking-[-0.04em] text-foreground mb-10"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          EXPERIENCE
        </motion.h2>

        <div ref={rowsRef}>
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            custom={index}
            variants={fadeUp}
            initial="hidden"
            animate={rowsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 border-t border-border py-5"
          >
            {/* Date + company */}
            <div className="pt-0.5">
              <p className="font-mono text-[12px] text-muted-foreground">{exp.period}</p>
              <p className="font-mono text-[12px] font-bold text-foreground mt-1">{exp.company}</p>
              <p className="font-mono text-[11px] text-muted-foreground mt-0.5">{exp.location}</p>
            </div>

            {/* Role + achievements + tech */}
            <div>
              <h3 className="text-[15px] font-semibold text-foreground mb-4">{exp.position}</h3>
              <ul className="space-y-2 mb-5">
                {exp.achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-2.5 text-[14px] text-muted-foreground leading-[1.6]">
                    <span aria-hidden="true" className="font-mono text-muted-foreground mt-0.5 shrink-0">—</span>
                    {achievement}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] text-muted-foreground border border-border px-2 py-0.5 rounded-[2px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
        </div>

        <div className="border-t border-border" />
      </div>
    </section>
  );
}
