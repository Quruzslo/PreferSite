import refArray from "./refs";
import { useState } from "react";
import LiquidSliderBg from "./LiquidSliderBg"; // <-- IMPORTÁLÁS

// ikonok
import { IoArrowBack, IoArrowForwardOutline } from "react-icons/io5";

export default function Referencies() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNext = () => {
    if (activeSlide < refArray.length - 1) setActiveSlide((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (activeSlide > 0) setActiveSlide((prev) => prev - 1);
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center gap-6">
      <div className="relative w-full h-[450px] overflow-hidden rounded-lg shadow-md bg-neutral-900">
        {/*  Folyadék Canvas */}
        <div className="absolute inset-0 z-0">
          <LiquidSliderBg
            src={refArray[activeSlide].desktopPhotoSrc}
            intensity={0.4}
            speed={4}
          />
          {/* Sötétítő réteg a szöveg olvashatósága miatt */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        </div>

        {/* SZÖVEGEK */}
        {refArray.map((ref, index) => {
          // Figyeld meg: kivettük a translate-x-full mozgásokat!
          let slideClass = "opacity-0 pointer-events-none";

          if (activeSlide === index) {
            slideClass = "active opacity-100 z-10 pointer-events-auto";
          } else if (activeSlide > index) {
            slideClass = "previous opacity-0";
          } else {
            slideClass = "next opacity-0";
          }

          return (
            <div
              key={ref.id}
              className={`ref-wrapper absolute inset-0 transition-opacity duration-500 ease-in-out ${slideClass}`}
            >
              <div className="absolute bottom-6 left-6 z-10 text-white">
                <h2 className="ref-title text-2xl font-bold">{ref.title}</h2>
                <div className="ref-details flex gap-4 mt-2 text-neutral-300">
                  <span className="ref-date">{ref.date}</span>
                  <span className="ref-stack">{ref.stack}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/* GOMBOK */}
        <div className="absolute bottom-6 right-6 flex gap-4 z-20">
          <button
            onClick={handlePrev}
            disabled={activeSlide === 0}
            className="cursor-pointer px-4 py-2 w-[45px] h-[45px] flex items-center justify-center rounded-full bg-green disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-dark-green transition-colors"
          >
            <IoArrowBack />
          </button>
          <button
            onClick={handleNext}
            disabled={activeSlide === refArray.length - 1}
            className="cursor-pointer px-4 py-2 w-[45px] h-[45px] flex items-center justify-center rounded-full bg-green disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-dark-green transition-colors"
          >
            <IoArrowForwardOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
