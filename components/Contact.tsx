"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { fadeUp, clipReveal } from "@/lib/animations";

const links = [
  {
    label: "EMAIL",
    href: "mailto:hafizu2302@gmail.com",
  },
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/in/hafizuddin-hamid",
  },
  {
    label: "GITHUB",
    href: "https://github.com/hafizu-js",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true });

  return (
    <section id="contact" className="section-dark py-14 bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div ref={sectionRef}>
          {/* Two-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left column */}
            <div>
              <motion.h2
                variants={clipReveal}
                initial="hidden"
                animate={sectionInView ? "visible" : "hidden"}
                className="font-serif font-black tracking-[-0.03em] leading-[1.05] text-foreground"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
              >
                Let&apos;s build
                <br />
                something.
              </motion.h2>
              <p className="font-sans text-[15px] text-muted-foreground mt-3 leading-[1.65]">
                Open to full-time roles, internships, and interesting projects.
                Based in Johor, Malaysia.
              </p>
            </div>

            {/* Right column — link rows */}
            <div className="flex flex-col gap-2.5">
              {links.map(({ label, href }, index) => (
                <motion.div
                  key={label}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  animate={sectionInView ? "visible" : "hidden"}
                >
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between border border-border rounded-[4px] px-3.5 py-2.5 hover:border-foreground transition-colors group cursor-pointer"
                  >
                    <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-foreground">
                      {label}
                    </span>
                    <span className="font-mono text-[15px] text-muted-foreground group-hover:text-foreground transition-colors">
                      ↗
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-5 border-t border-border flex justify-between items-center">
            <span className="font-mono text-[12px] text-muted-foreground">
              © 2026 Hafizuddin Hamid
            </span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono text-[12px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
