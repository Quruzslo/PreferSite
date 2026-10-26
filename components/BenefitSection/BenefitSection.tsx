"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import RevealText from "@/lib/ui/RevealText";
import { benefits } from "./benefits";

type Benefit = (typeof benefits)[number];

function BenefitCard({
  benefit,
  index,
  total,
  progress,
}: {
  benefit: Benefit;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  // A már lefedett kártyák kicsit összemennek, így látszik a pakli mélysége.
  const scale = useTransform(
    progress,
    [index / total, 1],
    [1, 1 - (total - index) * 0.025],
  );

  return (
    <div className="sticky" style={{ top: `calc(5.5rem + ${index * 1.1}rem)` }}>
      <motion.article
        style={reduceMotion ? undefined : { scale, transformOrigin: "top" }}
        className="grid min-h-[24rem] gap-8 rounded-[6px] shadow-[5px_5px_10px_0px_rgba(0,0,0,0.4)]  bg-ink-card bg-[url(/herobg.svg)] bg-contain bg-center p-5 md:min-h-[26rem] md:grid-cols-12 md:p-10"
      >
        <div className="flex flex-col justify-between gap-6 md:col-span-7">
          <span className="w-fit rounded-[3px] bg-green/70 px-2 py-1 text-white text-[0.8rem]">
            {benefit.badge}
          </span>
          <h3 className="type-h2">{benefit.title}</h3>
        </div>
        <p className="self-end text-stone-light md:col-span-5 md:max-w-[46ch]">
          {benefit.description}
        </p>
      </motion.article>
    </div>
  );
}

export default function BenefitSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="elonyok"
      data-theme="dark"
      className="bg-ink pb-16 pt-24 text-paper site-gutter md:pt-36"
    >
      <div className="mb-14 grid gap-8 lg:grid-cols-12">
        <RevealText
          as="h2"
          inView
          text="Megbízható és átgondolt rendszerek"
          className="type-h2 lg:col-span-7"
        />
        <p className="type-lead self-end text-stone-light lg:col-span-4 lg:col-start-9">
          Egyedi weboldal, ami növeli a vállalkozásod hitelességét, jobban
          konvertál, és folyamatosan hozza a megrendeléseket. Nem AI-sablon,
          amit a konkurenciád is használ.
        </p>
      </div>

      <div ref={listRef} className="flex flex-col gap-4">
        {benefits.map((benefit, i) => (
          <BenefitCard
            key={benefit.id}
            benefit={benefit}
            index={i}
            total={benefits.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
