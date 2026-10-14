"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useActiveSection } from "@/lib/use-active-section";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import Logo from "@/components/logo";

const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = [
  { id: "home" },
  { id: "skills" },
  { id: "education" },
  { id: "experience" },
  { id: "projects" },
  { id: "contact" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md rule-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <nav className="flex items-center justify-between h-16" aria-label="Site navigation">
          <Link
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToId("home"); }}
            className="group flex items-center gap-2"
            aria-label="Back to top"
          >
            <span className="text-foreground transition-colors group-hover:text-hover">
              <Logo size={26} label={null} className="block" />
            </span>
            <span className="font-display text-xl leading-none text-foreground">
              Hafizuddin
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-7">
            {navLinks.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = active === id;
              return (
                <Link
                  key={href}
                  href={href}
                  data-active={isActive}
                  onClick={(e) => { e.preventDefault(); scrollToId(id); }}
                  className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim transition-colors hover:text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className={`h-1 w-1 rounded-full transition-all duration-300 ${
                      isActive ? "bg-accent scale-125" : "bg-foreground/20 group-hover:bg-foreground/50"
                    }`}
                  />
                  <span className={isActive ? "text-foreground link-underline" : "link-underline"}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="sm:hidden flex min-h-[44px] min-w-[44px] items-center justify-center text-foreground"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-6 bg-foreground" />
              <span className="block h-px w-6 bg-foreground" />
            </span>
          </button>
        </nav>
      </div>

      <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
        <DrawerContent className="rule-t border-none bg-background">
          <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
          <div className="px-6 pb-8 pt-4">
            <nav className="flex flex-col" aria-label="Mobile navigation">
              {navLinks.map(({ label, href }) => {
                const id = href.replace("#", "");
                const isActive = active === id;
                return (
                  <button
                    key={href}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      requestAnimationFrame(() => scrollToId(id));
                    }}
                    className={`flex items-center gap-3 rule-b py-4 text-left font-display text-3xl tracking-[-0.01em] transition-colors min-h-[44px] ${
                      isActive ? "text-foreground" : "text-ink-dim"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? "bg-accent" : "bg-foreground/20"
                      }`}
                    />
                    {label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 flex gap-6">
              <a
                href="https://github.com/apiz23"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim link-underline"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/muh-hafizuddin"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim link-underline"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </motion.header>
  );
}
