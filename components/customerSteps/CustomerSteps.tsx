"use client";
import Section from "@/lib/section";
import customerSteps from "./customerStepsData";
import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import AnimateSvgPaths from "./AnimateSvgPaths";

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

  const underLineVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: "easeOut",
        delay: 0.55,
      },
    },
  };

  return (
    <Section className="flex flex-col gap-[25px] my-[50px]">
      <h2 className="mt-2 text-3xl text-center font-bold text-dark-color md:text-5xl lg:text-6xl">
        Így készül el a rendszered
      </h2>

      <div
        ref={sentryWrapperRef}
        className="flex flex-col gap-[20px] justify-between relative py-10"
      >
        {/* Háttér vonal */}
        <div className="absolute left-[2px] md:left-1/2 md:-translate-x-1/2 top-0 w-[4px] h-full block">
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
            className="flex flex-col p-[0px] my-[25px] rounded-md gap-[15px] w-full md:w-[50%] pl-[30px] pr-[0px] md:even:mr-auto md:even:pr-[50px] md:odd:ml-auto md:odd:pl-[50px] relative z-10"
          >
            {/* Fehér ikon kör háttere */}
            <motion.div
              variants={iconVariants}
              className={`absolute top-[50%] translate-y-[-50%] flex items-center justify-center p-[5px] bg-white z-20 w-fit rounded-full left-[-20px] ${
                index % 2 === 0
                  ? "md:left-auto md:right-[-20px]"
                  : "md:right-auto md:left-[-20px]"
              }`}
            >
              <div className="relative w-[30px] h-[30px]">
                <motion.div
                  variants={shortLineVariants}
                  className="absolute h-[4px] w-[12px] bg-green rotate-[45deg] left-[4px] top-[16px] rounded-full"
                />
                <motion.div
                  variants={longLineVariants}
                  className="absolute h-[4px] w-[22px] bg-green rotate-[-50deg] left-[10px] top-[12px] rounded-full"
                />
              </div>
            </motion.div>

            <motion.h3
              variants={itemVariants}
              className="text-[20px] md:!text-[25px] xl:!text-[35px] font-black text-dark-color"
            >
              {step.title}
            </motion.h3>

            {/* Háromszög SVG elem háttér pozícionáló dobozban ---- */}
            <div
              className={`absolute top-0 h-full w-[100px] md:w-[250px] z-[-1] opacity-50 pointer-events-none ${
                index % 2 === 0 ? "left-0" : "right-0"
              }`}
            >
              <AnimateSvgPaths
                className={`w-full h-full object-contain ${
                  index % 2 === 0 ? "rotate-90" : "rotate-[-90deg]"
                }`}
              />
            </div>

            {/* Animált, díszítő csík---- */}
            <motion.div
              variants={underLineVariants}
              className="flex bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(0,0,0,1)_50%,rgba(255,255,255,0)_100%)] h-[2px] w-[90%] rounded-full origin-center"
            />

            <motion.p
              variants={itemVariants}
              className="text-[15px] font-black md:text-[20px] text-dark-color"
            >
              {step.description}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
