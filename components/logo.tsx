import type { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & {
  /** Size in px (square). Defaults to 24. */
  size?: number;
  /** Accessible label. Pass null for decorative use (e.g. next to a wordmark). */
  label?: string | null;
};

/**
 * HF "measured monogram" — H and F on a shared grid, corner ticks echoing
 * the site's ring/corner language, one gold tick on the F terminal.
 */
export default function Logo({ size = 24, label = "Muhd Hafizuddin", ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role={label ? "img" : undefined}
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...props}
    >
      {/* corner frame ticks (hairline) */}
      <g fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M6 18V6H18" />
        <path d="M82 6H94V18" />
        <path d="M94 82V94H82" />
        <path d="M18 94H6V82" />
      </g>

      {/* H + F */}
      <g fill="none" stroke="currentColor" strokeWidth={5} strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M22 28V72" />
        <path d="M46 28V72" />
        <path d="M22 50H46" />
        <path d="M58 28V72" />
        <path d="M58 28H82" />
        <path d="M58 50H78" />
      </g>

      {/* gold accent tick on the F mid-arm terminal */}
      <path
        d="M78 50H82"
        fill="none"
        stroke="#EACB49"
        strokeWidth={5}
        strokeLinejoin="miter"
        strokeLinecap="butt"
      />
    </svg>
  );
}
