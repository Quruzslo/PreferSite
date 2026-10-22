"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TransitionLink } from "@/lib/site/transition";
import {
  getConsent,
  setConsent,
  subscribeConsent,
  type Consent,
} from "./consent";

export default function CookieBanner() {
  // A szerveren döntöttnek tekintjük, így a sáv csak a böngészőben jelenik meg.
  const consent = useSyncExternalStore<Consent>(
    subscribeConsent,
    getConsent,
    () => "rejected",
  );
  const isVisible = consent === null;

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
            A működéshez szükséges sütiken túl, a hozzájárulásoddal, a
            látogatottság méréséhez Google Analytics sütiket is használok.{" "}
            <TransitionLink
              href="/adatkezeles"
              className="underline underline-offset-4 hover:text-green"
            >
              Részletek
            </TransitionLink>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setConsent("accepted")}
              className="rounded-[4px] bg-green px-4 py-1.5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-[#66c98f]"
            >
              Elfogadom
            </button>
            <button
              onClick={() => setConsent("rejected")}
              className="rounded-[4px] border border-paper/40 px-4 py-1.5 text-[0.95rem] font-medium transition-colors hover:border-paper"
            >
              Elutasítom
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
