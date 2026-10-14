import Link from "next/link";
import Logo from "@/components/logo";
import { OrbitRings } from "@/components/decor";

export const metadata = {
  title: "404 — Page not found",
};

export default function NotFound() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-background px-6">
      {/* Decorative orbit rings */}
      <OrbitRings
        size={600}
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-60 sm:block"
      />
      <OrbitRings
        size={340}
        className="pointer-events-none absolute -right-24 -top-24 opacity-40"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-foreground">
          <Logo size={52} label="Muhd Hafizuddin" />
        </span>

        <p className="eyebrow mt-8">Error 404</p>

        <h1 className="display-lg mt-3 text-foreground">
          Page not
          <br />
          <span className="italic text-ink-dim">found.</span>
        </h1>

        <p className="mt-5 max-w-[38ch] text-pretty text-[15px] leading-relaxed text-ink-dim">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s
          get you back on track.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-foreground px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-background"
          >
            <span className="relative z-10">Back home</span>
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-300 ease-out group-hover:translate-y-0"
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-accent-foreground">
              ←
            </span>
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground ring-ink transition-colors hover:bg-foreground hover:text-background"
          >
            View work
          </Link>
        </div>
      </div>
    </main>
  );
}
