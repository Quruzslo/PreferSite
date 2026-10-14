"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { SoundProvider } from "./sound";
import { TransitionProvider } from "./transition";

export default function Providers({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: !reduceMotion }}>
      <SoundProvider>
        <TransitionProvider>{children}</TransitionProvider>
      </SoundProvider>
    </ReactLenis>
  );
}
