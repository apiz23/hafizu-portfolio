"use client";

import { Fragment } from "react";

type MarqueeProps = {
  items: string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Counter-scrolling kinetic band bounded by ink hairlines.
 * Two identical track copies translate by -50% so the seam is invisible.
 */
export default function Marquee({
  items,
  duration = 60,
  reverse = false,
  className = "",
}: MarqueeProps) {
  const track = (
    <div className="flex shrink-0">
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <span className="whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.24em] text-foreground/80">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="mx-6 inline-block h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-accent"
          />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={`rule-y relative flex select-none overflow-hidden py-5 ${className}`}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      aria-hidden="true"
    >
      <div
        className={`flex min-w-full shrink-0 items-center gap-0 ${
          reverse ? "animate-marquee-r" : "animate-marquee-l"
        }`}
      >
        {track}
        {track}
      </div>
    </div>
  );
}
