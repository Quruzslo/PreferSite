"use client";

import { useEffect, useRef } from "react";

export default function MouseFollowerElement() {
  // Ref-ek a DOM elemek közvetlen eléréséhez
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let isHovered = false;
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement;
      const newIsHovered = !!(
        target.closest("ul") ||
        target.closest("button") ||
        target.closest("a")
      );

      // Csak akkor nyúlunk a DOM-hoz class-ügyben, ha VÁLTOZOTT a hover állapota
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

    // Közvetlen DOM frissítés a képkockák igazításához
    const updatePosition = () => {
      const transformValue = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      if (dotRef.current) {
        dotRef.current.style.transform = transformValue;
      }
      if (circleRef.current) {
        circleRef.current.style.transform = transformValue;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* BELSŐ KIS PONT */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[15px] h-[15px] bg-transparent rounded-full pointer-events-none z-[9999] md:bg-green"
      />

      {/* KÜLSŐ KARIKA */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 w-[36px] h-[36px] border-transparent border rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out md:border-green"
      />
    </>
  );
}
