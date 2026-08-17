"use client";

import { useRef } from "react";

import Kepem from "@/public/cv-kep-github.jpg";
import Image from "next/image";
import AnimateSvgPaths from "../customerSteps/AnimateSvgPaths";
import { motion, Variants, useInView } from "framer-motion";
// Ikonok---------------
import { HiOutlineMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { linearGradient } from "motion/react-client";
import { SiCoffeescript, SiAnswer } from "react-icons/si";
import { BsCalendarCheckFill } from "react-icons/bs";

import ContactForm from "./ContacForm";

export default function ContactSection() {
  // 360 szöveg animáció-------
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  const pathLength = 943;
  const contactPrios = [
    "Minőségi termékek",
    "Céges imázs növelés",
    "Hatékony munkaeszközök",
    "Stabil partneri viszony",
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
        duration: 0.6,
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
        delay: 0.6,
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
        delay: 0.8,
      },
    },
  };

  return (
    <section
      id="kapcsolat"
      className="w-[90%] max-w-[2560px] mx-auto my-[150px] relative flex flex-col md:flex-row gap-[25px] justify-between p-[10px]  text-white font-bold "
    >
      <div className="bg-white text-dark-color border-2 border-dark-color absolute top-0 left-1/2 -translate-x-1/2  -translate-y-1/2 p-[10px] rounded-md w-fit">
        <h2 className="!text-[20px] font-black leading-tight ">Kapcsolat</h2>
      </div>

      {/* Bal oldali infók --------- */}
      <div className="flex flex-col w-full md:w-1/2  gap-[20px] mt-[35px] text-dark-color rounded-2xl bg-gray-100 shadow-[0px_2px_20px_-2px_rgba(0,0,0,0.3)] p-[15px] ">
        <div className="flex flex-col gap-[15px] w-full items-center justify-center">
          <p className="text-[20px] md:text-[35px] font-black">
            KERESS BIZALOMMAL
          </p>
          {/* Kép és elérhetőség ikonok ------- */}
          <div className="w-full md:w-[350px] flex flex-col items-center">
            <div
              ref={containerRef}
              className="relative w-[90%] max-w-[350px] aspect-square rounded-full flex items-center justify-center overflow-hidden mx-auto"
            >
              <svg
                className="absolute inset-0 w-full h-full origin-center"
                viewBox="0 0 350 350"
              >
                <defs>
                  <mask id="textDrawingMask">
                    <motion.path
                      d="M 175, 25 A 150, 150 0 1,1 175, 325 A 150, 150 0 1,1 175, 25"
                      fill="none"
                      stroke="white"
                      strokeWidth="50"
                      strokeLinecap="round"
                      initial={{
                        strokeDasharray: pathLength,
                        strokeDashoffset: pathLength,
                      }}
                      animate={isInView ? { strokeDashoffset: 0 } : {}}
                      transition={{
                        duration: 1,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                    />
                  </mask>

                  <path
                    id="circlePath"
                    d="M 175, 25 A 150, 150 0 1,1 175, 325 A 150, 150 0 1,1 175, 25"
                    fill="none"
                  />
                </defs>
                <motion.path
                  d="M 175, 25 A 150, 150 0 1,1 175, 325 A 150, 150 0 1,1 175, 25"
                  fill="none"
                  className="stroke-green/20"
                  strokeWidth="45"
                  strokeLinecap="round"
                  initial={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                  }}
                  animate={isInView ? { strokeDashoffset: 0 } : {}}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <text
                  className="text-dark-color text-[15px] md:text-[22px] font-bold uppercase tracking-[0.1em]"
                  fill="currentColor"
                  mask="url(#textDrawingMask)"
                >
                  <textPath
                    href="#circlePath"
                    textLength="880"
                    lengthAdjust="spacing"
                  >
                    Webfejlesztés
                  </textPath>
                </text>
              </svg>

              <Image
                alt="Egyedi weboldal fejlesztés, webshop fejlesztés, crm rendszer feljesztés"
                src={Kepem}
                width={250}
                height={250}
                className="w-[71%] h-[71%] object-cover rounded-full z-10 border-4 border-dark-color"
              />
            </div>

            <div className="flex-row flex gap-[10px] py-[20px] px-[10px] items-center justify-center ">
              <div className="flex flex-row gap-[20px] items-center">
                <a
                  href="mailto:sziligalaron@gmail.com"
                  className="rounded-full bg-dark-green p-[10px] shadow-[0_0_10px_2px_rgba(0,0,0,0.6)]"
                >
                  <HiOutlineMail size={25} className="text-white" />
                </a>
                <a
                  href="tel:+36203127968"
                  className="rounded-full bg-dark-green p-[10px] shadow-[0_0_10px_2px_rgba(0,0,0,0.6)]"
                >
                  <FiPhoneCall size={25} className="text-white" />
                </a>
              </div>
              <div className="flex flex-col border-l-2 border-neutral-600 pl-[10px] !text-neutral-600 gap-[10px]">
                <p>Szili Gál Áron</p>
                <p>FullStack fejlesztő</p>
              </div>
            </div>
          </div>

          {/* Gyors válasz ,stb... blokk ------------- */}
          <div className="flex flex-row flex-wrap gap-[10px] md:gap-[20px] mt-[25px] w-full justify-between md:justify-center">
            <div className="contact-pros flex flex-col items-center justify-center ">
              <SiCoffeescript size={20} className="text-green" />
              <p className="text-sm md:text-[15px]">Kötetlenség</p>
            </div>
            <div className="contact-pros flex flex-col items-center justify-center ">
              <SiAnswer size={20} className="text-green" />
              <p className="text-sm md:text-[15px]">Gyors válasz</p>
            </div>
            <div className="contact-pros flex flex-col items-center justify-center ">
              <BsCalendarCheckFill size={20} className="text-green" />
              <p className="text-sm md:text-[15px]">Átláthatóság</p>
            </div>
          </div>

          {/* Kapcsolat előnyök ------ */}

          <div className="flex flex-col gap-[15px] p-[10px] rounded-md w-full md:max-w-[350px] hidden">
            {contactPrios.map((prio, _) => (
              <div
                key={prio}
                className="relative flex items-stretch h-full w-full "
              >
                <motion.div
                  initial="hidden"
                  variants={wrapperVariants}
                  whileInView="visible"
                  viewport={{ margin: "0px 0px 0% 0px", once: false }}
                  className="relative flex items-center w-full"
                >
                  {/* Balról jobbra kitöltő zöld háttér */}
                  <motion.div
                    variants={containerVariant}
                    className="bg-green rounded-full p-[10px] w-full md:w-full flex flex-row items-center gap-[10px]"
                  >
                    {/* Ikon konténer */}
                    <motion.div
                      variants={iconVariants}
                      className="flex items-center justify-center p-[5px] z-20 w-fit rounded-full bg-white"
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

                    <p className="text-white">{prio}</p>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jobb oldali form wrapper --------- */}
      <div className="flex flex-col w-full md:w-1/2">
        <ContactForm></ContactForm>
      </div>
    </section>
  );
}
