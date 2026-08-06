"use client";
import AtomIcon from "@/public/icons/HeroAtomIcon";
import { motion, Variants } from "framer-motion";
import Section from "@/lib/section";
import Referencies from "./referencies/referencies";

export default function Hero() {
  const h1Items = ["Webapplikáció", "Webshop", "CRM", "Weboldal"];

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 35,
      filter: "blur(20px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <Section className="flex-col md:flex-row flex pt-[120px] pb-[35px] md:min-h-[100vh] min-h-[450px] items-center justify-center gap-[25px] md:max-h-[1200px]">
      <div className="hero-bal w-full md:w-[50%] p-[10px] h-full flex-col flex justify-between gap-[20px]">
        <div className="flex flex-row gap-[10px] rounded-md bg-black/50 text-white w-fit p-[5px] items-center ">
          <AtomIcon />
          <p>Egyedi fejlesztés</p>
        </div>

        {/* Animált H1 szülő konténer */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-black text-[20px] md:text-[35px] xl:!text-[75px] flex !flex-col gap-[10px]"
        >
          {h1Items.map((item, idx) => (
            <motion.span
              key={idx}
              variants={itemVariants}
              className="h1-elem origin-top-left inline-block relative"
            >
              {item}
              <span className="arrow-left"></span>
              <span className="arrow-right"></span>
            </motion.span>
          ))}
        </motion.h1>

        <p className="text-[15px] md:text-[20px]">
          Vállalkozásod igényeire optimalizált digitális eszközök fejlesztése.
        </p>
      </div>

      <div className="hero-jobb w-full md:w-[50%] ">
        <Referencies></Referencies>
      </div>
    </Section>
  );
}
