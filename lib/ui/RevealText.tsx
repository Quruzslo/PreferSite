"use client";

import { motion, useReducedMotion, Variants } from "motion/react";

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  // true: görgetésre indul, false: betöltéskor
  inView?: boolean;
}

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

// Szavanként alulról beúszó szöveg. Minden szó egy saját maszkban mozog.
export default function RevealText({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.05,
  inView = false,
}: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];

  if (reduceMotion) return <Tag className={className}>{text}</Tag>;

  const words = text.split(" ");
  const trigger = inView
    ? { whileInView: "show", viewport: { once: false, amount: 0.5 } }
    : { animate: "show" };

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      {...trigger}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span
            aria-hidden
            className="-mb-[0.12em] inline-block max-w-full overflow-hidden pb-[0.12em] align-top"
          >
            <motion.span className="inline-block" variants={word}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
