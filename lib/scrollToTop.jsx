"use client";

import { useEffect, useState } from "react";
import { IoCaretUp } from "react-icons/io5";

export default function ScrollToTop() {
  const [active, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.addEventListener("scroll", handleScroll);
  }, []);

  const scrollingToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollingToTop}
      type="button"
      aria-label="Vissza az oldal tetejére."
      className={`${
        active ? "translate-x-0" : "translate-x-[150px]"
      } fixed right-[10px] bottom-[10px] p-[5px] z-[99] bg-green rounded-full items-center justify-center shadow-[2px_2px_15px_2px_rgba(0,0,0,0.3)] cursor-pointer hover:scale-110 transition-transform`}
    >
      <IoCaretUp size={30} fill={"white"} />
    </button>
  );
}
