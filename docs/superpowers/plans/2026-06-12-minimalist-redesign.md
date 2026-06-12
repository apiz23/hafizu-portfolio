# Minimalist Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the entire portfolio to a Notion × Mux light hybrid — pure white, charcoal ink, Sora headings, floating dark pill nav, `max-w-4xl` content column, one green accent (availability dot only).

**Architecture:** Token-first approach — rework `globals.css` CSS variables first so every downstream component inherits the new palette. Then rebuild each component's JSX/className layer one file at a time, preserving all fetch logic, state, and API routes unchanged. No new abstractions, no new files.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4 (CSS-variable-based config), Framer Motion, next/font/google (Sora + Inter + JetBrains Mono)

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `app/globals.css` | Modify | New hex token system, remove dark mode, remove decorative utilities |
| `app/layout.tsx` | Modify | Swap Figtree → Inter, remove bg overlay divs, add `900` weight to Sora |
| `components/providers.tsx` | Modify | Force light mode: `forcedTheme="light" enableSystem={false}` |
| `components/Navbar.tsx` | Modify | Floating dark pill JSX, keep intersection observer logic |
| `components/Intro.tsx` | Modify | Clean hero layout, remove ScrollVelocityContainer marquee |
| `components/Skills.tsx` | Modify | CSS grid-lines layout replacing skill bars |
| `components/Education.tsx` | Modify | Timeline rows + restyle chart to monochrome |
| `components/Experience.tsx` | Modify | Timeline grid layout |
| `components/Project.tsx` | Modify | Refined row styling, remove oversized numbers |
| `components/Contact.tsx` | Modify | Link rows replacing form, merged footer |

---

## Task 1: Token System — globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace the `:root` block and remove dark mode**

Open `app/globals.css`. Replace the entire file content with the following:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #111111;
  --card: #ffffff;
  --card-foreground: #111111;
  --popover: #ffffff;
  --popover-foreground: #111111;
  --primary: #111111;
  --primary-foreground: #ffffff;
  --secondary: #f5f5f5;
  --secondary-foreground: #111111;
  --muted: #f5f5f5;
  --muted-foreground: #888888;
  --accent: #f5f5f5;
  --accent-foreground: #111111;
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: #e8e8e8;
  --input: #e8e8e8;
  --ring: #111111;
  --chart-1: #111111;
  --chart-2: #888888;
  --chart-3: #cccccc;
  --chart-4: #444444;
  --chart-5: #666666;
  --sidebar: #ffffff;
  --sidebar-foreground: #111111;
  --sidebar-primary: #111111;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f5f5f5;
  --sidebar-accent-foreground: #111111;
  --sidebar-border: #e8e8e8;
  --sidebar-ring: #111111;
  --font-sans: var(--font-inter, 'Inter', sans-serif);
  --font-serif: var(--font-heading, 'Sora', sans-serif);
  --font-mono: var(--font-mono, 'JetBrains Mono', monospace);
  --radius: 3px;
  --shadow-2xs: 0px 0px 0px 0px rgba(0,0,0,0.03);
  --shadow-xs: 0px 0px 0px 0px rgba(0,0,0,0.03);
  --shadow-sm: 0px 1px 2px -1px rgba(0,0,0,0.05);
  --shadow: 0px 1px 2px -1px rgba(0,0,0,0.05);
  --shadow-md: 0px 2px 4px -1px rgba(0,0,0,0.05);
  --shadow-lg: 0px 4px 6px -1px rgba(0,0,0,0.05);
  --shadow-xl: 0px 8px 10px -1px rgba(0,0,0,0.05);
  --shadow-2xl: 0px 0px 0px 0px rgba(0,0,0,0.13);
  --tracking-normal: normal;
  --spacing: 0.25rem;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 1px);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 3px);
  --radius-xl: calc(var(--radius) + 5px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);

  --tracking-tighter: calc(var(--tracking-normal) - 0.05em);
  --tracking-tight: calc(var(--tracking-normal) - 0.025em);
  --tracking-normal: var(--tracking-normal);
  --tracking-wide: calc(var(--tracking-normal) + 0.025em);
  --tracking-wider: calc(var(--tracking-normal) + 0.05em);
  --tracking-widest: calc(var(--tracking-normal) + 0.1em);
}

