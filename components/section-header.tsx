"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

type Variant = "index" | "stacked" | "reversed" | "feature" | "bare";

/**
 * Shared section header. The variant controls the rhythm so consecutive
 * sections don't all read as "eyebrow → title → rule":
 *
 *  - index    → `01 — Label  Title` on the left, meta on the right
 *  - stacked  → label above, title below
 *  - reversed → title on the left, label pushed right
 *  - feature  → oversized title left, label + meta grouped right
 *  - bare     → label only (section supplies its own headline)
 */
export default function SectionHeader({
  index,
  label,
  title,
  meta,
  variant = "index",
}: {
  index: string;
  label: string;
  title?: string;
  meta?: ReactNode;
  variant?: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once:true, margin: "-10%" });

  const eyebrow = (
    <span className="eyebrow">
      {index} — {label}
    </span>
  );

  const heading = (
    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="display-md text-foreground"
    >
      {title}
    </motion.h2>
  );

  if (variant === "bare") {
    return (
      <div ref={ref} className="flex items-baseline justify-between rule-b pb-5">
        {eyebrow}
        {meta}
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div ref={ref} className="rule-b pb-5">
        {eyebrow}
        <div className="mt-3">{heading}</div>
      </div>
    );
  }

  if (variant === "reversed") {
    return (
      <div ref={ref} className="flex items-baseline justify-between gap-6 rule-b pb-5">
        {heading}
        {eyebrow}
      </div>
    );
  }

  if (variant === "feature") {
    return (
      <div ref={ref} className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 rule-b pb-5">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="display-lg text-foreground"
        >
          {title}
        </motion.h2>
        <div className="flex items-baseline gap-4 pb-1.5">
          {eyebrow}
          {meta}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="flex items-baseline justify-between gap-6 rule-b pb-5">
      <div className="flex items-baseline gap-4">
        {eyebrow}
        {heading}
      </div>
      {meta}
    </div>
  );
}
