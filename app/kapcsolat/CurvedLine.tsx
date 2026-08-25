"use client";

import { motion, Variants } from "framer-motion";

export default function CurvedLines({ className = "" }) {
  const pathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut", delay: i * 0.3 },
        opacity: { duration: 0.5, delay: i * 0.3 },
      },
    }),
  };

  return (
    <svg
      viewBox="0 0 1000 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto stroke-green/5 absolute ${className} z-[-0]`}
    >
      {/* Felső vonal */}
      <motion.path
        d="M 0 440 C 320 440, 520 20, 920 0 L 1000 5"
        strokeWidth="3"
        strokeLinecap="round"
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={pathVariants}
      />

      {/* Alsó vonal */}
      <motion.path
        d="M 0 450 C 500 450, 560 180, 1000 150"
        strokeWidth="3"
        strokeLinecap="round"
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={pathVariants}
      />
    </svg>
  );
}
