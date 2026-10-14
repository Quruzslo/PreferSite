"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import customerSteps from "./customerStepsData";
import RevealText from "@/lib/ui/RevealText";

const pad = (n: number) => String(n).padStart(2, "0");

export default function CustomerStepsComp() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="folyamat"
      data-theme="dark"
      className="bg-ink py-24 text-paper site-gutter md:py-36"
    >
      <RevealText
        as="h2"
        inView
        text="Így készül el a rendszered"
        className="type-h2 mb-16 max-w-[14ch] md:mb-24"
      />

      <div className="grid gap-x-8 lg:grid-cols-12">
        <div className="sticky top-18 lg:relative col-span-5 lg:block">
          <div className="sticky top-28 flex items-start gap-3">
            <div className="type-display relative px-[2px] h-[0.9em] overflow-hidden tabular-nums">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                  {pad(active + 1)}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="pt-2 font-mono text-sm text-stone-light">
              / {pad(customerSteps.length)}
            </span>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {customerSteps.map((step, i) => (
            <motion.li
              key={step.id}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: "-40% 0px -55% 0px" }}
              className={`grid gap-4  py-10 transition-opacity duration-500 md:grid-cols-[4rem_1fr] md:py-14 ${
                i === active ? "lg:opacity-100" : "lg:opacity-25"
              }`}
            >
              <span
                className={`size-3 rounded-full font-mono text-sm text-stone-light ${i === active ? "bg-green" : "bg-transparent"} `}
              ></span>
              <div className="flex flex-col gap-4">
                <h3 className="type-h3">{step.title}</h3>
                <p className="max-w-[56ch] text-stone-light">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
