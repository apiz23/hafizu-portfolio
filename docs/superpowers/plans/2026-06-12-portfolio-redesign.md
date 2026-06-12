# Portfolio Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio into an editorial style — each section gets a unique visual treatment, no repeated badge-header templates, typography carries hierarchy.

**Architecture:** Pure UI rewrites — data/logic stays, markup/styles replaced. New `Skills` component created. No new APIs, no new routes. All six sections get distinct layouts per the spec.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v3, Framer Motion, Sora + Figtree + JetBrains Mono fonts, react-icons, lucide-react

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `components/Intro.tsx` | Modify | Full typographic hero — name explodes viewport, stats, rule, no photo |
| `components/Skills.tsx` | Create | New section — proficiency bars, two-column, tinted bg |
| `app/page.tsx` | Modify | Wire up `<Skills />` between Intro and Education |
| `components/Experience.tsx` | Rewrite markup | Editorial timeline rows — keep `experiences` data array |
| `components/Education.tsx` | Modify | Keep chart + data logic, redesign header + education cards |
| `components/Project.tsx` | Rewrite markup | Numbered index list — keep fetch + filter logic |
| `components/Contact.tsx` | Rewrite markup | Minimal editorial — keep `handleSubmit` + confetti logic |

> **Note:** These are visual rewrites. Verification is `pnpm dev` + browser inspection, not unit tests. Each task ends with a commit.

---

### Task 1: Hero — Full Typographic (Intro.tsx)

**Files:**
- Modify: `components/Intro.tsx`

**What changes:** Remove Avatar (photo), make name fill viewport in 3-line layout with horizontal rule and stats strip. Keep badge, CTAs, socials, tech scroll.

- [ ] **Step 1: Replace Intro.tsx with editorial version**

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { TextAnimate } from "./ui/text-animate";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
} from "react-icons/si";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "./ui/scroll-based-velocity";
import { RiExternalLinkLine } from "react-icons/ri";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  {
    node: <SiPostgresql />,
    title: "PostgreSQL",
    href: "https://www.postgresql.org",
  },
];

