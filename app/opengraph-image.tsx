import { ImageResponse } from "next/og";
import { avatarDataUri, BRAND } from "@/lib/og-assets";

export const alt = "Muhd Hafizuddin — Software Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const { ink: INK, paper: PAPER, gold: GOLD, inkDim: INK_DIM } = BRAND;

// HF "measured monogram" inlined for Satori (explicit paths only).
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

export default async function Image() {
  const avatar = avatarDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          padding: "60px 64px",
          background: PAPER,
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Column rulers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `linear-gradient(90deg, ${INK}12 1px, transparent 1px)`,
            backgroundSize: "160px 100%",
            opacity: 0.5,
          }}
        />

        {/* Left column: copy */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          {/* Brand row */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Mark size={52} />
            <span style={{ fontSize: 26, color: INK }}>Hafizuddin</span>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 96, lineHeight: 0.95, letterSpacing: "-0.02em", color: INK }}>
              Building the web
            </span>
            <span
              style={{
                fontSize: 96,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: INK_DIM,
                fontStyle: "italic",
              }}
            >
              with precision.
            </span>
          </div>

          {/* Footer */}
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
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 15,
                  letterSpacing: "0.14em",
                  color: INK,
                  fontFamily: "monospace",
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 999, background: GOLD, display: "flex" }} />
                Open to work
              </span>
            </div>
          </div>
        </div>

        {/* Right column: portrait + label */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              width: 300,
              height: 300,
              boxShadow: `0 0 0 4px ${INK}`,
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt=""
              width={300}
              height={300}
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
    ),
    { ...size }
  );
}
