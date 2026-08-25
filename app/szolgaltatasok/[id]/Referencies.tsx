"use client";

import refArray from "../../../lib/referencies/refs";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

interface CardProps {
  item: {
    title: string;
    desktopPhotoSrc: string;
  };
  idx: number;
  total: number;
  progress: MotionValue<number>;
}

function Card({ item, idx, total, progress }: CardProps) {
  const start = idx / total;

  const targetScale = 1 - (total - idx - 1) * 0.2;

  const scaleing = useTransform(progress, [start, 1], [1, targetScale]);

  const translateZ = useTransform(
    progress,
    [start, 1],
    [0, -150 * (total - idx - 1)],
  );

  const filter = useTransform(
    progress,
    [start, 1],
    ["brightness(100%)", `brightness(${100 - (total - idx - 1) * 10}%)`],
  );

  return (
    <div className="sticky top-[120px] md:top-0 flex gap-[25px] md:h-screen w-full items-center justify-center overflow-hidden my-[25px]">
      <motion.div
        style={{
          scale: scaleing,
          z: translateZ,
          filter,
          zIndex: idx + 1,

          top: `0px`,
        }}
        className="relative h-[450px] md:h-[80vh] min-h-[350px] w-[90%] overflow-hidden rounded-2xl shadow-2xl origin-top transition-shadow duration-300 bg-black"
      >
        <div className="flex">
          <Image
            alt={item.title}
            fill
            src={item.desktopPhotoSrc}
            className="absolute inset-0 object-contain md:object-cover ratio-video"
            priority={idx === 0}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        </div>

        <div className="absolute bottom-8 left-[15px] z-10 text-white bg-dark-green rounded-md p-[10px]">
          <h3 className="text-2xl font-bold md:text-4xl">{item.title}</h3>
        </div>
      </motion.div>
    </div>
  );
}

export default function Referencies() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative flex w-full flex-col bg-dark-color md:min-h-[300vh] py-[50px] [perspective:1000px]"
    >
      <h2 className="text-white text-3xl mx-auto w-[90%] text-center">
        Néhány korábbi fejlesztésem
      </h2>
      {refArray.slice(0, 3).map((item, idx, slicedArray) => (
        <Card
          key={item.title}
          item={item}
          idx={idx}
          total={slicedArray.length}
          progress={scrollYProgress}
        />
      ))}
    </section>
  );
}
