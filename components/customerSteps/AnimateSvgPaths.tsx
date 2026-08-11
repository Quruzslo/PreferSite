"use client";
import { motion, Variants } from "framer-motion";

interface AnimateSvgPathsProps {
  className?: string;
}

export default function AnimateSvgPaths({ className }: AnimateSvgPathsProps) {
  const path1Variants: Variants = {
    hidden: { y: 65, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.95, 0, 0.35, 1],
      },
    },
  };

  const path2Variants: Variants = {
    hidden: { y: 65, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.95, 0, 0.35, 1],
        delay: 0.5,
      },
    },
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 471 503"
      className={className}
    >
      <motion.path
        className="triangle"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M109.949 0.694641L164.811 70.4287L219.663 140.163H109.949H0.235672L55.0873 70.4287L109.949 0.694641Z"
        fill="#b0ffd2"
        variants={path1Variants}
      />
      <motion.path
        className="morph"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M266.147 82.8792L470.399 338.853L470.399 502.561L201.949 166.125L130.049 259.355L-6.10352e-05 259.355L135.816 83.2455L200.024 0L266.147 82.8792Z"
        fill="#52be80"
        variants={path2Variants}
      />
    </svg>
  );
}
