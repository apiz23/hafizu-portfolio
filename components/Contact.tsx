"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
import SectionHeader from "@/components/section-header";

const links = [
  { label: "Email", value: "piz230601@gmail.com", href: "mailto:piz230601@gmail.com", preview: false },
  { label: "LinkedIn", value: "in/muh-hafizuddin", href: "https://www.linkedin.com/in/muh-hafizuddin", preview: true },
  { label: "GitHub", value: "apiz23", href: "https://github.com/apiz23", preview: true },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });

  return (
    <section id="contact" className="section-alt relative border-t border-edge-strong/15 pt-24 sm:pt-28">
      <div ref={sectionRef} className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <SectionHeader index="05" label="Contact" variant="bare" />

        {/* Headline block */}
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="display-lg text-foreground"
            >
              Let&apos;s build
              <br />
              <span className="italic text-ink-dim">something good.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-ink-dim"
            >
              Open to full-time roles, internships, and interesting projects. Based in
              Johor, Malaysia. The fastest way to reach me is email.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-8"
            >
              <Link
                href="mailto:piz230601@gmail.com"
                className="group relative inline-flex items-center gap-3 overflow-hidden bg-accent px-7 py-4 font-mono text-[12px] uppercase tracking-[0.16em] text-accent-foreground"
              >
                <span className="relative z-10">Start a conversation</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-foreground transition-transform duration-300 ease-out group-hover:translate-x-0"
                />
                <span className="relative z-10 transition-colors duration-300 group-hover:text-background">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Contact links */}
          <div className="flex flex-col">
            {links.map(({ label, value, href, preview }, index) => {
              const rowClassName =
                "group flex items-center justify-between border-b border-edge-strong/10 py-5 transition-colors hover:border-accent cursor-pointer";
              const rowContent = (
                <>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim">
                    {label}
                  </span>
                  <span className="flex items-center gap-2 font-display text-lg text-foreground link-underline">
                    {value}
                    <span className="text-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent">
                      ↗
                    </span>
                  </span>
                </>
              );

              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.07, duration: 0.45 }}
                >
                  {preview ? (
                    <LinkPreview url={href} className={rowClassName}>
                      {rowContent}
                    </LinkPreview>
                  ) : (
                    <Link href={href} className={rowClassName}>
                      {rowContent}
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-start justify-between gap-3 border-t border-edge-strong/20 py-7 sm:flex-row sm:items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
            © 2026 Muhd Hafizuddin
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim">
            Built with Next.js — designed &amp; coded by hand
          </span>
        </footer>
      </div>
    </section>
  );
}
