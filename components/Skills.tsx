"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiFigma,
  SiGit,
  SiSupabase,
} from "react-icons/si";

const skills = [
  { icon: <SiNextdotjs />, name: "Next.js", level: "Advanced" },
  { icon: <SiReact />, name: "React", level: "Advanced" },
  { icon: <SiTypescript />, name: "TypeScript", level: "Advanced" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS", level: "Advanced" },
  { icon: <SiNodedotjs />, name: "Node.js", level: "Intermediate" },
  { icon: <SiPostgresql />, name: "PostgreSQL", level: "Intermediate" },
  { icon: <SiSupabase />, name: "Supabase", level: "Intermediate" },
  { icon: <SiGit />, name: "Git", level: "Advanced" },
  { icon: <SiDocker />, name: "Docker", level: "Familiar" },
  { icon: <SiFigma />, name: "Figma", level: "Familiar" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-14 bg-background border-t border-[#e8e8e8]">
      <div className="max-w-4xl mx-auto px-8 w-full">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-8"
        >
          <h2
            className="font-serif font-black uppercase tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            SKILLS
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-[1px] bg-[#e8e8e8] border border-[#e8e8e8] rounded-[6px] overflow-hidden"
        >
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-white px-4 py-4 flex flex-col gap-1.5"
            >
              <span className="text-[20px] text-[#888888]">{skill.icon}</span>
              <span className="font-mono text-[12px] font-bold text-foreground">{skill.name}</span>
              <span className="font-mono text-[11px] text-muted-foreground">{skill.level}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
