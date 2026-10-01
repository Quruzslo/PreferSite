"use client";
import Counter from "./Counters";
import Section from "@/lib/section";
import Image from "next/image";
import { motion } from "framer-motion";

// Ikonok
import { FaFlagCheckered, FaUserCheck } from "react-icons/fa6";

const counterArray = [
  {
    id: 0,
    title: "Elkészült projekt",
    targetNumber: 21,
    durationMs: 100,
    icon: FaFlagCheckered,
  },
  {
    id: 1,
    title: "Elégedett ügyfél",
    targetNumber: 13,
    durationMs: 250,
    icon: FaUserCheck,
  },
];

export default function CounterSection() {
  return (
    <Section className="rounded-[15px] bg-dark-color p-[15px] md:p-[25px] text-white my-[35px] shadow-[5px_5px_15px_0px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col md:flex-row gap-[35px] w-full">
        <div className="flex flex-col gap-[20px] w-full md:w-1/2">
          <div className="grid grid-cols-2 md:flex md:flex-col gap-[0px] !text-[30px] lg:!text-[45px] font-black ">
            <p>Átbeszéljük.</p>
            <span>Megtervezem.</span>
            <span>Elkészítem.</span>
            <span>Neked adom.</span>
          </div>

          <a
            href="/kapcsolat"
            className="group flex flex-row items-center gap-[5px] w-fit text-[35px]"
          >
            <span className="relative z-10 bg-green flex items-center justify-center text-white  font-bold w-[45px] h-[45px] border-3 border-dark-color rounded-full transition-transform duration-300 ease-in-out">
              Á
            </span>

            <span className="relative z-20 -translate-x-[18px] group-hover:translate-x-0 bg-green flex items-center justify-center text-white  font-bold w-[45px] h-[45px] border-3 border-dark-color rounded-full transition-transform duration-300 ease-in-out">
              M
            </span>

            <span className="relative z-30 -translate-x-[36px] group-hover:translate-x-0 bg-green flex items-center justify-center text-white  font-bold w-[45px] h-[45px] border-3 border-dark-color rounded-full transition-transform duration-300 ease-in-out">
              E
            </span>

            <span className="relative z-40 -translate-x-[54px] group-hover:translate-x-0 bg-green flex items-center justify-center text-white  font-bold w-[45px] h-[45px] border-3 border-dark-color rounded-full transition-transform duration-300 ease-in-out">
              N
            </span>
          </a>
          <div className="flex flex-row md:gap-[25px] nowrap my-[15px]">
            {counterArray.map((elem) => (
              <Counter
                key={elem.id}
                title={elem.title}
                durationMs={elem.durationMs}
                targetNumber={elem.targetNumber}
                icon={elem.icon}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[35px] w-full md:w-1/2 justify-between py-[25px] ">
          <div className="flex flex-col gap-[15px]">
            <div className="flex flex-row items-center border-2 border-green rounded-full p-[10px] w-fit overflow-hidden">
              <div className="flex-shrink-0">
                <Image
                  alt="Vállalkozóknak weboldal készítés"
                  src="/icons/upstair.svg"
                  height={45}
                  width={45}
                  className="p-[2px] rounded-full border-1 border-green shadow-green shadow-md w-[50px] h-[50px] md:w-[75px] md:h-[75px]"
                />
              </div>

              <motion.div
                initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                whileInView={{ width: "auto", opacity: 1, marginLeft: 15 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: false, amount: 0.3 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <h3 className="!text-[15px] md:!text-[25px] font-bold">
                  Nem csak szép, ügyfeleket is generál
                </h3>
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

          <div className="flex flex-col gap-[15px] ">
            <div className="flex flex-row items-center border-2 border-green rounded-full p-[10px] w-fit overflow-hidden">
              <div className="flex-shrink-0">
                <Image
                  alt="Vállalkozóknak weboldal készítés"
                  src="/icons/maintenance.svg"
                  height={45}
                  width={45}
                  className="p-[2px] rounded-full border-1 border-green shadow-green shadow-md w-[50px] h-[50px] md:w-[75px] md:h-[75px]"
                />
              </div>

              <motion.div
                initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                whileInView={{ width: "auto", opacity: 1, marginLeft: 15 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: false, amount: 0.3 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <h3 className="!text-[15px] md:!text-[25px] font-bold">
                  Teljes körű nyugalom a számodra
                </h3>
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
