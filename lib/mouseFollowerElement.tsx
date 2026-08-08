"use client";

import { useState, useEffect } from "react";

export default function MouseFollowerElement() {
  const [position, setPosition] = useState({ xPos: 0, yPos: 0 });

  // Új state a hover állapotnak
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ xPos: e.clientX, yPos: e.clientY });
      const target = e.target as HTMLElement;

      if (
        target.closest("ul") ||
        target.closest("button") ||
        target.closest("ul")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* BELSŐ KIS PONT */}
      <div
        className={`fixed top-0 left-0 w-[15px] h-[15px] bg-green rounded-full pointer-events-none z-[9999] ${
          isHovered ? "bg-white" : "bg-green"
        }`}
        style={{
          transform: `translate3d(${position.xPos}px,${position.yPos}px, 0) translate(-50%, -50%)`,
        }}
      />

      {/* KÜLSŐ KARIKA - Dinamikus classokkal */}
      <div
        className={`fixed top-0 left-0 w-[36px] h-[36px] border rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isHovered ? "border-white" : "border-green"
        }`}
        style={{
          transform: `translate3d(${position.xPos}px,${position.yPos}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
