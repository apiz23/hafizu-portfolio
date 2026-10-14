"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.65, 0, 0.35, 1] as const;

const INK = "#2F1664";
const GOLD = "#EACB49";

/** Stroke draw-on. Reduced motion renders the finished stroke instantly. */
const draw = (t: number, d = 0.6, reduced = false) => ({
  initial: { pathLength: reduced ? 1 : 0 },
  animate: { pathLength: 1 },
  transition: { delay: reduced ? 0 : t, duration: reduced ? 0 : d, ease: EASE },
});

type LogoSplashProps = {
  onDone?: () => void;
  /** Background of the splash overlay. Defaults to the site's cream paper. */
  background?: string;
  /** Diameter of the mark. Defaults to clamp(180px, 42vmin, 320px). */
  size?: string;
};

/**
 * HF logo splash. Animates the "measured monogram" in construction order —
 * corner frame → posts → crossbars → gold tick — then calls `onDone`.
 */
export default function LogoSplash({
  onDone,
  background = "#F9F4F2",
  size = "clamp(180px, 42vmin, 320px)",
}: LogoSplashProps) {
  const reduced = !!useReducedMotion();

  // Corner frame ticks — structure lands first, staggered clockwise from top-left.
  const corners = ["M6 18V6H18", "M82 6H94V18", "M94 82V94H82", "M18 94H6V82"];

  return (
    <div
      className="grid min-h-dvh place-items-center"
      style={{ background }}
    >
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label="Muhd Hafizuddin"
        style={{ width: size, height: "auto" }}
      >
        {/* 1. Structure — corner frame ticks draw on in sequence */}
        {corners.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke={INK}
            strokeWidth={2}
            strokeLinejoin="miter"
            strokeLinecap="butt"
            {...draw(0.1 + i * 0.15, 0.45, reduced)}
          />
        ))}

        {/* 2. Vertical posts — H left, H right, F stem */}
        <motion.path d="M22 28V72" fill="none" stroke={INK} strokeWidth={5} strokeLinejoin="miter" strokeLinecap="butt" {...draw(0.6, 0.55, reduced)} />
        <motion.path d="M46 28V72" fill="none" stroke={INK} strokeWidth={5} strokeLinejoin="miter" strokeLinecap="butt" {...draw(0.75, 0.55, reduced)} />
        <motion.path d="M58 28V72" fill="none" stroke={INK} strokeWidth={5} strokeLinejoin="miter" strokeLinecap="butt" {...draw(0.9, 0.55, reduced)} />

        {/* 3. Horizontals — H crossbar, F top arm, F mid arm */}
        <motion.path d="M22 50H46" fill="none" stroke={INK} strokeWidth={5} strokeLinejoin="miter" strokeLinecap="butt" {...draw(1.5, 0.5, reduced)} />
        <motion.path d="M58 28H82" fill="none" stroke={INK} strokeWidth={5} strokeLinejoin="miter" strokeLinecap="butt" {...draw(1.7, 0.45, reduced)} />
        <motion.path d="M58 50H78" fill="none" stroke={INK} strokeWidth={5} strokeLinejoin="miter" strokeLinecap="butt" {...draw(1.95, 0.45, reduced)} />

        {/* 4. Accent lands last and alone — fires onDone */}
        <motion.path
          d="M78 50H82"
          fill="none"
          stroke={GOLD}
          strokeWidth={5}
          strokeLinejoin="miter"
          strokeLinecap="butt"
          {...draw(2.45, 0.35, reduced)}
          onAnimationComplete={onDone}
        />
      </svg>
    </div>
  );
}
