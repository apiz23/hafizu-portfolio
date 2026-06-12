# Scroll Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add polished scroll animations — GSAP ScrollTrigger scrub on the hero name, Framer Motion clip-path wipe on all section headings, and stagger slide-up on all repeating content items.

**Architecture:** Shared animation constants in `lib/animations.ts` consumed by all components. GSAP ScrollTrigger is used only in `Intro.tsx` for the hero name. Every other animation uses Framer Motion `whileInView` with `viewport: { once: true }`. Project rows keep `animate` (inside AnimatePresence) but adopt updated params.

**Tech Stack:** GSAP 3.12 (ScrollTrigger plugin, already installed), Framer Motion 11 (already installed), Next.js 16 / React 19 / TypeScript

---

## File Map

| File | Action | What changes |
|---|---|---|
| `lib/animations.ts` | **Create** | Shared `EASE_OUT_EXPO`, `fadeUp`, `clipReveal` |
| `components/Intro.tsx` | Modify | Import from lib, add `headingRef` + GSAP effect |
| `components/Skills.tsx` | Modify | h2 → clipReveal, cells → fadeUp stagger |
| `components/Education.tsx` | Modify | h2 → clipReveal, rows → fadeUp stagger |
| `components/Experience.tsx` | Modify | h2 → clipReveal, rows → fadeUp stagger |
| `components/Project.tsx` | Modify | h2 → clipReveal, rows → updated animate params |
| `components/Contact.tsx` | Modify | h2 → clipReveal, link rows → fadeUp stagger |

---

## Task 1: Create shared animation constants

**Files:**
- Create: `lib/animations.ts`

- [ ] **Step 1: Create the file**

```ts
// lib/animations.ts
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.05,
      ease: EASE_OUT_EXPO,
    },
  }),
};

export const clipReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/animations.ts
git commit -m "feat: add shared scroll animation constants"
```

---

## Task 2: Intro.tsx — GSAP hero name scrub

**Files:**
- Modify: `components/Intro.tsx`

The `<h1>` element (containing MUHD + HAFIZUDDIN spans) needs a `ref`. On mount, GSAP ScrollTrigger ties `y: -40, opacity: 0` to scroll position so the name scrubs out as the user scrolls past the hero section. Skip the effect when `prefers-reduced-motion` is set. Also swap the local `fadeUp` definition for the one from `lib/animations.ts`.

- [ ] **Step 1: Update imports at top of file**

Replace:
```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
```

With:
```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { RiExternalLinkLine } from "react-icons/ri";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fadeUp, clipReveal } from "@/lib/animations";
```

- [ ] **Step 2: Add ref and GSAP effect inside the component**

Add after the `scrollToProjects` function (before the return statement):

```tsx
const headingRef = useRef<HTMLHeadingElement>(null);

useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const ctx = gsap.context(() => {
    gsap.to(headingRef.current, {
      y: -40,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        start: "center top",
        end: "bottom top",
        scrub: 1,
      },
    });
  });
  return () => ctx.revert();
}, []);
```

- [ ] **Step 3: Attach ref to the h1 and update its variants**

Find the `<motion.h1>` element and update it:

```tsx
<motion.h1
  ref={headingRef}
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
```

- [ ] **Step 4: Verify dev server — scroll hero test**

```bash
npm run dev
```

Open http://localhost:3000. Scroll slowly past the hero. `MUHD HAFIZUDDIN` should scrub (fade + move up) as the hero section scrolls out. Scroll back up — name returns. Badge, bio, CTAs, socials are unaffected.

- [ ] **Step 5: Commit**

```bash
git add components/Intro.tsx
git commit -m "feat: GSAP ScrollTrigger scrub on hero name"
```

---

## Task 3: Skills.tsx — clip-path h2 + stagger cells

**Files:**
- Modify: `components/Skills.tsx`

- [ ] **Step 1: Update imports**

Replace:
```tsx
import { motion } from "framer-motion";
```
With:
```tsx
import { motion } from "framer-motion";
import { fadeUp, clipReveal } from "@/lib/animations";
```

- [ ] **Step 2: Replace the heading motion.div + h2 block**

Find and replace:
```tsx
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
```

