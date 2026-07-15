"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

const navLinks = [
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["home", "skills", "education", "experience", "projects", "contact"];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(href.replace("#", "")), 300);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <nav
        className={`pointer-events-auto flex items-center gap-5 bg-foreground rounded-full px-4 py-2 transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-black/20" : ""
        }`}
        aria-label="Site navigation"
      >
        {/* Monogram */}
        <Link
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToId("home"); }}
          className="font-mono font-bold text-[13px] tracking-[0.14em] text-white pr-4 border-r border-white/20 hover:text-white/80 transition-colors"
          aria-label="Back to top"
        >
          HF.
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-5">
          {navLinks.map(({ label, href }) => {
            const id = href.replace("#", "");
            const isActive = active === id;
            return (
              <Link
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); scrollToId(id); }}
                className={`text-[12px] font-mono uppercase tracking-widest transition-colors relative ${
                  isActive ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-[hsl(var(--redline))]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile drawer */}
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <button
              type="button"
              className="sm:hidden text-white/60 hover:text-white transition-colors pl-1"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </DrawerTrigger>

          <DrawerContent className="section-dark bg-background border-none [&>div:first-child]:bg-white/10">
            <nav
              className="flex flex-col items-center pt-4 pb-8 gap-0"
              aria-label="Mobile navigation"
            >
              {navLinks.map(({ label, href }) => (
                <DrawerClose asChild key={href}>
                  <button
                    type="button"
                    onClick={() => handleLink(href)}
                    className="w-full text-center font-serif font-black uppercase text-foreground hover:text-muted-foreground transition-colors tracking-[-0.02em] py-3.5"
                    style={{ fontSize: "clamp(1.8rem, 8vw, 2.5rem)" }}
                  >
                    {label}
                  </button>
                </DrawerClose>
              ))}
            </nav>
            <p className="text-center font-mono text-[11px] tracking-[0.14em] text-muted-foreground pb-6">
              HF.
            </p>
          </DrawerContent>
        </Drawer>
      </nav>
    </motion.header>
  );
}
