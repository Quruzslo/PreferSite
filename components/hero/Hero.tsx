"use client";
import AtomIcon from "@/public/icons/HeroAtomIcon";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import StackedImages from "./StackedImages";

export default function Hero() {
  const services = [
    { name: "Webapplikáció", link: "/szolgaltatasok/webapplikacio" },
    { name: "Webshop", link: "/szolgaltatasok/webshop" },
    { name: "CRM", link: "/szolgaltatasok/crm" },
    { name: "Weboldal", link: "/szolgaltatasok/weboldal" },
    { name: "Karbantartás", link: "/szolgaltatasok/karbantartas" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <section className="w-full flex-col flex relative overflow-hidden">
      <div className="w-[90%] max-w-[2560px] p-[20px] md:p-[40px] hero-conti zoldhatteres bg-dark-color rounded-2xl filter drop-shadow-[0_5px_20px_rgba(0,0,0,0.6)] mx-auto flex-col flex lg:flex-row mt-[100px] mb-[75px] min-h-[calc(100vh_-_150px)] items-center justify-center gap-[30px] max-h-[1400px]">
        {/* Bal oldal */}
        <div className="hero-bal w-full lg:w-[50%] flex-col flex justify-center gap-[24px]">
          <div className="flex flex-row gap-[10px] rounded-md bg-dark-green text-white w-fit px-3 py-1.5 items-center text-sm font-medium mt-[20px]">
            <AtomIcon />
            <span>Egyedi fejlesztésű webes megoldások</span>
          </div>

          <h1 className="font-black !text-[20px] md:!text-[35px] lg:text-[40px] text-white ">
            Minőségi weboldal készítés és webes szoftverfejlesztése cégeknek és
            vállalkozásoknak.
          </h1>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-black !text-[20px] grid grid-cols-1 md:grid-cols-2 gap-[25px] w-full"
          >
            {services.map((item, idx) => (
              <motion.a
                key={idx}
                variants={itemVariants}
                href={item.link}
                className="h1-elem origin-top-left inline-block w-full  relative text-white"
              >
                {item.name}

                <span className="arrow-left"></span>

                <span className="arrow-right"></span>
              </motion.a>
            ))}
          </motion.div>

          <p className="text-[16px] md:text-[19px] text-gray-300 leading-relaxed max-w-[600px]">
            Sablonok helyett villámgyors, keresőoptimalizált weboldalak,
            konverzióra épített webshopok és cégre optimalizált CRM rendszerek
            készítése, igényes vállalkozásoknak.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/kapcsolat"
              className="px-7 py-3.5 rounded-xl bg-green-500 hover:bg-green-600 text-black font-bold text-center text-lg transition-transform active:scale-95 shadow-lg shadow-green-500/20"
            >
              Konzultáció
            </Link>
          </div>
        </div>

        {/* Jobb oldal */}
        <div className="hero-jobb relative w-full lg:w-[50%] min-h-[350px] lg:min-h-[500px]">
          <div className="lg:absolute lg:inset-0 flex items-center justify-center">
            <StackedImages />
          </div>
        </div>
      </div>
    </section>
  );
}
