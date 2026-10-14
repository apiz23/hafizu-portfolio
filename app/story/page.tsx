import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Share cards — Muhd Hafizuddin",
  description: "1200px link-preview and share cards in two aspect ratios.",
};

const cards = [
  {
    key: "wide",
    label: "Link preview",
    dims: "1200 × 630",
    aspect: "aspect-[1200/630]",
    max: "max-w-[520px]",
  },
  {
    key: "square",
    label: "Square",
    dims: "1200 × 1200",
    aspect: "aspect-square",
    max: "max-w-[420px]",
  },
];

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Link
          href="/"
          className="mb-8 inline-flex font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim link-underline"
        >
          ← Back home
        </Link>
        <p className="eyebrow">Assets</p>
        <h1 className="display-md mt-3 text-foreground">Share cards</h1>
        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-dim">
          Generated 1200px-wide cards in two aspect ratios. Right-click an image
          (or open its URL directly) to save it.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {cards.map((card) => (
            <div key={card.key}>
              <p className="eyebrow mb-3">
                {card.label} — {card.dims}
              </p>
              <div
                className={`relative ${card.aspect} w-full ${card.max} overflow-hidden border border-edge`}
              >
                <Image
                  src={`/api/og?size=${card.key}`}
                  alt={`${card.label} share card`}
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
              <a
                href={`/api/og?size=${card.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex font-mono text-[11px] uppercase tracking-[0.14em] text-foreground link-underline"
              >
                Open full size ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