With:
```tsx
<div className="flex justify-between items-end mb-8">
  <motion.h2
    variants={clipReveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-10%" }}
    className="font-serif font-black uppercase tracking-[-0.04em] text-foreground"
    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
  >
    SKILLS
  </motion.h2>
</div>
```

- [ ] **Step 3: Replace the skills grid motion.div + cells**

Find and replace:
```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 }}
  className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-[1px] bg-border border border-border rounded-[6px] overflow-hidden"
>
  {skills.map((skill) => (
    <div
      key={skill.name}
      className="bg-background px-4 py-4 flex flex-col gap-1.5"
    >
```

With:
```tsx
<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-[1px] bg-border border border-border rounded-[6px] overflow-hidden">
  {skills.map((skill, index) => (
    <motion.div
      key={skill.name}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-background px-4 py-4 flex flex-col gap-1.5"
    >
```

Also close the wrapper correctly — the closing `</motion.div>` for the grid wrapper becomes `</div>` and the `</div>` per-cell becomes `</motion.div>`.

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Scroll to Skills section. Heading "SKILLS" should wipe up from a mask. Each skill cell should stagger-fade-up one by one.

- [ ] **Step 5: Commit**

```bash
git add components/Skills.tsx
git commit -m "feat: clip-path h2 reveal + stagger cells in Skills"
```

---

## Task 4: Education.tsx — clip-path h2 + stagger rows

**Files:**
- Modify: `components/Education.tsx`

- [ ] **Step 1: Update imports**

Add to existing imports:
```tsx
import { fadeUp, clipReveal } from "@/lib/animations";
```

- [ ] **Step 2: Replace the h2 motion element**

Find:
```tsx
<motion.h2
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="font-serif font-black uppercase tracking-[-0.04em] text-foreground mb-10"
  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
>
  EDUCATION
</motion.h2>
```

Replace with:
```tsx
<motion.h2
  variants={clipReveal}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-10%" }}
  className="font-serif font-black uppercase tracking-[-0.04em] text-foreground mb-10"
  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
>
  EDUCATION
</motion.h2>
```

- [ ] **Step 3: Replace timeline row animations**

Find each row's motion.div (the map callback):
```tsx
<motion.div
  key={edu.level}
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.08 }}
  className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 border-t border-[#e8e8e8] py-5"
>
```

Replace with:
```tsx
<motion.div
  key={edu.level}
  custom={index}
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 border-t border-[#e8e8e8] py-5"
>
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Scroll to Education. Heading "EDUCATION" wipes up. Timeline rows stagger in one by one.

- [ ] **Step 5: Commit**

```bash
git add components/Education.tsx
git commit -m "feat: clip-path h2 reveal + stagger rows in Education"
```

---

## Task 5: Experience.tsx — clip-path h2 + stagger rows

**Files:**
- Modify: `components/Experience.tsx`

- [ ] **Step 1: Update imports**

Add to existing imports:
```tsx
import { fadeUp, clipReveal } from "@/lib/animations";
```

- [ ] **Step 2: Replace the h2 motion element**

Find:
```tsx
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
```

Replace with:
```tsx
<motion.h2
  variants={clipReveal}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-10%" }}
  className="font-serif font-black uppercase tracking-[-0.04em] text-foreground mb-10"
  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
>
  EXPERIENCE
</motion.h2>
```

- [ ] **Step 3: Replace experience row animations**

Find:
```tsx
<motion.div
  key={exp.company}
  initial={{ opacity: 0, y: 12 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.08 }}
  className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 border-t border-border py-5"
>
```

Replace with:
```tsx
<motion.div
  key={exp.company}
  custom={index}
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 border-t border-border py-5"
>
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Scroll to Experience. Heading wipes up. Experience card staggers in.

- [ ] **Step 5: Commit**

```bash
git add components/Experience.tsx
git commit -m "feat: clip-path h2 reveal + stagger rows in Experience"
```

---

## Task 6: Project.tsx — clip-path h2 + updated row params

**Files:**
- Modify: `components/Project.tsx`

Note: project rows use `animate` (not `whileInView`) because they live inside `AnimatePresence`. Do NOT change them to `whileInView`. Only update the animation parameter values to match the new constants.

