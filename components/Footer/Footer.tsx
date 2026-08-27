"use client";
import Image from "next/image";
import Logom from "@/public/Prefer-logo.png";
import navItems from "@/lib/navItems";
// Ikonok------------
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdOutlineCookie } from "react-icons/md";
import { useRef, useContext } from "react";
import { ScrollContext } from "@/lib/ScrollContext";

export default function Footer() {
  const { triggerIsScrolling }: any = useContext(ScrollContext);

  const now = new Date().getFullYear();

  return (
    <section className="w-full flex flex-col bg-dark-color text-white py-[50px] z-1">
      <div className="w-[90%] max-w-[2560px] grid grid-cols-1 md:grid-cols-3 gap-[20px] bg-dark-green p-[15px] mx-auto rounded-[24px]">
        <div className="w-full flex flex-col gap-[15px]">
          <div className="footer-logo flex flex-row px-[20px] py-[10px] rounded-b-[24px] mb-[25px] bg-dark-color items-center relative w-fit mx-auto mt-[-15px]">
            <Image
              height={40}
              width={40}
              alt="Weboldal készítés, webshop készítés, CRM rendszer készítés"
              src={Logom}
            />
          </div>

          <p>
            Több éves tapasztalat webfejlesztés terén. Célom, hogy pénztermelő
            rendszereket fejlesszek cégeknek, vállalkozásoknak, akik valóban
            szeretnének kitűnni a konkurenciájuk közül.
          </p>
          <p>
            A folyamatos partneri viszony nálam alapvetés, a közös munka mindig
            meghozza a várt sikereket!
          </p>
        </div>

        <div className="w-full flex flex-col gap-[15px] justify-center">
          <div className="flex flex-row gap-[10px] mb-[25px] pb-[10px]">
            <h3>- Navigáció -</h3>
          </div>

          <nav className="desktop-nav relative py-[15px] px-[20px] text-white rounded-md flex justify-start">
            <ul className="relative flex flex-col items-start gap-6 font-bold w-fit">
              {navItems.map((item, idx) =>
                item.items && item.items.length > 0 ? (
                  <li
                    key={idx}
                    className="relative group z-11 flex cursor-pointer"
                  >
                    <a
                      href={item.path}
                      onClick={() => triggerIsScrolling()}
                      className="menu-link hover:text-green transition-colors flex items-center gap-1"
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
                    <div className="absolute left-1/2 -translate-x-1/2 top-full flex flex-col bg-green shadow-lg rounded-md py-2 min-w-[160px] !z-50 transition-all duration-300 ease-out opacity-0 invisible translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto">
                      {item.items.map((subItem, subIdx) => (
                        <a
                          key={subIdx}
                          href={`${subItem.path}`}
                          onClick={() => triggerIsScrolling()}
                          className="px-4 py-2 text-sm text-white hover:text-dark-color transition-colors"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </li>
                ) : (
                  <a
                    key={idx}
                    href={item.path}
                    onClick={() => triggerIsScrolling()}
                    className="relative z-10 menu-link hover:text-green cursor-pointer transition-colors"
                  >
                    {item.name}
                  </a>
                ),
              )}
            </ul>
          </nav>
        </div>

        <div className="w-full flex flex-col gap-[15px]">
          <div className="flex flex-row gap-[10px] mb-[25px] pb-[10px] items-center">
            <h3>- Kapcsolat -</h3>
          </div>
          <div className="w-full flex flex-col gap-[15px] justify-center">
            <a
              href="mailto:info@prefersite.hu"
              className="flex flex-row gap-[15px] items-center"
            >
              <HiOutlineMail size={25} /> info@prefersite.hu
            </a>
            <a
              href="tel:+36203127968"
              className="flex flex-row gap-[15px] items-center"
            >
              <FaPhoneVolume size={25} /> +36 20 312 7968
            </a>
            <a
              href="https://prefersite.hu/adatkezeles"
              className="flex flex-row gap-[15px] items-center"
            >
              <MdOutlineCookie size={25} /> Süti -és adatkezelés
            </a>
          </div>
        </div>
      </div>

      <div className="w-[90%] max-w-[2560px] flex flex-row gap-[10px] p-[15px] mx-auto border-white/20 border-t-2 mt-[25px] items-center justify-center text-center">
        <p> {now} © Prefer Site - Minden jog fenntartva.</p>
      </div>
    </section>
  );
}
