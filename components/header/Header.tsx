"use client";
import Image from "next/image";
import logo from "@/public/Prefer-logo.png";
import HamburgerButton from "./hamburgerButton";
import navItems from "@/lib/navItems";

import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Görgetés figyelés
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 75);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      {/* Mobil layer + menü (Új, biztonságos magasság-kezeléssel) */}
      <div
        className={`mobil-layer fixed inset-0 w-full h-[100dvh] z-[998] md:hidden bg-dark-color text-white transition-opacity duration-300 
          ${menuOpen ? "pointer-events-auto overflow-y-auto overflow-x-hidden opacity-100 active" : "pointer-events-none overflow-hidden opacity-0"}`}
      >
        <div className="w-full min-h-full flex flex-col items-center justify-center py-24">
          <nav className="py-[5px] px-[20px] text-white rounded-md">
            <ul className="flex flex-col items-center gap-6 font-bold">
              {navItems.map((item, idx) => (
                <li
                  key={item.path || item.name}
                  className="hover:opacity-80 cursor-pointer transition-all duration-300 menu-link"
                  style={{ animationDelay: `${400 + idx * 100}ms` }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

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
          <nav className="bg-dark-color py-[5px] px-[20px] text-white rounded-md hidden md:flex">
            <ul className="flex flex-row items-center gap-6 font-bold">
              {navItems.map((item, idx) => (
                <li
                  key={idx}
                  className="menu-link hover:opacity-80 cursor-pointer transition-opacity"
                  style={{ animationDelay: `${idx * 100}ms` }}
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
