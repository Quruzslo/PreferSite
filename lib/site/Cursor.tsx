"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorState = "hidden" | "default" | "link";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

function subscribeToPointer(callback: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export default function Cursor() {
  // Csak egeres eszközön jelenik meg, érintőképernyőn marad a natív viselkedés.
  const enabled = useSyncExternalStore(
    subscribeToPointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
  const [state, setState] = useState<CursorState>("hidden");
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as Element;
      if (target.closest("input, textarea, select")) {
        setState("hidden");
        setLabel(null);
        return;
      }
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setState(
        labelled || target.closest("a, button, label, summary")
          ? "link"
          : "default",
      );
    };
    const onLeave = () => setState("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      root.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = state === "link" ? 44 : 22;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1100]"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden whitespace-nowrap rounded-full text-sm font-medium text-ink ${
          label
            ? "bg-green px-4"
            : state === "link"
              ? "border-[1.5px] border-green"
              : "bg-green"
        }`}
        animate={{
          width: label ? "auto" : size,
          height: label ? 38 : size,
          opacity: state === "hidden" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
