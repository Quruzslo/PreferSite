"use client";

import { useState, useEffect, useRef } from "react";

export default function MouseFollowerElement() {
  const [position, setPosition] = useState({ xPos: 0, yPos: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Ref-ek az értékek tárolásához re-render kiváltása nélkül
  const mousePos = useRef({ x: 0, y: 0 });
  const isHoveredRef = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 1. Csak elmentjük az egérpozíciót (szupergyors)
      mousePos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;

      // 2. Beállítjuk a hover állapotot (kitisztítva a dupla 'ul'-t, hozzáadva az 'a'-t is)
      isHoveredRef.current = !!(
        target.closest("ul") ||
        target.closest("button") ||
        target.closest("a")
      );
    };

    // 3. A kijelző frissítési frekvenciájával (FPS) szinkronizált ciklus
    const updatePosition = () => {
      setPosition({
        xPos: mousePos.current.x,
        yPos: mousePos.current.y,
      });
      setIsHovered(isHoveredRef.current);

      // Kérjük a következő képkockát
      rafId.current = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove);
    // Ciklus indítása
    rafId.current = requestAnimationFrame(updatePosition);

    // Takarítás unmount esetén
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <>
      {/* BELSŐ KIS PONT */}
      <div
        className={`fixed top-0 left-0 w-[15px] h-[15px] bg-transparent rounded-full pointer-events-none z-[9999] ${
          isHovered ? "md:bg-white" : "md:bg-green"
        }`}
        style={{
          transform: `translate3d(${position.xPos}px, ${position.yPos}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* KÜLSŐ KARIKA */}
      <div
        className={`fixed top-0 left-0 w-[36px] h-[36px] border-transparent border rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isHovered ? "md:border-white" : "md:border-green"
        }`}
        style={{
          transform: `translate3d(${position.xPos}px, ${position.yPos}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
