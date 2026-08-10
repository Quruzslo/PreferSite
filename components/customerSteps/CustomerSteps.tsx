"use client";
import Section from "@/lib/section";
import customerSteps from "./customerStepsData";
import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { CiBookmarkCheck } from "react-icons/ci";

export default function CustomerStepsComp() {
  const sentryWrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sentryWrapperRef,
    offset: ["start center", "end center"],
  });

  const heightProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.95, 0, 0.35, 1],
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.95, 0, 0.35, 1],
      },
    },
  };

  // 1. Kisebbik szár animációja
  const shortLineVariants: Variants = {
    hidden: { clipPath: "inset(0% 100% 0% 0%)" },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.15,
        ease: "linear",
        delay: 0.4,
      },
    },
  };

  // 2. Hosszabbik szár animációja
  const longLineVariants: Variants = {
    hidden: { clipPath: "inset(0% 100% 0% 0%)" },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.25,
        ease: "easeOut",
        delay: 0.55,
      },
    },
  };

  return (
    <Section className="flex flex-col gap-[25px] my-[50px]">
      {/* A szülő */}
      <div
        ref={sentryWrapperRef}
        className="flex flex-col gap-[20px] justify-between relative py-10"
      >
        {/* Háttér vonal */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[4px] h-full hidden md:block">
          <motion.div
            className="w-full bg-green origin-top rounded-full"
            style={{ height: heightProgress }}
          />
        </div>

        {/* Tartalom elemek */}
        {customerSteps.map((step, index) => (
          <motion.div
            key={step.title}
            variants={containerVariants}
            viewport={{ margin: "0px 0px -50% 0px", once: false }}
            initial="hidden"
            whileInView="visible"
            className="flex flex-col p-[0px] rounded-md gap-[15px] w-full md:w-[50%] even:mr-auto even:pr-[50px] odd:ml-auto odd:pl-[50px] relative z-10"
          >
            {/* Fehér ikon kör háttere */}
            <motion.div
              variants={iconVariants}
              className={`absolute top-[50%] translate-y-[-50%] flex items-center justify-center p-[5px] bg-white z-20 w-fit rounded-full ${
                index % 2 === 0 ? "right-[-20px]" : "left-[-20px]"
              }`}
            >
              <div className="relative w-[30px] h-[30px]">
                {/* Rövid szár  */}
                <motion.div
                  variants={shortLineVariants}
                  className="absolute h-[4px] w-[12px] bg-green rotate-[45deg] left-[4px] top-[16px] rounded-full"
                />

                {/* Hosszú szár  */}
                <motion.div
                  variants={longLineVariants}
                  className="absolute h-[4px] w-[22px] bg-green rotate-[-50deg] left-[10px] top-[12px] rounded-full"
                />
              </div>
            </motion.div>

            <motion.h3 variants={itemVariants} className="text-xl font-bold">
              {step.title}
            </motion.h3>
            <motion.p variants={itemVariants} className="text-gray-400">
              {step.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
