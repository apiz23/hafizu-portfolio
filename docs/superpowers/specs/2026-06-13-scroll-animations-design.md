# Scroll Animations Design

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add polished scroll-based animations across the portfolio — GSAP ScrollTrigger on the hero name, Framer Motion clip-path wipe on section headings, and stagger slide-up on all content items.

**Approach:** Hybrid — GSAP handles the single cinematic hero scrub effect; Framer Motion handles all section reveals (uses existing dep, zero new bundle cost for sections).

**Tech Stack:** GSAP 3.12 (ScrollTrigger plugin), Framer Motion 11, Next.js 16 / React 19 / TypeScript

---

## 1. Shared Animation Constants

Extract shared easing and variant config to `lib/animations.ts` so all components stay in sync.

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

All components import from `lib/animations.ts` — no inline variant objects.

---

## 2. Hero — GSAP ScrollTrigger Name Scrub

**File:** `components/Intro.tsx`

- On mount, register `ScrollTrigger` plugin and attach a scrub animation to the `<h1>` element via a `ref`
- As the user scrolls the hero out of view (trigger: `#home` bottom leaving viewport), the heading translates up 40px and fades to opacity 0, tied to scroll position with `scrub: 1`
- Reverse scroll restores it — no snap, purely scroll-linked
- Animation cleans up on unmount (`ctx.revert()`)

```ts
useEffect(() => {
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

- `headingRef` attached to the `<h1>` containing `MUHD` + `HAFIZUDDIN`
- Does NOT affect the badge, bio, CTAs, or socials — heading only
- `prefers-reduced-motion`: skip GSAP setup if `window.matchMedia("(prefers-reduced-motion: reduce)").matches`

---

## 3. Section Headings — Framer Motion Clip-Path Wipe

**Files:** `Skills.tsx`, `Education.tsx`, `Experience.tsx`, `Project.tsx`, `Contact.tsx`

Every section `<h2>` uses `clipReveal` variant from `lib/animations.ts`:

```tsx
<motion.h2
  variants={clipReveal}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-10%" }}
  className="..."
>
  SECTION NAME
</motion.h2>
```

- `clipPath: "inset(100% 0 0 0)"` → `"inset(0% 0 0 0)"` — text slides up from behind invisible bottom mask
- Parent element does NOT need `overflow: hidden` — clip-path is self-contained
- The existing horizontal rule `scaleX` animation in `Intro.tsx` fires at same time (same `whileInView` trigger), drawing left→right simultaneously with the heading wipe on `Education`, `Experience`, `Project` sections that have rules

---

## 4. Content Items — Framer Motion Stagger Slide-Up

**Files:** All section components

Every repeating content item uses `fadeUp` variant from `lib/animations.ts`:

```tsx
<motion.div
  custom={index}
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
```

Parameters:
- `y: 16` (up from 12 in current code)
- `opacity: 0 → 1`
- `delay: index * 0.05` (down from 0.08 — tighter, snappier)
- `duration: 0.4s`
- `ease: [0.22, 1, 0.36, 1]`
- `viewport: { once: true }` — no re-trigger on scroll up

**Per-section application:**
| Section | Items animated |
|---|---|
| Skills | Each skill cell (`motion.div` per cell) |
| Education | Each timeline row |
| Experience | Each experience block |
| Projects | Each project row (already animated, update params) |
| Contact | Each link row |

---

## 5. Accessibility

`globals.css` already has:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

This covers all Framer Motion CSS transitions. For GSAP: check `prefers-reduced-motion` before registering the ScrollTrigger effect (see Section 2 above).

---

## 6. Out of Scope

- No parallax on section backgrounds
- No pinned sections (GSAP pin)
- No text split/word-by-word reveals
- No scroll-linked progress indicator
- No page transition animations
