import { ImageResponse } from "next/og";
import { avatarDataUri, BRAND } from "@/lib/og-assets";

const { ink: INK, paper: PAPER, gold: GOLD, inkDim: INK_DIM } = BRAND;

export const OG_ALT = "Muhd Hafizuddin — Software Developer Portfolio";

export const OG_SIZES = {
  wide: { width: 1200, height: 630 },
  square: { width: 1200, height: 1200 },
} as const;

export type OgSizeKey = keyof typeof OG_SIZES;

function Mark({ size: s = 120 }: { size?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 100 100">
      <g fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M6 18V6H18" />
        <path d="M82 6H94V18" />
        <path d="M94 82V94H82" />
        <path d="M18 94H6V82" />
      </g>
      <g fill="none" stroke={INK} strokeWidth={5} strokeLinejoin="miter" strokeLinecap="butt">
        <path d="M22 28V72" />
        <path d="M46 28V72" />
        <path d="M22 50H46" />
        <path d="M58 28V72" />
        <path d="M58 28H82" />
        <path d="M58 50H78" />
      </g>
      <path d="M78 50H82" fill="none" stroke={GOLD} strokeWidth={5} strokeLinejoin="miter" strokeLinecap="butt" />
    </svg>
  );
}

function Rulers({ step }: { step: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        backgroundImage: `linear-gradient(90deg, ${INK}12 1px, transparent 1px)`,
        backgroundSize: `${step}px 100%`,
        opacity: 0.5,
      }}
    />
  );
}

function Headline({ fontSize, align = "left" }: { fontSize: number; align?: "left" | "center" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "center" ? "center" : "flex-start" }}>
      <span style={{ fontSize, lineHeight: 0.95, letterSpacing: "-0.02em", color: INK }}>
        I build software,
      </span>
      <span
        style={{
          fontSize,
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          color: INK_DIM,
          fontStyle: "italic",
        }}
      >
        automate workflows.
      </span>
    </div>
  );
}

function StatusPill({ fontSize, dot = GOLD }: { fontSize: number; dot?: string }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize,
        letterSpacing: "0.14em",
        color: INK,
        fontFamily: "monospace",
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 999, background: dot, display: "flex" }} />
      Open to work
    </span>
  );
}

function LandscapeCard({ width, height }: { width: number; height: number }) {
  const avatar = avatarDataUri();
  const padX = Math.round(width * 0.053);
  const padY = Math.round(height * 0.095);
  const headline = Math.round(height * 0.152);
  const portrait = Math.round(height * 0.476);
  const gap = Math.round(width * 0.06);
  const copyWidth = width - padX * 2 - portrait - gap;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: `${padY}px ${padX}px`,
        background: PAPER,
        fontFamily: "Georgia, serif",
        position: "relative",
      }}
    >
      <Rulers step={Math.round(width * 0.133)} />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: copyWidth }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Mark size={52} />
          <span style={{ fontSize: 26, color: INK }}>Hafizuddin</span>
        </div>

        <Headline fontSize={headline} />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ width: "100%", height: 1, background: `${INK}30` }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontSize: 15,
                letterSpacing: "0.14em",
                color: INK_DIM,
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              Software Engineer · UTHM
            </span>
            <StatusPill fontSize={15} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
        <div
          style={{
            display: "flex",
            width: portrait,
            height: portrait,
            boxShadow: `0 0 0 4px ${INK}`,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar}
            alt=""
            width={portrait}
            height={portrait}
            style={{ objectFit: "cover", objectPosition: "top", filter: "grayscale(1)" }}
          />
        </div>
        <span
          style={{
            fontSize: 13,
            letterSpacing: "0.2em",
            color: INK_DIM,
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          Muhd Hafizuddin
        </span>
      </div>
    </div>
  );
}

function SquareCard({ size: s }: { size: number }) {
  const avatar = avatarDataUri();
  const pad = Math.round(s * 0.075);
  const portrait = Math.round(s * 0.34);
  const headline = Math.round(s * 0.112);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: `${pad}px`,
        background: PAPER,
        fontFamily: "Georgia, serif",
        position: "relative",
        textAlign: "center",
      }}
    >
      <Rulers step={Math.round(s * 0.15)} />

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Mark size={56} />
        <span style={{ fontSize: 28, color: INK }}>Hafizuddin</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: Math.round(s * 0.05) }}>
        <div
          style={{
            display: "flex",
            width: portrait,
            height: portrait,
            boxShadow: `0 0 0 5px ${INK}`,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar}
            alt=""
            width={portrait}
            height={portrait}
            style={{ objectFit: "cover", objectPosition: "top", filter: "grayscale(1)" }}
          />
        </div>
        <Headline fontSize={headline} align="center" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, width: "100%" }}>
        <div style={{ width: "100%", height: 1, background: `${INK}30` }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <span
            style={{
              fontSize: 17,
              letterSpacing: "0.14em",
              color: INK_DIM,
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Software Engineer · UTHM
          </span>
          <StatusPill fontSize={17} />
        </div>
      </div>
    </div>
  );
}

export function renderOgCard(width: number, height: number) {
  const landscape = width / height >= 1.35;
  return new ImageResponse(
    landscape ? <LandscapeCard width={width} height={height} /> : <SquareCard size={width} />,
    { width, height }
  );
}
