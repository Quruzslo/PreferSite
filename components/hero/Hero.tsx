"use client";
import AtomIcon from "@/public/icons/HeroAtomIcon";
import { motion, Variants } from "framer-motion";
// import Section from "@/lib/section";
// import Referencies from "../../lib/referencies/referencies";
// import Herobg from "@/public/herobg.svg";
import Image from "next/image";
import RefMockup from "@/public/references/ref-mockup-nobg.png";

export default function Hero() {
  const h1Items = [
    {
      name: "Webapplikáció",
      link: "/szolgaltatasok/webapplikacio",
    },
    {
      name: "Webshop",
      link: "/szolgaltatasok/webshop",
    },
    {
      name: "CRM",
      link: "/szolgaltatasok/crm",
    },
    {
      name: "Weboldal",
      link: "/szolgaltatasok/weboldal",
    },
    {
      name: "Karbantartás",
      link: "/szolgaltatasok/karbantartas",
    },
  ];

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
    <section className="w-full flex-col flex rounded-b-[50px] relative overflow-hidden zoldhatteres bg-dark-color shadow-2xl">
      <div className="w-[90%] max-w-[2560px] mx-auto flex-col flex md:flex-row  pt-[120px] pb-[35px] md:!min-h-[calc(100vh_-_50px)] min-h-[450px] items-center justify-center gap-[25px] max-h-[1400px] ">
        <div className="hero-bal w-full md:w-[50%] p-[10px] h-full flex-col flex justify-between gap-[20px] ">
          <div className="flex flex-row gap-[10px] rounded-md bg-dark-green text-white w-fit p-[5px] items-center ">
            <AtomIcon />
            <p>Egyedi fejlesztésű termékek</p>
          </div>

          {/* Animált H1 szülő konténer */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-black text-[20px] md:!text-[45px]  flex !flex-col gap-[10px]"
          >
            {h1Items.map((item, idx) => (
              <motion.a
                key={idx}
                variants={itemVariants}
                href={item.link}
                className="h1-elem origin-top-left inline-block relative text-white"
              >
                {item.name}
                <span className="arrow-left"></span>
                <span className="arrow-right"></span>
              </motion.a>
            ))}
          </motion.h1>

          <p className="text-[15px] md:!text-[20px] text-white">
            Színvonalas, egyedi igényekre optimalizált digitális eszközök
            fejlesztése, haladó gondolkodású vállalkozók számára.
          </p>
        </div>

        <div className="hero-jobb relative w-full h-[300px] md:h-full md:min-h-[400px] md:w-[50%] flex items-center justify-center">
          <Image
            src={RefMockup}
            fill
            alt="Weboldal készítés, webshop és webapplikáció fejlesztés, crm rendszer fejlesztés"
            className="object-contain w-full"
          />
        </div>
      </div>
    </section>
  );
}
