"use client";
import Kepem from "@/public/cv-kep-github.jpg";
import Image from "next/image";
import AnimateSvgPaths from "../customerSteps/AnimateSvgPaths";
import { motion, Variants } from "framer-motion";

import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { linearGradient } from "motion/react-client";

export default function ContactSection() {
  const contactPrios = [
    "Minőségi megjelenés",
    " Céges imázs növelés",
    "Hatékony munkaeszközök",
    " Stabil partneri viszony",
    "Kiszámítható működés",
  ];

  const wrapperVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const containerVariant: Variants = {
    hidden: {
      clipPath: "inset(0% 100% 0% 0%)",
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.5,
        ease: [0.95, 0, 0.35, 1],
        delay: 0.4,
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
        delay: 0.2,
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
        delay: 0.4,
      },
    },
  };

  return (
    <section className="w-[90%] max-w-[2560px] mx-auto my-[50px] flex flex-col md:flex-row gap-[25px] bg-dark-color p-[10px] rounded-md  text-white font-bold ">
      {/* Bal oldali infók --------- */}
      <div className="flex flex-col w-full md:w-1/2 gap-[20px] ">
        <div className=" p-[10px] rounded-md w-fit">
          <h2 className="!text-[20px]">
            Növeld vállalkozásod hatásfokát egyedi fejlesztésű webes
            megoldásaimmal
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-[15px] w-full">
          <div className="w-full md:w-[250px] flex flex-col overflow-hidden rounded-md">
            <Image
              alt="Egyedi weboldal fejlesztés, webshop fejlesztés, crm rendszer feljesztés"
              src={Kepem}
              className="w-full h-[350px] md:h-[250px] object-cover rounded-md"
            ></Image>
            <div className="flex-row flex gap-[10px] my-[20px] items-center justify-center">
              <div className="flex flex-row gap-3 items-center">
                <a
                  href="mailto:sziligalaron@gmail.com"
                  className="rounded-full bg-white p-[5px]"
                >
                  <HiOutlineMail size={25} className="text-dark-color" />
                </a>
                <a
                  href="tel:+36203127968"
                  className="rounded-full bg-white p-[5px]"
                >
                  <FiPhoneCall size={25} className="text-dark-color" />
                </a>
              </div>
              <div className="flex flex-col md:border-l-2 md:border-white pl-[10px] !text-neutral-200 ">
                <p className="">Szili Gál Áron</p>
                <p>FullStack fejlesztő</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[15px] p-[10px] rounded-md w-full md:w-fit">
            {contactPrios.map((prio, _) => (
              <div key={prio} className="relative flex items-center w-full">
                <motion.div
                  initial="hidden"
                  variants={wrapperVariants}
                  whileInView="visible"
                  viewport={{ margin: "0px 0px 0% 0px", once: false }}
                  className="relative flex items-center"
                >
                  {/* Ikon konténer */}
                  <motion.div
                    variants={iconVariants}
                    className="flex items-center justify-center p-[5px] z-20 w-fit rounded-full"
                  >
                    <motion.div className="relative w-[30px] h-[30px]">
                      <motion.div
                        variants={shortLineVariants}
                        className="absolute h-[4px] w-[12px] bg-green rotate-[45deg] left-[4px] top-[16px] rounded-full"
                      />
                      <motion.div
                        variants={longLineVariants}
                        className="absolute h-[4px] w-[22px] bg-green rotate-[-50deg] left-[10px] top-[12px] rounded-full"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Balról jobbra kitöltő zöld háttér */}
                  <motion.div
                    variants={containerVariant}
                    className="bg-green rounded-md p-[10px] w-full md:w-fit"
                  >
                    <p className="text-white">{prio}</p>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jobb oldali form wrapper --------- */}
      <div className="flex flex-col w-full md:w-1/2"></div>
    </section>
  );
}
