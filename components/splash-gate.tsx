"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LogoSplash from "@/components/logoSplash";

const STORAGE_KEY = "hf-splash-done";

/**
 * Session-gated splash overlay. Mounts above the page, plays once per
 * browser session, then unmounts on completion. It never delays first
 * contentful paint — the page renders underneath and the splash sits on top.
 */
export default function SplashGate() {
  // Start hidden so the server and first client render match (no hydration
  // mismatch); reveal only after we've read sessionStorage on the client.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // sessionStorage unavailable (private mode, blocked) — skip the splash.
    }
  }, []);

  // Prevent the page behind the splash from scrolling while it plays.
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  const finish = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
        >
          <LogoSplash onDone={finish} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
