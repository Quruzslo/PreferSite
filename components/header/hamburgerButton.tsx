"use client";

import { useState } from "react";

interface HamburgerButtonProps {
  isOpen?: boolean;
  isScrolled?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

export default function HamburgerButton({
  isOpen: externalIsOpen,
  isScrolled,
  onToggle,
}: HamburgerButtonProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClick = () => {
    setHasInteracted(true);
    const newState = !isOpen;
    if (externalIsOpen === undefined) {
      setInternalIsOpen(newState);
    }
    if (onToggle) {
      onToggle(newState);
    }
  };

  const stateClass = isOpen ? "is-open" : hasInteracted ? "is-closed" : "";

  return (
    <button
      type="button"
      aria-label="Menü kapcsoló"
      className={`svg-hamburger-btn ${stateClass} flex md:!hidden `}
      onClick={handleClick}
    >
      <svg
        viewBox="0 0 68 68"
        className={`hamburger-svg ${isOpen || isScrolled ? "!text-white" : "text-white"}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="34"
          cy="34"
          r="30"
          className="ring-path"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />

        {/* Belső vonalak */}
        <g
          className="burger-lines"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        >
          {/* Felső vonal */}
          <line x1="18" y1="24" x2="50" y2="24" className="line line-top" />

          {/* Középső vonal - ez csúszik ki jobbra és "alakul át" körré */}
          <line x1="18" y1="34" x2="50" y2="34" className="line line-middle" />

          {/* Alsó vonal */}
          <line x1="18" y1="44" x2="50" y2="44" className="line line-bottom" />
        </g>
      </svg>
    </button>
  );
}
