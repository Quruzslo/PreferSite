"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { IconType } from "react-icons";

interface CounterProps {
  title: string;
  targetNumber: number;
  icon?: IconType;
  durationMs?: number;
  classList?: string;
}

export default function Counter({
  title,
  targetNumber,
  icon: Icon,
  durationMs = 100,
  classList = "",
}: CounterProps) {
  const [count, setCount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || count >= targetNumber) return;

    const timer = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [count, targetNumber, durationMs, isInView]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center ${classList}`}
    >
      {Icon && (
        <Icon className="text-[25px] md:text-[35px] text-amber-300 mb-2" />
      )}

      <div className="relative flex h-12 w-24 items-center justify-center overflow-hidden bg-green font-bold text-[30px] md:text-[40px] [clip-path:polygon(90%_0,_100%_50%,_91%_100%,_0%_100%,_10%_50%,_0%_0%)] ">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ y: -55, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 55, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 65 }}
            className="absolute"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </div>

      <p className="mt-1 text-[20px] text-gray-300 px-[10px]">{title}</p>
    </div>
  );
}
