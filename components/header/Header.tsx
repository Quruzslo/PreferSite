"use client";
import Image from "next/image";
import logo from "@/public/Prefer-logo.png";
import HamburgerButton from "./hamburgerButton";
import navItems from "@/lib/navItems";

import { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollContext } from "@/lib/ScrollContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { triggerIsScrolling }: any = useContext(ScrollContext);

  // -Csúszó háttér állapota ---
  const indicatorRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: any) => {
    const el = e.currentTarget;
    if (indicatorRef.current) {
      indicatorRef.current.style.left = `${el.offsetLeft - 10}px`;
      indicatorRef.current.style.width = `${el.offsetWidth + 20}px`;
      indicatorRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (indicatorRef.current) {
      indicatorRef.current.style.opacity = "0";
    }
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

  const bgTransition = {
    duration: 0.8,
    ease: [0.77, 0, 0.175, 1],
  } as const;

  return (
    <>
      {/* Mobil layer + Animációk */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 w-full h-[100dvh] z-[998] md:hidden bg-white text-white overflow-y-auto overflow-x-hidden overscroll-none">
            <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
              {/* Felső sáv */}
              <motion.div
                initial={{ y: "-152%", z: 0 }}
                animate={{ y: "15%", z: 0 }}
                exit={{ y: "-152%", z: 0 }}
                transition={bgTransition}
                className="absolute w-[300%] h-[50%] bg-dark-color left-[-100%] top-[-10%] rotate-[-45deg] origin-center will-change-transform [backface-visibility:hidden]"
              />

              {/* Középső sáv */}
              <motion.div
                initial={{ scaleY: 0, z: 0 }}
                animate={{ scaleY: 1.25, z: 0 }}
                exit={{ scaleY: 0, z: 0 }}
                transition={bgTransition}
                className="absolute w-[300%] h-[60%] bg-dark-color left-[-100%] top-[20%] rotate-[-45deg] origin-center will-change-transform [backface-visibility:hidden]"
              />

              {/* Alsó sáv */}
              <motion.div
                initial={{ y: "150%", z: 0 }}
                animate={{ y: "-15%", z: 0 }}
                exit={{ y: "150%", z: 0 }}
                transition={bgTransition}
                className="absolute w-[300%] h-[50%] bg-dark-color left-[-100%] top-[60%] rotate-[-45deg] origin-center will-change-transform [backface-visibility:hidden]"
              />
            </div>

            {/*  tartalom */}
            <div className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center py-16 px-4">
              <motion.div
                initial={{ opacity: 0, y: 30, z: 0 }}
                animate={{ opacity: 1, y: 0, z: 0 }}
                exit={{ opacity: 0, y: 20, z: 0 }}
                transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                className="menu-container w-full max-w-[320px] mx-auto flex flex-col items-center justify-center text-center my-auto will-change-transform [backface-visibility:hidden]"
              >
                <nav className="w-full py-[5px] px-[20px] text-white">
                  <ul className="flex flex-col items-center gap-6 font-bold">
                    {navItems.map((item, idx) => (
                      <motion.a
                        key={item.path || item.name}
                        href={item.path}
                        initial={{ opacity: 0, y: 15, z: 0 }}
                        animate={{ opacity: 1, y: 0, z: 0 }}
                        transition={{ delay: 0.35 + idx * 0.08 }}
                        className="hover:opacity-80 cursor-pointer transition-opacity menu-link text-2xl will-change-transform [backface-visibility:hidden]"
                        onClick={() => {
                          (setMenuOpen(false), triggerIsScrolling());
                        }}
                      >
                        {item.name}
                      </motion.a>
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
          } `}
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
              {/* Csúszó elem */}
              <div
                ref={indicatorRef}
                className="absolute top-1/2 -translate-y-1/2 h-[calc(100%+14px)] bg-green rounded-md transition-all duration-300 ease-out pointer-events-none opacity-0"
              />

              {navItems.map((item, idx) =>
                item.items && item.items.length > 0 ? (
                  <div
                    key={idx}
                    className="relative group z-10 flex "
                    onMouseEnter={handleMouseEnter}
                  >
                    <a
                      href={item.path}
                      onClick={() => triggerIsScrolling()}
                      className="menu-link hover:text-dark-color cursor-pointer transition-colors transition flex items-center gap-1"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {item.name}
                      <svg
                        className="w-4 h-4 transition-transform group-hover:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </a>

                    {/* Dropdown */}
                    <div className="absolute -left-1/4 top-full flex flex-col bg-green shadow-lg rounded-md py-2 min-w-[160px] z-50 transition-all duration-300 ease-out opacity-0 invisible translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto">
                      {" "}
                      {item.items.map((subItem, subIdx) => (
                        <a
                          key={subIdx}
                          href={`#${subItem.path}`}
                          onClick={() => triggerIsScrolling()}
                          className="px-4 py-2 text-sm text-white  hover:text-dark-color transition-colors"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={idx}
                    href={item.path}
                    onClick={() => triggerIsScrolling()}
                    onMouseEnter={handleMouseEnter}
                    className="relative z-10 menu-link hover:text-dark-color cursor-pointer transition-colors transition"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {item.name}
                  </a>
                ),
              )}
            </ul>
          </nav>

          <HamburgerButton
            isScrolled={isScrolled}
            isOpen={menuOpen}
            onToggle={(isOpen) => setMenuOpen(isOpen)}
          />

          {/* Kapcsolat */}
          <div className="hidden md:flex flex-row gap-4 items-center justify-center">
            <a
              href="/#kapcsolat"
              onClick={() => {
                triggerIsScrolling();
              }}
              aria-label="Weboldal és webshop fejlesztés kapcsolat"
              className="kapcsolat-btn cursor-pointer relative font-black text-[15px] flex flex-row gap-[5px] bg-dark-color text-white rounded-md py-[5px] px-[20px]"
            >
              KAPCSOLAT
            </a>
          </div>
        </header>
      </section>
    </>
  );
}
