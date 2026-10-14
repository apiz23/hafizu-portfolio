"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Admin pages opt out of smooth scroll — forms behave better natively. */
function isAdminPath(pathname: string | null) {
  return !!pathname && pathname.startsWith("/projects/");
}

export default function SmoothScroll() {
  const pathname = usePathname();
  const disabled = isAdminPath(pathname);

  useEffect(() => {
    if (disabled) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [disabled]);

  return null;
}
