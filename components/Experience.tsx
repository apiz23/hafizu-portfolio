"use client";

import { motion } from "framer-motion";

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
  return (
    <section id="experience" className="py-14 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-8 w-full">

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="font-serif font-black uppercase tracking-[-0.04em] text-foreground mb-10"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          EXPERIENCE
        </motion.h2>

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
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

        <div className="border-t border-border" />
      </div>
    </section>
  );
}