@layer base {
  html {
    font-size: 14px;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
    letter-spacing: var(--tracking-normal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Verify build compiles**

```bash
npm run build
```

Expected: build completes with no errors. TypeScript type errors in components are acceptable at this stage (they'll be fixed in later tasks). CSS compilation errors are not acceptable.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: replace token system with monochrome hex, remove dark mode"
```

---

## Task 2: Layout & Font Swap — layout.tsx + providers.tsx

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/providers.tsx`

- [ ] **Step 1: Update layout.tsx — swap Figtree for Inter, add Sora weight 900, remove bg overlays**

Replace the entire content of `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/scroll-top";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "600", "700", "800", "900"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Hafizu | Portfolio",
  description: "Personal Portfolio by Hafizu - Software Developer",
  icons: {
    icon: [{ url: "/favicon.ico", href: "/favicon.ico" }],
  },
  openGraph: {
    title: "Hafizu | Portfolio",
    description: "Personal Portfolio by Hafizu - Software Developer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans bg-background antialiased`}
      >
        <Providers>
          <Navbar />
          <div className="relative min-h-screen">
            {children}
            <Toaster position="top-center" />
          </div>
          <ScrollToTop />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Update providers.tsx — force light mode**

Replace the entire content of `components/providers.tsx`:

```tsx
"use client";

import { ThemeProvider } from "./theme-provider";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "./smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        {children}
      </MotionConfig>
    </ThemeProvider>
  );
}
```

- [ ] **Step 3: Run dev and open browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify: page background is pure white, body text is near-black `#111`. Font should be Inter for body text (no rounded Figtree letterforms). No radial gradient glow, no grain texture, no dot grid visible.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/providers.tsx
git commit -m "style: swap Figtree→Inter, remove bg overlays, force light mode"
```

---

## Task 3: Navbar — Floating Dark Pill

**Files:**
- Modify: `components/Navbar.tsx`

- [ ] **Step 1: Rewrite Navbar.tsx**

Replace the entire content of `components/Navbar.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  document
    .getElementById(href.replace("#", ""))
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "skills", "education", "experience", "projects", "contact"];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <nav
        className={`pointer-events-auto flex items-center gap-5 bg-[#111111] rounded-full px-4 py-2 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-black/20" : ""
        }`}
        aria-label="Site navigation"
      >
        {/* Monogram */}
        <Link
          href="#home"
          onClick={(e) => scrollTo(e, "#home")}
          className="font-mono font-bold text-[11px] tracking-[0.14em] text-white pr-4 border-r border-white/20 hover:text-white/80 transition-colors"
          aria-label="Back to top"
        >
          HF.
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-5">
          {navLinks.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = active === id;
            return (
              <Link
                key={href}
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className={`text-[10px] font-mono uppercase tracking-widest transition-colors relative ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile: contact only */}
        <div className="sm:hidden">
          <Link
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
```

- [ ] **Step 2: Verify in browser**

With dev server running, open `http://localhost:3000`. Verify:
- Dark pill floats centered at top, `16px` from top edge
- `HF.` monogram left, separated by faint vertical rule
- Nav links visible, white text
- Active section link is full white, inactive links are `white/40`
- Active link has small white dot below it (spring animation on scroll)
- Scrolling past 40px adds a subtle shadow to the pill
- No theme toggle button anywhere

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "style: floating dark pill navbar, remove theme toggle"
```

---

## Task 4: Hero — Intro.tsx

**Files:**
- Modify: `components/Intro.tsx`

- [ ] **Step 1: Rewrite Intro.tsx**

Replace the entire content of `components/Intro.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { RiExternalLinkLine } from "react-icons/ri";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

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
      className="min-h-screen flex flex-col justify-center bg-background pt-24 pb-16"
    >
      <div className="max-w-4xl mx-auto px-8 w-full">

        {/* Available badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-7"
        >
          <span className="inline-flex items-center gap-2 border border-[#bbf7d0] bg-[#f0fdf4] rounded-[3px] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#16a34a]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
            Available for opportunities · Johor, MY
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-serif font-black uppercase leading-[0.92] tracking-[-0.04em] text-foreground"
          style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
        >
          <span className="block">MUHD</span>
          <span className="block">HAFIZUDDIN</span>
        </motion.h1>

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
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-muted-foreground mb-2">
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
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground mt-1">Projects</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-bold text-[28px] text-foreground leading-none">1yr</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground mt-1">Experience</p>
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
            className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-[10px] uppercase tracking-[0.08em] px-5 py-2.5 rounded-[3px] hover:opacity-80 transition-opacity"
          >
            View My Work ↓
          </Link>
          <Link
            href="https://docs.google.com/document/d/1SsIiM2VCZnLpso4zuoE6EraAcZrMW_pmXiKLz_1Go8Y/edit?usp=sharing"
            target="_blank"
            className="inline-flex items-center gap-2 border border-[#e8e8e8] text-muted-foreground font-mono text-[10px] uppercase tracking-[0.08em] px-5 py-2.5 rounded-[3px] hover:text-foreground hover:border-[#111] transition-colors"
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
            className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/muh-hafizuddin/"
            target="_blank"
            aria-label="LinkedIn"
            className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
          >
            LinkedIn
          </Link>
          <Link
            href="#contact"
            aria-label="Contact"
            className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
          >
            Email
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Check `http://localhost:3000`. Verify:
- Green available badge at top left, rectangular (not pill), no pulse
- Name in large Sora black, stacked two lines, tight tracking
- Full-width 2px charcoal rule animates in from left
- Bio text left, stats (12+ / 1yr) right-aligned at bottom of row
- Two sharp rectangular buttons — filled charcoal + outlined
- Social links are plain text (GitHub / LinkedIn / Email), not icons
- No scrolling tech logo marquee at bottom
- No profile photo column

- [ ] **Step 3: Commit**

```bash
git add components/Intro.tsx
git commit -m "style: minimalist hero — remove marquee, sharp buttons, text socials"
```

---

## Task 5: Skills — Grid Lines Layout

**Files:**
- Modify: `components/Skills.tsx`

- [ ] **Step 1: Rewrite Skills.tsx**

Replace the entire content of `components/Skills.tsx`:

```tsx
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
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
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
              <span className="text-[18px] text-[#888888]">{skill.icon}</span>
              <span className="font-mono text-[10px] font-bold text-foreground">{skill.name}</span>
              <span className="font-mono text-[9px] text-muted-foreground">{skill.level}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Scroll to Skills section. Verify:
- Grid of cells separated by `#e8e8e8` lines (no card borders, no progress bars)
- 5 columns on desktop, 2 on mobile
- Each cell: react-icon (muted gray), name (mono bold), level (mono small muted)
- No skill bars, no color accents on icons

- [ ] **Step 3: Commit**

```bash
git add components/Skills.tsx
git commit -m "style: skills grid-lines layout replacing skill bars"
```

---

## Task 6: Education — Timeline + Monochrome Chart

**Files:**
- Modify: `components/Education.tsx`

- [ ] **Step 1: Rewrite Education.tsx**

Replace the entire content of `components/Education.tsx`:

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
import { BookOpen } from "lucide-react";
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

const fetchData = async (selectedValue: EducationLevel): Promise<EducationResponse> => {
  const res = await fetch(`/api/education?level=${selectedValue}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
};

const educationDetails = [
  {
    level: "bachelor",
    title: "Bachelor of Computer Science — Software Engineering",
    institution: "Universiti Tun Hussein Onn Malaysia (UTHM)",
    period: "2024 – 2026",
    note: "Ongoing · Final year",
    highlights: ["Software Engineering", "System Design", "Software Testing"],
  },
  {
    level: "diploma",
    title: "Diploma in Information Technology",
    institution: "Universiti Tun Hussein Onn Malaysia (UTHM)",
    period: "2021 – 2024",
    note: "Graduated",
    highlights: ["Software Development", "Database", "Web Technology"],
  },
  {
    level: "secondary",
    title: "Mara Junior Science College",
    institution: "Science Stream",
    period: "2017 – 2018",
    note: "SPM: 7A 2B",
    highlights: ["Mathematics", "Physics", "Chemistry"],
  },
];

export default function Education() {
  const [selectedValue, setSelectedValue] = useState<EducationLevel>("bachelor");
  const [latestCGPA, setLatestCGPA] = useState<number | null>(null);
  const [chartData, setChartData] = useState<Pointer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trend, setTrend] = useState<{ value: string; direction: "up" | "down" }>({
    value: "0%",
    direction: "up",
  });

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

  const minGPA = chartData.length > 0 ? Math.min(...chartData.map((d) => d.GPA)) : 0;
  const yMin = Math.max(0, Math.floor(minGPA * 10) / 10 - 0.1);

  return (
    <section id="education" className="py-14 bg-background border-t border-[#e8e8e8]">
      <div className="max-w-4xl mx-auto px-8 w-full">

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif font-black uppercase tracking-[-0.04em] text-foreground mb-10"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          EDUCATION
        </motion.h2>

        {/* Timeline rows */}
        {educationDetails.map((edu, index) => (
          <motion.div
            key={edu.level}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 border-t border-[#e8e8e8] py-5"
          >
            <div className="pt-0.5">
              <p className="font-mono text-[10px] text-muted-foreground">{edu.period}</p>
              <p className="font-mono text-[9px] text-muted-foreground/70 mt-0.5">{edu.note}</p>
            </div>
            <div>
              <h3 className="text-[13px] font-semibold text-foreground mb-1">{edu.title}</h3>
              <p className="font-mono text-[10px] text-muted-foreground mb-3">{edu.institution}</p>
              <div className="flex flex-wrap gap-1.5">
                {edu.highlights.map((h) => (
                  <span
                    key={h}
                    className="font-mono text-[9px] text-muted-foreground border border-[#e8e8e8] px-2 py-0.5 rounded-[2px]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        <div className="border-t border-[#e8e8e8] mb-12" />

        {/* GPA Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground mb-1">
                Academic Performance
              </p>
              <h3 className="text-[18px] font-semibold text-foreground">GPA over semesters</h3>
            </div>
            <Select
              value={selectedValue}
              onValueChange={(value) => setSelectedValue(value as EducationLevel)}
            >
              <SelectTrigger className="w-[160px] rounded-[3px] border-[#e8e8e8] font-mono text-[11px]">
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
            <div className="h-[280px] flex items-center justify-center border border-[#e8e8e8] rounded-[6px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="h-8 w-8 rounded-full border-2 border-[#e8e8e8] border-t-[#111]"
              />
            </div>
          ) : error ? (
            <div className="h-[280px] flex flex-col items-center justify-center gap-3 text-muted-foreground border border-[#e8e8e8] rounded-[6px]">
              <BookOpen className="h-8 w-8" />
              <p className="font-mono text-[11px]">Failed to load chart data</p>
            </div>
          ) : (
            <>
              <div className="h-[280px] w-full border border-[#e8e8e8] rounded-[6px] p-4">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ left: 12, right: 12, top: 16, bottom: 20 }}
                  >
                    <CartesianGrid vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey="sem"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "#888" }}
                      label={{ value: "Semester", position: "insideBottom", offset: -10, style: { fontFamily: "var(--font-mono)", fontSize: 10, fill: "#888" } }}
                      tickFormatter={(value) => `Sem ${value}`}
                    />
                    <YAxis
                      dataKey="GPA"
                      domain={[yMin, 4]}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tick={{ fontFamily: "var(--font-mono)", fontSize: 10, fill: "#888" }}
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
                      iconSize={8}
                      wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: 10 }}
                    />
                    <Line dataKey="GPA" type="monotone" stroke="var(--color-GPA)" strokeWidth={1.5} dot={false} />
                    <Line dataKey="CPA" type="monotone" stroke="var(--color-CPA)" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ChartContainer>
              </div>
              {chartData.length > 0 && (
                <p className="font-mono text-[10px] text-muted-foreground mt-2">
                  Trending {trend.direction} by {trend.value} · {chartData.length} semesters recorded
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

- [ ] **Step 2: Verify in browser**

Scroll to Education. Verify:
- Timeline rows: `80px` date column left, content right, `1px #e8e8e8` top border per row
- No hover background color shift
- Highlight tags are small mono text with light border, no bg fill
- Chart lines are charcoal (`#111`) and gray (`#888`), no indigo/teal
- Chart border is `1px #e8e8e8`, monospace axis labels
- Loading spinner is charcoal, not indigo

- [ ] **Step 3: Commit**

```bash
git add components/Education.tsx
git commit -m "style: education timeline rows, monochrome chart"
```

---

## Task 7: Experience — Timeline Grid

**Files:**
- Modify: `components/Experience.tsx`

- [ ] **Step 1: Rewrite Experience.tsx**

Replace the entire content of `components/Experience.tsx`:

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
    technologies: ["React", "jQuery", "PostgreSQL", "Laravel", "Git", "Docker", "REST API"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-14 bg-background border-t border-[#e8e8e8]">
      <div className="max-w-4xl mx-auto px-8 w-full">

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif font-black uppercase tracking-[-0.04em] text-foreground mb-10"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
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
            className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 border-t border-[#e8e8e8] py-5"
          >
            {/* Date + company */}
            <div className="pt-0.5">
              <p className="font-mono text-[10px] text-muted-foreground">{exp.period}</p>
              <p className="font-mono text-[10px] font-bold text-foreground mt-1">{exp.company}</p>
              <p className="font-mono text-[9px] text-muted-foreground mt-0.5">{exp.location}</p>
            </div>

            {/* Role + achievements + tech */}
            <div>
              <h3 className="text-[13px] font-semibold text-foreground mb-4">{exp.position}</h3>
              <ul className="space-y-2 mb-5">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12px] text-muted-foreground leading-[1.6]">
                    <span className="font-mono text-muted-foreground mt-0.5 shrink-0">—</span>
                    {achievement}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[9px] text-muted-foreground border border-[#e8e8e8] px-2 py-0.5 rounded-[2px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        <div className="border-t border-[#e8e8e8]" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Scroll to Experience. Verify:
- Same `80px | 1fr` grid as Education — consistent pattern
- No hover bg color
- Tech tags are small mono text, light border, no filled background
- Bullet dash `—` is muted gray, not indigo

- [ ] **Step 3: Commit**

```bash
git add components/Experience.tsx
git commit -m "style: experience timeline grid, remove colored accents"
```

---

## Task 8: Projects — Refined Row Styling

**Files:**
- Modify: `components/Project.tsx`

- [ ] **Step 1: Rewrite Project.tsx**

Replace the entire content of `components/Project.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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

function SkeletonRow({ delay }: { delay: number }) {
  return (
    <div
      className="flex items-center gap-5 border-t border-[#e8e8e8] py-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-6 h-3 bg-[#f5f5f5] rounded animate-pulse shrink-0" />
      <div className="flex-1 h-3.5 bg-[#f5f5f5] rounded animate-pulse" />
      <div className="hidden lg:block w-28 h-3 bg-[#f5f5f5] rounded animate-pulse" />
      <div className="hidden sm:block w-10 h-3 bg-[#f5f5f5] rounded animate-pulse" />
      <div className="w-3 h-3 bg-[#f5f5f5] rounded animate-pulse shrink-0" />
    </div>
  );
}

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
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-14 bg-background border-t border-[#e8e8e8]">
      <div className="max-w-4xl mx-auto px-8 w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8"
        >
          <h2
            className="font-serif font-black uppercase tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            PROJECTS
          </h2>
          <span className="font-mono text-[11px] text-muted-foreground shrink-0">
            {loading ? "—" : `${filteredProjects.length} projects`}
          </span>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`font-mono text-[9px] uppercase tracking-[0.08em] px-3 py-1.5 rounded-[2px] border cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] ${
                filter === cat.id
                  ? "bg-[#111] text-white border-[#111]"
                  : "text-muted-foreground border-[#e8e8e8] hover:text-foreground hover:border-[#aaa]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* List */}
        {loading ? (
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} delay={i * 60} />
            ))}
            <div className="border-t border-[#e8e8e8]" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {filteredProjects.length === 0 ? (
                <div className="border-t border-[#e8e8e8] py-14 text-center">
                  <p className="font-mono text-[11px] text-muted-foreground">
                    No projects in this category yet.
                  </p>
                </div>
              ) : (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={project.visit_link || "#"}
                      target={project.visit_link ? "_blank" : undefined}
                      className="group flex items-center gap-5 border-t border-[#e8e8e8] py-4 hover:bg-[#fafafa] transition-colors duration-100"
                    >
                      {/* Number */}
                      <span className="font-mono text-[11px] text-[#cccccc] w-6 shrink-0 leading-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* Title */}
                      <span className="flex-1 text-[14px] font-semibold text-foreground min-w-0 truncate">
                        {project.title}
                      </span>

                      {/* Tech */}
                      <span className="hidden lg:block font-mono text-[10px] text-muted-foreground shrink-0">
                        {project.badges.slice(0, 3).join(" · ")}
                      </span>

                      {/* Year */}
                      <span className="hidden sm:block font-mono text-[10px] text-muted-foreground shrink-0">
                        {project.year}
                      </span>

                      {/* Arrow */}
                      <span
                        className="text-[#cccccc] group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 text-[13px]"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))
              )}
              <div className="border-t border-[#e8e8e8]" />
            </motion.div>
          </AnimatePresence>
        )}

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Link
            href="https://github.com/apiz23"
            target="_blank"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Github className="h-3.5 w-3.5" />
            View all on GitHub
            <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
              →
            </span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Scroll to Projects. Verify:
- Small `11px` mono number (`01`, `02`…) in `#ccc`, not large display numbers
- Row number column is narrow (`24px`), not `56–64px`
- Active filter button: `bg-[#111] text-white`, inactive: border only
- Hover: row gets `#fafafa`, no color shift on title
- No featured badge
- Arrow starts `#ccc`, becomes `#111` on hover (not indigo)

- [ ] **Step 3: Commit**

```bash
git add components/Project.tsx
git commit -m "style: project rows — small numbers, sharp filters, no color hover"
```

---

## Task 9: Contact — Link Rows + Footer

**Files:**
- Modify: `components/Contact.tsx`

- [ ] **Step 1: Rewrite Contact.tsx**

Replace the entire content of `components/Contact.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <section id="contact" className="py-14 bg-background border-t border-[#e8e8e8]">
      <div className="max-w-4xl mx-auto px-8 w-full">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-16"
        >
          {/* Left: headline */}
          <div>
            <h2
              className="font-serif font-black tracking-[-0.03em] text-foreground leading-[1.05] mb-4"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
            >
              Let&apos;s build<br />something.
            </h2>
            <p className="text-[13px] text-muted-foreground leading-[1.65]">
              Open to internships, full-time roles, and freelance projects.
              Based in Johor, Malaysia. Remote-friendly.
            </p>
          </div>

          {/* Right: link rows */}
          <div className="flex flex-col gap-2.5 sm:pt-1">
            <Link
              href="mailto:hafizu2302@gmail.com"
              className="group flex items-center justify-between border border-[#e8e8e8] rounded-[4px] px-4 py-3 hover:border-[#111] transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground">Email</span>
              <span className="text-[#cccccc] group-hover:text-foreground group-hover:translate-x-0.5 transition-all text-[13px]">↗</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/muh-hafizuddin/"
              target="_blank"
              className="group flex items-center justify-between border border-[#e8e8e8] rounded-[4px] px-4 py-3 hover:border-[#111] transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground">LinkedIn</span>
              <span className="text-[#cccccc] group-hover:text-foreground group-hover:translate-x-0.5 transition-all text-[13px]">↗</span>
            </Link>
            <Link
              href="https://github.com/apiz23"
              target="_blank"
              className="group flex items-center justify-between border border-[#e8e8e8] rounded-[4px] px-4 py-3 hover:border-[#111] transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground">GitHub</span>
              <span className="text-[#cccccc] group-hover:text-foreground group-hover:translate-x-0.5 transition-all text-[13px]">↗</span>
            </Link>
            <Link
              href="https://x.com/piz230601"
              target="_blank"
              className="group flex items-center justify-between border border-[#e8e8e8] rounded-[4px] px-4 py-3 hover:border-[#111] transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-foreground">Twitter / X</span>
              <span className="text-[#cccccc] group-hover:text-foreground group-hover:translate-x-0.5 transition-all text-[13px]">↗</span>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="border-t border-[#e8e8e8] pt-6 flex justify-between items-center"
        >
          <p className="font-mono text-[10px] text-muted-foreground">
            © {currentYear} Hafizuddin Hamid
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </button>
        </motion.div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Scroll to Contact. Verify:
- Two-column layout: headline left, 4 link rows right
- Link rows: `border border-[#e8e8e8]`, hover darkens border to `#111`
- Arrow starts `#ccc`, becomes `#111` + translates `0.5px` on hover
- No form inputs, no send button, no confetti
- Footer: copyright left, back-to-top right, separated by `1px #e8e8e8` rule

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx
git commit -m "style: contact link rows replacing form, merged footer"
```

---

## Task 10: Final Verification

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: no TypeScript errors, no CSS compilation errors. Next.js build output shows all pages compiled.

- [ ] **Step 2: Run dev and do a full scroll-through**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll from top to bottom. Check each section:

| Section | Pass criteria |
|---------|---------------|
| Navbar | Dark pill floating, no theme toggle, active dot animates |
| Hero | Green badge static, name tight, rule animates, no marquee |
| Skills | Grid lines, no bars, icons gray |
| Education | Timeline rows, monochrome chart |
| Experience | Timeline rows match Education pattern |
| Projects | Small numbers, sharp filter buttons, no color hover |
| Contact | Two-col, link rows, footer with back-to-top |
| Overall | White bg throughout, no indigo anywhere, no dark mode remnants |

- [ ] **Step 3: Check mobile (375px viewport)**

In browser DevTools, set viewport to 375px. Verify:
- Navbar pill visible, shows only `HF.` logo + Contact link on mobile
- Hero: single column, stats below bio
- Skills: 2-column grid
- Education/Experience: single column (date above content)
- Projects: year and tags hidden, title + number + arrow visible
- Contact: single column (headline above link rows)

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: minimalist redesign complete"
```
