"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import RevealText from "@/lib/ui/RevealText";
import ArrowButton from "@/lib/ui/ArrowButton";
import TechStack from "@/components/tech-stack/TechStack";

// referenciákból vett
const wins = [
  {
    id: 0,
    img: "/references/andocs.jpg",
    title: "Andocs Község",
    text: "Az átdolgozott weboldalon könnyen navigál a lakosság.",
    year: "2026",
  },
  {
    id: 1,
    img: "/references/syasolutions.jpg",
    title: "S.Y.A Solutions",
    text: "Az átadás utáni hónapban érkeztek az ügyfelek",
    year: "2026",
  },
  {
    id: 2,
    img: "/references/glambypanna.jpg",
    title: "Glam By Panna",
    text: "Az élesítés utáni 2 hétben már új ügyfeleket hozott",
    year: "2026",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const [activeWin, setActiveWin] = useState(wins[0]);

  const imageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

  return (
    <section
      data-theme="light"
      className="grain bg-paper pb-16 pt-28 site-gutter md:pt-32"
    >
      <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="order-2 flex flex-col gap-6 lg:order-1 lg:sticky lg:top-[100px] lg:col-span-4 lg:pt-3"
        >
          <p className="type-lead max-w-[26ch]">
            Megbízható, keresőoptimalizált weboldalak, konverzióra épített
            webshopok és cégre szabott CRM rendszerek igényes vállalkozásoknak.
          </p>
          <ArrowButton href="/kapcsolat" variant="green">
            Ingyenes konzultáció
          </ArrowButton>
        </motion.div>

        <div className="order-1 lg:order-2 lg:col-span-8">
          <RevealText
            as="h1"
            text="Weboldal, webshop és CRM készítés Kaposváron"
            className="type-display w-full "
            delay={0.1}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="order-3 self-end text-[0.95rem] lg:col-span-4"
        >
          (Weboldal készítő Kaposváron, Győrben, Budapesten és online az egész
          országban)
        </motion.p>

        <motion.div
          ref={imageRef}
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.2, delay: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="relative order-4 min-h-[450px] overflow-hidden rounded-[4px] bg-ink sm:aspect-[16/10] lg:col-span-8 "
        >
          <motion.div
            style={reduceMotion ? undefined : { scale: imageScale }}
            className="absolute inset-0"
          >
            <Image
              src={activeWin.img}
              alt={activeWin.text}
              fill
              priority
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-contain object-center "
            />
          </motion.div>

          <div className="absolute left-3 top-3 flex flex-col gap-2 sm:left-5 sm:top-5">
            {wins.map((win, i) => (
              <motion.div
                key={win.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setActiveWin(win)}
                transition={{ duration: 0.7, delay: 1.4 + i * 0.15, ease }}
                className={`flex w-[min(19rem,calc(100vw-4rem))] gap-3 rounded-[4px] p-2 backdrop-blur-md ${
                  i === activeWin.id
                    ? "bg-ink/80 text-paper"
                    : "bg-paper/90 text-ink"
                }`}
              >
                <div className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-[3px]">
                  <Image
                    src={win.img}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col justify-between gap-1 py-0.5">
                  <p className="text-[0.85rem] font-medium leading-tight">
                    {win.text}
                  </p>
                  <p className="font-mono text-[0.7rem] opacity-60">
                    {win.title}, {win.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <TechStack />
    </section>
  );
}
