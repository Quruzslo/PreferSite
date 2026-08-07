"use client";
import Image from "next/image";
import logo from "@/public/Prefer-logo.png";
import HamburgerButton from "./hamburgerButton";
import navItems from "@/lib/navItems";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // -Csúszó háttér állapota ---
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Egér ráhúzása egy menüpontra
  const handleMouseEnter = (e: any) => {
    const el = e.currentTarget;
    setIndicatorStyle({
      left: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
    });
  };

  // Egér lehúzása a teljes menüről
  const handleMouseLeave = () => {
    setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
  };
  // ----------------------------------------------

  // Görgetés figyelés
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 75);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Body görgetés tiltása nyitott menünél
  useEffect(() => {
    const htmlElem = document.documentElement;
    if (menuOpen) {
      htmlElem.style.overflow = "hidden";
    } else {
      htmlElem.style.overflow = "";
    }
    return () => {
      htmlElem.style.overflow = "";
    };
  }, [menuOpen]);

  // bg animáció objektuma
  const bgTransition = {
    duration: 0.8,
    ease: [0.77, 0, 0.175, 1],
  } as const;

  return (
    <>
      {/* Mobil layer + Animációk */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 w-full h-[100dvh] z-[998] md:hidden bg-white text-white overflow-y-auto overflow-x-hidden">
            <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
              {/* Felső sáv */}
              <motion.div
                initial={{ y: "-152%" }}
                animate={{ y: "15%" }}
                exit={{ y: "-152%" }}
                transition={bgTransition}
                className="absolute w-[300%] h-[50%] bg-dark-color left-[-100%] top-[-10%] rotate-[-45deg] origin-center"
              />

              {/* Középső sáv */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1.25 }}
                exit={{ scaleY: 0 }}
                transition={bgTransition}
                className="absolute w-[300%] h-[60%] bg-dark-color left-[-100%] top-[20%] rotate-[-45deg] origin-center"
              />

              {/* Alsó sáv */}
              <motion.div
                initial={{ y: "150%" }}
                animate={{ y: "-15%" }}
                exit={{ y: "150%" }}
                transition={bgTransition}
                className="absolute w-[300%] h-[50%] bg-dark-color left-[-100%] top-[60%] rotate-[-45deg] origin-center"
              />
            </div>

            {/* 2. GÖRGETHETŐ TARTALOM - legalább 100dvh magas, de ha nem fér el, görgethető */}
            <div className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center py-16 px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                className="menu-container w-full max-w-[320px] mx-auto flex flex-col items-center justify-center text-center my-auto"
              >
                <nav className="w-full py-[5px] px-[20px] text-white">
                  <ul className="flex flex-col items-center gap-6 font-bold">
                    {navItems.map((item, idx) => (
                      <motion.li
                        key={item.path || item.name}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 + idx * 0.08 }}
                        className="hover:opacity-80 cursor-pointer transition-opacity menu-link text-2xl"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.name}
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <section className={`w-full flex flex-col fixed top-0 left-0 z-[999]`}>
        <header
          className={`header w-[90%] max-w-[2560px] mx-auto p-[10px] flex flex-row items-center justify-between ${
            isScrolled ? "active mt-[15px]" : ""
          } overflow-hidden`}
        >
          {/* Logó konténer */}
          <div className="relative w-[50px] h-[50px] bg-dark-color rounded-full flex flex-row">
            <Image
              src={logo}
              alt="Prefer Logo - Egyedi weboldal és webshop fejlesztés"
              fill
              priority
              className="object-contain !w-[40px] !h-[40px] mx-auto my-auto"
            />
          </div>

          {/* Desktop nézet */}
          <nav className="desktop-nav relative bg-dark-color py-[5px] px-[20px] text-white rounded-md hidden md:flex">
            <ul
              className="relative flex flex-row items-center gap-6 font-bold"
              onMouseLeave={handleMouseLeave}
            >
              {/* CSÚSZÓ HÁTTÉR */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-[calc(100%+14px)] bg-green rounded-md transition-all duration-300 ease-out pointer-events-none"
                style={{
                  left: `${indicatorStyle.left - 10}px`,
                  width: `${indicatorStyle.width + 20}px`,
                  opacity: indicatorStyle.opacity,
                }}
              />

              {navItems.map((item, idx) => (
                <li
                  key={idx}
                  onMouseEnter={handleMouseEnter}
                  className="relative z-10 menu-link hover:text-dark-color cursor-pointer transition-colors"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>

          <HamburgerButton
            isScrolled={isScrolled}
            isOpen={menuOpen}
            onToggle={(isOpen) => setMenuOpen(isOpen)}
          />

          {/* Kapcsolat */}
          <div className="hidden md:flex flex-row gap-4 items-center justify-center">
            <button
              aria-label="Weboldal és webshop fejlesztés kapcsolat"
              className="kapcsolat-btn cursor-pointer relative font-black text-[15px] flex flex-row gap-[5px] bg-dark-color text-white rounded-md py-[5px] px-[20px]"
            >
              KAPCSOLAT
            </button>
          </div>
        </header>
      </section>
    </>
  );
}
