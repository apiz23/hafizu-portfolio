/**
 * Geometric line-art props for the Violet Ink system.
 * Thin ink strokes only — no fills, no glow, no playful shapes.
 */

export function OrbitRings({
  className = "",
  size = 520,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`animate-orbit ${className}`}
      style={{ "--orbit-duration": "90s" } as React.CSSProperties}
      fill="none"
      stroke="hsl(var(--ink))"
      strokeWidth="0.4"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="96" opacity="0.16" />
      <circle cx="100" cy="100" r="72" opacity="0.12" />
      <circle cx="100" cy="100" r="48" opacity="0.1" strokeDasharray="1 3" />
      <circle cx="100" cy="100" r="24" opacity="0.22" />
      <circle cx="100" cy="4" r="1.6" fill="hsl(var(--accent))" stroke="none" />
      <circle cx="172" cy="100" r="1.4" fill="hsl(var(--ink))" stroke="none" opacity="0.5" />
      <line x1="100" y1="0" x2="100" y2="200" opacity="0.06" />
      <line x1="0" y1="100" x2="200" y2="100" opacity="0.06" />
    </svg>
  );
}

export function ArchOutline({
  className = "",
  width = 220,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 180"
      width={width}
      height={width * 1.5}
      className={className}
      fill="none"
      stroke="hsl(var(--ink))"
      strokeWidth="0.6"
      aria-hidden="true"
    >
      <path d="M8 180 V70 A52 52 0 0 1 112 70 V180" opacity="0.18" />
      <path d="M20 180 V74 A40 40 0 0 1 100 74 V180" opacity="0.1" strokeDasharray="2 4" />
      <line x1="0" y1="180" x2="120" y2="180" opacity="0.24" />
    </svg>
  );
}

export function ColumnOutline({
  className = "",
  height = 200,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <svg
      viewBox="0 0 60 200"
      width={height * 0.3}
      height={height}
      className={className}
      fill="none"
      stroke="hsl(var(--ink))"
      strokeWidth="0.6"
      aria-hidden="true"
    >
      <line x1="6" y1="6" x2="54" y2="6" opacity="0.22" />
      <line x1="6" y1="194" x2="54" y2="194" opacity="0.22" />
      <line x1="18" y1="14" x2="18" y2="186" opacity="0.12" strokeDasharray="1 4" />
      <line x1="42" y1="14" x2="42" y2="186" opacity="0.12" strokeDasharray="1 4" />
    </svg>
  );
}
