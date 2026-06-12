"use client";

import { ThemeProvider } from "./theme-provider";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "./smooth-scroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        {children}
      </MotionConfig>
    </ThemeProvider>
  );
}
