"use client";

import { useEffect, useRef, useState } from "react";

export default function MouseFollowerElement() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ABLAK SZÉLESSÉG FIGYELŐ
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 767);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // EGÉRKÖVETŐ LOGIKA
  useEffect(() => {
    if (isMobile) return;

    let mouseX = 0;
    let mouseY = 0;

    // hogy volt-e TÉNYLEGES elmozdulás
    let prevX = -1;
    let prevY = -1;

    let isHovered = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;

      // Egyetlen DOM lekérdezés három helyett
      const newIsHovered = !!target.closest("ul, button, a");

      if (newIsHovered !== isHovered) {
        isHovered = newIsHovered;

        if (dotRef.current && circleRef.current) {
          dotRef.current.classList.toggle("md:bg-white", isHovered);
          dotRef.current.classList.toggle("md:bg-green", !isHovered);

          circleRef.current.classList.toggle("md:border-white", isHovered);
          circleRef.current.classList.toggle("md:border-green", !isHovered);
        }
      }
    };

    const updatePosition = () => {
      //  Csak akkor nyúlunk a DOM-hoz, ha az egér tényleg mozdult
      if (prevX !== mouseX || prevY !== mouseY) {
        const transformValue = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        if (dotRef.current) {
          dotRef.current.style.transform = transformValue;
        }
        if (circleRef.current) {
          circleRef.current.style.transform = transformValue;
        }

        // Elmentjük az új pozíciót
        prevX = mouseX;
        prevY = mouseY;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <>
      <div
        ref={dotRef}
        // OPTIMALIZÁCIÓ: will-change-transform hozzáadva a GPU gyorsításhoz
        className={`fixed top-0 left-0 w-[15px] h-[15px] bg-transparent rounded-full pointer-events-none z-[9999] will-change-transform md:bg-green ${isMobile ? "hidden" : "block"}`}
      />

      <div
        ref={circleRef}
        // OPTIMALIZÁCIÓ: will-change-transform hozzáadva
        className={`fixed top-0 left-0 w-[36px] h-[36px] border-transparent border rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out will-change-transform md:border-green ${isMobile ? "hidden" : "block"}`}
      />
    </>
  );
}