export default function Intro() {
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pb-12 pt-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Available badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <Badge
            variant="outline"
            className="w-fit inline-flex items-center gap-2 px-4 py-1.5 border-primary/30 bg-primary/5 text-primary rounded-full text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Available for opportunities · Johor, MY
          </Badge>
        </motion.div>

        {/* Name — 3-line editorial */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1
            className="font-black uppercase leading-[0.85] tracking-tighter text-foreground"
            style={{ fontSize: "clamp(4rem, 13vw, 12rem)" }}
          >
            <span className="block">MUHA</span>
            <span className="block">
              F<span className="text-primary">I</span>Z
            </span>
            <span className="block">UDDIN</span>
          </h1>
        </motion.div>

        {/* Horizontal rule */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="my-8"
        >
          <div className="h-[2px] w-full bg-foreground" />
        </motion.div>

        {/* Bottom row: role + bio left, stats right */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8"
        >
          <div className="max-w-[50ch]">
            <p className="text-base text-muted-foreground font-medium mb-2">
              Software Engineering Student
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Final-year SE student at UTHM Malaysia. Built full-stack systems
              with Next.js, TypeScript, and PostgreSQL — from a QR commerce
              platform during my internship at Xeersoft to personal projects
              connecting real users.
            </p>
          </div>
          <div className="flex gap-8 shrink-0">
            <div className="text-right">
              <p className="text-4xl font-black text-foreground leading-none">
                12+
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                Projects
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-black text-foreground leading-none">
                1yr
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                Experience
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center gap-3 mb-8"
        >
          <Button size="lg" className="rounded-full px-7 group" asChild>
            <Link href="#projects" scroll={false} onClick={scrollToProjects}>
              View My Work
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-200" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-7"
            asChild
          >
            <Link
              href="https://docs.google.com/document/d/1SsIiM2VCZnLpso4zuoE6EraAcZrMW_pmXiKLz_1Go8Y/edit?usp=sharing"
              target="_blank"
            >
              <RiExternalLinkLine className="mr-2 h-4 w-4" />
              View Resume
            </Link>
          </Button>
        </motion.div>

        {/* Social icons */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4"
        >
          <Link
            href="https://github.com/apiz23"
            target="_blank"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/muh-hafizuddin/"
            target="_blank"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="#contact"
            aria-label="Contact"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>

      {/* Tech logos strip */}
      <motion.div
        custom={6}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-16 w-full overflow-hidden"
      >
        <ScrollVelocityContainer className="py-4">
          <ScrollVelocityRow baseVelocity={20} direction={1}>
            <div className="flex items-center gap-12 px-4">
              {techLogos.map((logo, i) => (
                <Link
                  key={i}
                  href={logo.href}
                  target="_blank"
                  aria-label={logo.title}
                  className="text-5xl md:text-6xl text-muted-foreground/50 hover:text-primary transition-colors"
                >
                  {logo.node}
                </Link>
              ))}
            </div>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Run dev server and verify hero**

```bash
pnpm dev
```

Open `http://localhost:3000`. Check:
- Name fills most of viewport width on desktop
- "I" in "FIZ" is indigo
- Horizontal rule visible below name
- Stats (12+ / 1yr) appear bottom-right of rule
- No photo / avatar visible
- Badge, CTAs, socials all present
- Tech scroll strip below

- [ ] **Step 3: Commit**

```bash
git add components/Intro.tsx
git commit -m "feat: editorial typographic hero — remove photo, 3-line name, stats strip"
```

---

### Task 2: Skills — New Component

**Files:**
- Create: `components/Skills.tsx`

- [ ] **Step 1: Create components/Skills.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import {
  SiDocker,
  SiFigma,
  SiGit,
  SiNodedotjs,
  SiPostgresql,
} from "react-icons/si";

const frontend = [
  { name: "Next.js", fill: 92 },
  { name: "React", fill: 90 },
  { name: "Tailwind CSS", fill: 88 },
  { name: "TypeScript", fill: 82 },
];

const backend = [
  { name: "Git / GitHub", fill: 90 },
  { name: "Supabase / PostgreSQL", fill: 78 },
  { name: "Node.js", fill: 75 },
  { name: "Docker", fill: 55 },
];

const tools = [
  { icon: <SiFigma />, label: "Figma" },
  { icon: <SiGit />, label: "Git" },
  { icon: <SiNodedotjs />, label: "Node.js" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiDocker />, label: "Docker" },
];

function SkillBar({
  name,
  fill,
  delay,
}: {
  name: string;
  fill: number;
  delay: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground w-44 shrink-0">
        {name}
      </span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${fill}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-primary/[0.02]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground mb-16"
        >
          SKILLS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Frontend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Frontend
            </p>
            <div className="flex flex-col gap-6">
              {frontend.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} delay={i * 0.1} />
              ))}
            </div>
          </motion.div>

          {/* Backend & Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Backend & Tools
            </p>
            <div className="flex flex-col gap-6">
              {backend.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={i * 0.1 + 0.1}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tool icons strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 pt-10 border-t border-border flex flex-wrap gap-8 items-center"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Also use
          </span>
          {tools.map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              <span className="text-xl">{icon}</span>
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Skills.tsx
git commit -m "feat: add Skills section with animated proficiency bars"
```

---

### Task 3: Wire Skills into page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update app/page.tsx**

```tsx
"use client";

import Project from "@/components/Project";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Intro from "@/components/Intro";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main>
      <div className="relative z-0">
        <Intro />
        <Skills />
        <Education />
        <Experience />
        <Project />
        <Contact />
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Run dev server and verify Skills renders**

```bash
pnpm dev
```

Scroll past hero — Skills section should appear with tinted background, "SKILLS" heading, two-column bars. Bars should animate in on scroll.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire Skills section into page between Intro and Education"
```

---

### Task 4: Experience — Editorial Timeline Rows

**Files:**
- Modify: `components/Experience.tsx`

**What changes:** Remove accordion, card, photo gallery, skills summary. Replace with horizontal timeline rows. Keep `experiences` data array.

- [ ] **Step 1: Replace Experience.tsx**

```tsx
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
    technologies: [
      "React",
      "jQuery",
      "PostgreSQL",
      "Laravel",
      "Git",
      "Docker",
      "REST API",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground mb-16"
        >
          EXPERIENCE
        </motion.h2>

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group border-t border-foreground/10 py-10 hover:bg-primary/[0.02] transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_180px] gap-6 items-start">
              {/* Left: year + company */}
              <div>
                <p className="font-mono text-sm text-muted-foreground">
                  {exp.period}
                </p>
                <p className="font-mono text-sm font-semibold text-foreground mt-1">
                  {exp.company}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {exp.location}
                </p>
              </div>

              {/* Center: role + achievements */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-5">
                  {exp.position}
                </h3>
                <ul className="space-y-2.5">
                  {exp.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-0.5 shrink-0 font-mono">
                        —
                      </span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: tech tags */}
              <div className="flex flex-wrap gap-1.5 md:justify-end">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Bottom rule */}
        <div className="border-t border-foreground/10" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run dev server and verify Experience**

Open `http://localhost:3000`, scroll to Experience. Check:
- "EXPERIENCE" heading large, left-aligned, no badge
- Each role is a horizontal row with top border
- Year + company in mono on the left
- Achievements as dash list in center
- Tech tags right-aligned
- Hover shows subtle indigo tint
- No accordion, no cards, no photos

- [ ] **Step 3: Commit**

```bash
git add components/Experience.tsx
git commit -m "feat: editorial experience — horizontal timeline rows, remove accordion/cards/photos"
```

---

### Task 5: Education — Keep Chart, Redesign Layout

**Files:**
- Modify: `components/Education.tsx`

**What changes:** Keep all chart logic (fetchData, useState, chartData, chartConfig, LineChart). Remove gradient cards, glassmorphism, repeated badge header. Replace with: large EDUCATION heading + clean education block list + existing chart.

- [ ] **Step 1: Replace Education.tsx**

```tsx
"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BookOpen } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";

type Pointer = { sem: number; GPA: number; CPA: number };
type EducationLevel = "diploma" | "bachelor" | "secondary";
type EducationResponse = { chart: Pointer[]; latestCGPA: number | null };

const fetchData = async (
  selectedValue: EducationLevel
): Promise<EducationResponse> => {
  const res = await fetch(`/api/education?level=${selectedValue}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

const educationDetails = [
  {
    level: "Bachelor",
    title: "Bachelor of Computer Science — Software Engineering",
    institution: "Universiti Tun Hussein Onn Malaysia (UTHM)",
    period: "2024 – 2026",
    note: "Ongoing · Final year",
    highlights: ["Software Engineering", "System Design", "Software Testing"],
  },
  {
    level: "Diploma",
    title: "Diploma in Information Technology",
    institution: "Universiti Tun Hussein Onn Malaysia (UTHM)",
    period: "2021 – 2024",
    note: "Graduated",
    highlights: ["Software Development", "Database", "Web Technology"],
  },
  {
    level: "Secondary",
    title: "Mara Junior Science College",
    institution: "Science Stream",
    period: "2017 – 2018",
    note: "SPM: 7A 2B",
    highlights: ["Mathematics", "Physics", "Chemistry"],
  },
];

export default function Education() {
  const [selectedValue, setSelectedValue] =
    useState<EducationLevel>("bachelor");
  const [latestCGPA, setLatestCGPA] = useState<number | null>(null);
  const [chartData, setChartData] = useState<Pointer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trend, setTrend] = useState<{
    value: string;
    direction: "up" | "down";
  }>({ value: "0%", direction: "up" });

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetchData(selectedValue);
        setChartData(res.chart);
        setLatestCGPA(res.latestCGPA);
        if (res.chart.length >= 2) {
          const lastTwo = res.chart.slice(-2);
          const diff = lastTwo[1].GPA - lastTwo[0].GPA;
          const percent = ((diff / lastTwo[0].GPA) * 100).toFixed(1);
          setTrend({
            value: `${Math.abs(Number(percent))}%`,
            direction: diff >= 0 ? "up" : "down",
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [selectedValue]);

  const chartConfig = {
    GPA: { label: "GPA", color: "var(--chart-1)" },
    CPA: { label: "CPA", color: "var(--chart-2)" },
  } satisfies ChartConfig;

  const minGPA =
    chartData.length > 0 ? Math.min(...chartData.map((d) => d.GPA)) : 0;
  const yMin = Math.max(0, Math.floor(minGPA * 10) / 10 - 0.1);

  return (
    <section id="education" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground mb-16"
        >
          EDUCATION
        </motion.h2>

        {/* Education entries */}
        {educationDetails.map((edu, index) => (
          <motion.div
            key={edu.level}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="group border-t border-foreground/10 py-8 hover:bg-primary/[0.02] transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-4 items-start">
              {/* Left: period */}
              <div>
                <p className="font-mono text-sm text-muted-foreground">
                  {edu.period}
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {edu.note}
                </p>
              </div>

              {/* Center: title + institution */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {edu.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {edu.institution}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {edu.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs font-mono bg-muted/60 text-muted-foreground px-2 py-0.5 rounded"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: CGPA for bachelor/diploma */}
              {(edu.level === "Bachelor" || edu.level === "Diploma") && (
                <div className="text-right shrink-0">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    CGPA
                  </p>
                  <p className="text-2xl font-black text-foreground font-mono">
                    {selectedValue === edu.level.toLowerCase() && latestCGPA
                      ? latestCGPA.toFixed(2)
                      : "—"}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        <div className="border-t border-foreground/10 mb-16" />

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                Academic Performance
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                GPA over semesters
              </h3>
            </div>
            <Select
              value={selectedValue}
              onValueChange={(value) =>
                setSelectedValue(value as EducationLevel)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bachelor">Bachelor</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="h-[320px] flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-10 w-10 border-2 border-primary/30 border-t-primary"
              />
            </div>
          ) : error ? (
            <div className="h-[320px] flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <BookOpen className="h-10 w-10" />
              <p className="text-sm">Failed to load chart data</p>
            </div>
          ) : (
            <>
              <div className="h-[320px] w-full border border-border rounded-lg p-4">
                <ChartContainer
                  config={chartConfig}
                  className="h-full w-full"
                >
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ left: 12, right: 12, top: 16, bottom: 20 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="sem"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      label={{
                        value: "Semester",
                        position: "insideBottom",
                        offset: -10,
                      }}
                      tickFormatter={(value) => `Sem ${value}`}
                    />
                    <YAxis
                      dataKey="GPA"
                      domain={[yMin, 4]}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.toFixed(2)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="line" />}
                    />
                    <Legend
                      verticalAlign="top"
                      height={36}
                      iconType="circle"
                      iconSize={10}
                    />
                    <Line
                      dataKey="GPA"
                      type="monotone"
                      stroke="var(--color-GPA)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      dataKey="CPA"
                      type="monotone"
                      stroke="var(--color-CPA)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
              {chartData.length > 0 && (
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Trending {trend.direction} by {trend.value} this semester ·{" "}
                  {chartData.length} semesters recorded
                </p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run dev server and verify Education**

Open `http://localhost:3000`, scroll to Education. Check:
- "EDUCATION" heading large, no badge
- Three education entries as horizontal rows with top borders
- CGPA number shows for bachelor row (when bachelor selected in chart)
- Chart renders correctly with dropdown
- No gradient cards, no glassmorphism

- [ ] **Step 3: Commit**

```bash
git add components/Education.tsx
git commit -m "feat: editorial education — timeline rows, keep chart, remove glassmorphism cards"
```

---

### Task 6: Projects — Numbered Index List

**Files:**
- Modify: `components/Project.tsx`

**What changes:** Keep data fetch, filter logic, and `ProjectType`. Replace card grid with numbered full-width rows. Remove images from list view.

- [ ] **Step 1: Replace Project.tsx**

```tsx
"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useState, useEffect } from "react";

type ProjectType = {
  id: string;
  title: string;
  description: string;
  image_src: string;
  github_link: string;
  visit_link: string;
  featured: boolean;
  category: string;
  year: string;
  badges: string[];
};

const categories = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "webapp", label: "Web Apps" },
  { id: "frontend", label: "Frontend" },
];

export default function Project() {
  const [filter, setFilter] = useState<string>("all");
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground">
            PROJECTS
          </h2>
          <span className="font-mono text-sm text-muted-foreground shrink-0">
            {filteredProjects.length} projects
          </span>
        </motion.div>

        {/* Category filter — text-only pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`text-sm px-4 py-1.5 rounded-full transition-colors ${
                filter === cat.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Numbered list */}
        {loading ? (
          <div className="border-t border-foreground/10 py-16 text-center">
            <p className="text-sm text-muted-foreground font-mono">
              Loading...
            </p>
          </div>
        ) : (
          <>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={project.visit_link}
                  target="_blank"
                  className="group flex items-center gap-4 sm:gap-6 border-t border-foreground/10 py-5 hover:bg-primary/[0.02] transition-colors -mx-4 px-4 sm:-mx-6 sm:px-6"
                >
                  {/* Number */}
                  <span className="text-4xl sm:text-5xl font-black text-muted-foreground/20 group-hover:text-primary/30 transition-colors w-14 sm:w-16 shrink-0 font-mono leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Featured label */}
                  {project.featured && (
                    <span className="hidden sm:block text-[10px] text-primary font-mono uppercase tracking-widest shrink-0">
                      Featured
                    </span>
                  )}

                  {/* Title */}
                  <span className="flex-1 text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors min-w-0 truncate">
                    {project.title}
                  </span>

                  {/* Tech — hidden on mobile */}
                  <span className="hidden lg:flex gap-x-3 text-xs text-muted-foreground font-mono shrink-0">
                    {project.badges.slice(0, 3).join(" · ")}
                  </span>

                  {/* Year */}
                  <span className="hidden sm:block text-sm text-muted-foreground font-mono shrink-0">
                    {project.year}
                  </span>

                  {/* Arrow */}
                  <span className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0">
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
            <div className="border-t border-foreground/10" />
          </>
        )}

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Link
            href="https://github.com/apiz23"
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Github className="h-4 w-4" />
            <span>View all on GitHub</span>
            <span className="group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run dev server and verify Projects**

Open `http://localhost:3000`, scroll to Projects. Check:
- "PROJECTS" heading large, project count right-aligned on same line
- Category pills are text-only (no icons, no borders by default)
- Projects render as numbered rows — `01`, `02`, `03` etc.
- Numbers are large and muted, turn indigo on hover
- Entire row is clickable
- Arrow nudges right on hover
- Featured label shows for featured projects
- No images in list

- [ ] **Step 3: Commit**

```bash
git add components/Project.tsx
git commit -m "feat: editorial projects — numbered index list, text filter pills, remove card grid"
```

---

### Task 7: Contact — Minimal Editorial

**Files:**
- Modify: `components/Contact.tsx`

**What changes:** Keep `handleSubmit`, `formStatus`, `fireConfetti`, form fields. Remove card wrappers, grid layout, contact info cards, social media cards. Replace with large heading + email link + inline form + social icons row.

- [ ] **Step 1: Replace Contact.tsx**

```tsx
"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { RiTwitterXFill } from "react-icons/ri";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const currentYear = new Date().getFullYear();

  const fireConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    const sendPromise = fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((res) => {
      if (!res.ok) throw new Error("Failed");
      return res.json();
    });

    setFormStatus("sending");

    toast.promise(sendPromise, {
      loading: "Sending your message...",
      success: () => {
        setFormStatus("sent");
        fireConfetti();
        form.reset();
        setTimeout(() => setFormStatus("idle"), 3000);
        return "Message sent successfully!";
      },
      error: "Failed to send message. Try again.",
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground mb-6"
        >
          LET'S WORK<br />TOGETHER.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Link
            href="mailto:piz230601@gmail.com"
            className="text-lg md:text-2xl text-muted-foreground hover:text-primary transition-colors font-mono"
          >
            piz230601@gmail.com
          </Link>
        </motion.div>

        {/* Inline contact form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="space-y-4 max-w-xl mb-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">
                Name
              </label>
              <Input type="text" name="name" placeholder="John Doe" required />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">
              Subject
            </label>
            <Input
              type="text"
              name="subject"
              placeholder="What's this about?"
              required
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wider">
              Message
            </label>
            <Textarea
              placeholder="Your message..."
              rows={4}
              name="message"
              required
              className="resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={formStatus !== "idle"}
            className="rounded-full px-8"
          >
            {formStatus === "idle" && (
              <>
                Send Message
                <Send className="ml-2 h-4 w-4" />
              </>
            )}
            {formStatus === "sending" && (
              <>
                Sending...
                <div className="ml-2 h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              </>
            )}
            {formStatus === "sent" && (
              <>
                Message Sent!
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </motion.form>

        {/* Social row + footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="border-t border-foreground/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/apiz23"
              target="_blank"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/muh-hafizuddin/"
              target="_blank"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/piz230601"
              target="_blank"
              aria-label="Twitter / X"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <RiTwitterXFill className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-xs text-muted-foreground font-mono">
            © {currentYear} Hafizuddin Hamid
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run dev server and verify Contact**

Open `http://localhost:3000`, scroll to Contact. Check:
- "LET'S WORK TOGETHER." heading large and uppercase
- Email address visible as a link below the heading
- Form renders inline (no card wrapper)
- Submit still works (test with real data or check network tab)
- Social icons row at bottom with copyright
- No contact info cards, no social media cards

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: editorial contact — minimal heading + email link + inline form, remove card grid"
```

---

### Task 8: Final Visual QA

- [ ] **Step 1: Run dev server**

```bash
pnpm dev
```

- [ ] **Step 2: Full-page scroll check — desktop (1280px)**

Verify each section in order:
1. Hero: name fills viewport, 3-line layout, "I" in indigo, rule visible, stats bottom-right, no photo
2. Skills: tinted bg, "SKILLS" heading, bars animate on scroll
3. Education: horizontal rows, chart renders, dropdown works
4. Experience: horizontal timeline rows, mono year+company
5. Projects: numbered list, filter pills text-only, rows clickable
6. Contact: large heading, email link, inline form, social icons

- [ ] **Step 3: Mobile check (375px)**

Resize browser to 375px. Verify:
- Hero name still large and readable (clamp handles it)
- Skills: single column
- Experience: stacks vertically  
- Projects: number + title visible, tech/year hidden on mobile (as coded)
- Contact: form full-width

- [ ] **Step 4: Dark mode check**

Toggle dark mode. Verify foreground/background colors invert correctly. No hardcoded `#fff` or `#000`.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete editorial portfolio redesign — all 6 sections"
```
