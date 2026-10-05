"use client";
import { useRef } from "react";

import Section from "@/lib/section";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import { FaFlagCheckered, FaUserCheck } from "react-icons/fa6";

// const counterArray = [
//   {
//     id: 0,
//     title: "Elkészült projekt",
//     targetNumber: 21,
//     durationMs: 100,
//     icon: FaFlagCheckered,
//   },
//   {
//     id: 1,
//     title: "Elégedett ügyfél",
//     targetNumber: 13,
//     durationMs: 250,
//     icon: FaUserCheck,
//   },
// ];

export default function CounterSection() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const isInView1 = useInView(ref1, { amount: 0.5, once: false });
  const isInView2 = useInView(ref2, { amount: 0.5, once: false });

  const clipVariants = {
    hidden: {
      clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      opacity: 1,
    },
    visible: {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1,
    },
  };

  return (
    <Section className="rounded-[15px] bg-dark-color p-[15px] md:p-[25px] text-white my-[35px] shadow-[5px_5px_15px_0px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col md:flex-row gap-[35px] w-full">
        <div className="flex flex-col gap-[20px] w-full lg:w-1/2">
          <div className="flex flex-wrap md:flex-col gap-2 !text-[30px] lg:!text-[45px] font-black break-words min-w-0">
            <span>
              <span className="bg-green text-white px-1.5 py-0.5 rounded mr-1 inline-block leading-none">
                Á
              </span>
              tbeszéljük.
            </span>
            <span>
              <span className="bg-green text-white px-1.5 py-0.5 rounded mr-1 inline-block leading-none">
                M
              </span>
              egtervezem.
            </span>
            <span>
              <span className="bg-green text-white px-1.5 py-0.5 rounded mr-1 inline-block leading-none">
                E
              </span>
              lkészítem.
            </span>
            <span>
              <span className="bg-green text-white px-1.5 py-0.5 rounded mr-1 inline-block leading-none">
                N
              </span>
              eked adom.
            </span>
          </div>

          <a
            href="/kapcsolat"
            className="group flex flex-row items-center gap-[5px] w-fit text-[35px]"
          >
            <span className="relative z-10 bg-green flex items-center justify-center text-white font-bold w-[45px] h-[45px] border-3 border-dark-color rounded-full transition-transform duration-300 ease-in-out">
              Á
            </span>

            <span className="relative z-20 -translate-x-[18px] group-hover:translate-x-0 bg-green flex items-center justify-center text-white font-bold w-[45px] h-[45px] border-3 border-dark-color rounded-full transition-transform duration-300 ease-in-out">
              M
            </span>

            <span className="relative z-30 -translate-x-[36px] group-hover:translate-x-0 bg-green flex items-center justify-center text-white font-bold w-[45px] h-[45px] border-3 border-dark-color rounded-full transition-transform duration-300 ease-in-out">
              E
            </span>

            <span className="relative z-40 -translate-x-[54px] group-hover:translate-x-0 bg-green flex items-center justify-center text-white font-bold w-[45px] h-[45px] border-3 border-dark-color rounded-full transition-transform duration-300 ease-in-out">
              N
            </span>
          </a>
          <div className="flex flex-row md:gap-[25px] nowrap my-[15px]"></div>
        </div>

        <div className="flex flex-col gap-[35px] w-full lg:w-1/2 justify-between py-[25px]">
          <div className="flex flex-col gap-[15px]">
            <div ref={ref1} className="w-fit max-w-full">
              <motion.div
                variants={clipVariants}
                initial="hidden"
                animate={isInView1 ? "visible" : "hidden"}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: "clip-path" }}
                className="inline-flex items-center border-2 border-green rounded-full  p-[8px] md:p-[10px] w-fit max-w-full"
              >
                <div className="flex-shrink-0 w-[40px] h-[40px] lg:w-[75px] lg:h-[75px] flex items-center justify-center">
                  <Image
                    alt="Vállalkozóknak weboldal készítés"
                    src="/icons/upstair.svg"
                    height={75}
                    width={75}
                    className="p-[2px] rounded-full border border-green shadow-green shadow-md w-full h-full object-cover"
                  />
                </div>

                <div className="pl-3 pr-2 min-w-0">
                  <h3 className="!text-[15px] lg:!text-[25px] font-bold leading-tight text-left break-words">
                    Nem csak szép, ügyfeleket is generál.
                  </h3>
                </div>
              </motion.div>
            </div>

            <p className="text-[15px] font-semibold text-gray-200">
              Egyedi, prémium weboldal, ami növeli a vállalkozásod hitelességét,
              jobb konverziót ér el és folyamatosan termeli a megrendeléseket.
            </p>

            <p className="text-[15px] font-bold text-green">
              Nem AI sablon, amiket a konkurenciád használ
            </p>
          </div>

          {/* Második kapszula */}
          <div className="flex flex-col gap-[15px]">
            <div ref={ref2} className="w-fit max-w-full">
              <motion.div
                variants={clipVariants}
                initial="hidden"
                animate={isInView2 ? "visible" : "hidden"}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ willChange: "clip-path" }}
                className="inline-flex items-center border-2 border-green rounded-full p-[8px] md:p-[10px] w-fit max-w-full"
              >
                <div className="flex-shrink-0">
                  <Image
                    alt="Vállalkozóknak weboldal készítés"
                    src="/icons/maintenance.svg"
                    height={45}
                    width={45}
                    className="p-[2px] rounded-full border-1 border-green shadow-green shadow-md w-[40px] h-[40px] lg:w-[75px] lg:h-[75px]"
                  />
                </div>

                <div className="pl-3 pr-2 min-w-0">
                  <h3 className="!text-[15px] lg:!text-[25px] font-bold leading-tight text-left break-words">
                    Teljes körű nyugalom a számodra.
                  </h3>
                </div>
              </motion.div>
            </div>

            <p className="text-[15px] font-semibold text-gray-200">
              Mindent egy kézben tartok a tervezéstől a folytonos üzemeltetésig.
              Nem kell technikai részletekkel bajlódnod.
            </p>
            <p className="text-[15px] font-bold text-gray-200">
              Domain, tárhely, karbantartás és azonnali hibajavítás. Neked csak
              a vállalkozásod növekedésére kell fókuszálnod.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
