import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Share card — Muhd Hafizuddin",
  description: "1080×1920 portrait share card.",
};

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
        <p className="eyebrow">Asset</p>
        <h1 className="display-md mt-3 text-foreground">Share card</h1>
        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-dim">
          Portrait 1080×1920 card for Stories, Reels, and TikTok. Right-click the
          image (or open its URL directly) to save it.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Portrait — 1080×1920</p>
            <div className="relative aspect-[9/16] w-full max-w-[420px] overflow-hidden border border-edge">
              {/* The generated opengraph-image for this segment */}
              <Image
                src="/story/opengraph-image"
                alt="Portrait share card"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <a
              href="/story/opengraph-image"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex font-mono text-[11px] uppercase tracking-[0.14em] text-foreground link-underline"
            >
              Open full size ↗
            </a>
          </div>

          <div>
            <p className="eyebrow mb-3">Link preview — 1200×630</p>
            <div className="relative aspect-[1200/630] w-full max-w-[520px] overflow-hidden border border-edge">
              <Image
                src="/opengraph-image"
                alt="Link preview card"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <a
              href="/opengraph-image"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex font-mono text-[11px] uppercase tracking-[0.14em] text-foreground link-underline"
            >
              Open full size ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