- [ ] **Step 1: Update imports**

Add to existing imports:
```tsx
import { clipReveal, EASE_OUT_EXPO } from "@/lib/animations";
```

- [ ] **Step 2: Replace the header motion.div + h2**

Find:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="flex justify-between items-baseline"
>
  <h2
    className="font-serif font-black uppercase tracking-[-0.04em]"
    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
  >
    PROJECTS
  </h2>
  <span className="font-mono text-[13px] text-muted-foreground">
    {loading ? "—" : `${projects.length} projects`}
  </span>
</motion.div>
```

Replace with:
```tsx
<div className="flex justify-between items-baseline">
  <motion.h2
    variants={clipReveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-10%" }}
    className="font-serif font-black uppercase tracking-[-0.04em]"
    style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
  >
    PROJECTS
  </motion.h2>
  <span className="font-mono text-[13px] text-muted-foreground">
    {loading ? "—" : `${projects.length} projects`}
  </span>
</div>
```

- [ ] **Step 3: Update project row animation params**

Find (inside the `filteredProjects.map`):
```tsx
<motion.div
  key={project.id}
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: index * 0.04,
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1],
  }}
>
```

Replace with:
```tsx
<motion.div
  key={project.id}
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: index * 0.05,
    duration: 0.4,
    ease: EASE_OUT_EXPO,
  }}
>
```

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Scroll to Projects. "PROJECTS" heading wipes up. Switching filter categories re-staggers rows with updated timing.

- [ ] **Step 5: Commit**

```bash
git add components/Project.tsx
git commit -m "feat: clip-path h2 reveal + updated row stagger in Projects"
```

---

## Task 7: Contact.tsx — clip-path h2 + stagger link rows

**Files:**
- Modify: `components/Contact.tsx`

- [ ] **Step 1: Update imports**

Replace:
```tsx
import { motion } from "framer-motion";
```
With:
```tsx
import { motion } from "framer-motion";
import { fadeUp, clipReveal } from "@/lib/animations";
```

- [ ] **Step 2: Replace the h2**

Find:
```tsx
<h2
  className="font-serif font-black tracking-[-0.03em] leading-[1.05] text-foreground"
  style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
>
  Let&apos;s build
  <br />
  something.
</h2>
```

Replace with:
```tsx
<motion.h2
  variants={clipReveal}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-10%" }}
  className="font-serif font-black tracking-[-0.03em] leading-[1.05] text-foreground"
  style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
>
  Let&apos;s build
  <br />
  something.
</motion.h2>
```

- [ ] **Step 3: Add stagger to link rows**

Find:
```tsx
<div className="flex flex-col gap-2.5">
  {links.map(({ label, href }) => (
    <Link
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between border border-border rounded-[4px] px-3.5 py-2.5 hover:border-foreground transition-colors group cursor-pointer"
    >
```

Replace with:
```tsx
<div className="flex flex-col gap-2.5">
  {links.map(({ label, href }, index) => (
    <motion.div
      key={label}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between border border-border rounded-[4px] px-3.5 py-2.5 hover:border-foreground transition-colors group cursor-pointer"
      >
```

Close the `motion.div` after the closing `</Link>` tag (before the closing of the map arrow function).

- [ ] **Step 4: Verify**

```bash
npm run dev
```

Scroll to Contact. "Let's build something." wipes up. EMAIL / LINKEDIN / GITHUB rows stagger in with 50ms between each.

- [ ] **Step 5: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: clip-path h2 reveal + stagger link rows in Contact"
```

---

## Final check

- [ ] Run `npx tsc --noEmit` — no TypeScript errors
- [ ] Open http://localhost:3000 in browser, scroll through all sections top to bottom:
  - Hero: name scrubs out as you scroll, returns on scroll up
  - Skills, Education, Experience, Projects, Contact: each heading wipes up from mask
  - All content items (cells, rows, links) stagger-fade-up on enter
  - Scroll back up — nothing re-animates (all `once: true`)
- [ ] Test with `prefers-reduced-motion: reduce` in browser devtools (Rendering tab → Emulate CSS media feature) — all animations should be instant/disabled
