"use client";

import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TransitionLink } from "@/lib/site/transition";

const subscribe = () => () => {};

export default function CookieBanner() {
  // A szerveren elfogadottnak tekintjük, így a sáv csak a böngészőben jelenik meg.
  const hasConsent = useSyncExternalStore(
    subscribe,
    () => document.cookie.includes("cookie-consent=true"),
    () => true,
  );
  const [dismissed, setDismissed] = useState(false);
  const isVisible = !hasConsent && !dismissed;

  const handleAccept = () => {
    document.cookie =
      "cookie-consent=true; max-age=31536000; path=/; SameSite=Lax";
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="region"
          aria-label="Süti tájékoztató"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 1.2 } }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-3 rounded-[4px] bg-ink p-4 text-paper sm:right-auto sm:max-w-sm"
        >
          <p className="text-[0.95rem]">
            Az oldal csak a működéshez szükséges sütiket használ.{" "}
            <TransitionLink
              href="/adatkezeles"
              className="underline underline-offset-4 hover:text-green"
            >
              Részletek
            </TransitionLink>
          </p>
          <button
            onClick={handleAccept}
            className="w-fit rounded-[4px] bg-green px-4 py-1.5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-[#66c98f]"
          >
            Rendben
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
