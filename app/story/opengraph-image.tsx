import { ImageResponse } from "next/og";
import { avatarDataUri, BRAND } from "@/lib/og-assets";

export const alt = "Muhd Hafizuddin — Software Developer";
export const size = { width: 1080, height: 1920 };
export const contentType = "image/png";

const { ink: INK, paper: PAPER, gold: GOLD, inkDim: INK_DIM } = BRAND;

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

/**
 * Portrait 1080x1920 (9:16) share card — for Stories / Reels / TikTok.
 * Not used as the link-preview (social platforms crop landscape); that's
 * app/opengraph-image.tsx. View this at /story to download.
 */
export default async function Image() {
  const avatar = avatarDataUri();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "120px 96px",
          background: PAPER,
          fontFamily: "Georgia, serif",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Column rulers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: `linear-gradient(90deg, ${INK}12 1px, transparent 1px)`,
            backgroundSize: "180px 100%",
            opacity: 0.5,
          }}
        />

        {/* Top: brand */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <Mark size={96} />
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.28em",
              color: INK_DIM,
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Muhd Hafizuddin
          </span>
        </div>

        {/* Middle: portrait + headline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 72 }}>
          <div
            style={{
              display: "flex",
              width: 460,
              height: 460,
              boxShadow: `0 0 0 6px ${INK}`,
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar}
              alt=""
              width={460}
              height={460}
              style={{ objectFit: "cover", objectPosition: "top", filter: "grayscale(1)" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: 108, lineHeight: 0.98, letterSpacing: "-0.02em", color: INK }}>
              Building the web
            </span>
            <span
              style={{
                fontSize: 108,
                lineHeight: 0.98,
                letterSpacing: "-0.02em",
                color: INK_DIM,
                fontStyle: "italic",
              }}
            >
              with precision.
            </span>
          </div>
        </div>

        {/* Bottom: footer */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28, width: "100%" }}>
          <div style={{ width: "100%", height: 1, background: `${INK}30` }} />
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.16em",
              color: INK_DIM,
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Next.js · TypeScript · PostgreSQL
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 28px",
              background: GOLD,
              color: "#2F1664",
              fontSize: 22,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: 999, background: INK, display: "flex" }} />
            Open to work
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
