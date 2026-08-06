import refArray from "./refs";
import Image from "next/image";
import { useState } from "react";

// ikonok------------
import { IoArrowBack, IoArrowForwardOutline } from "react-icons/io5";

export default function Referencies() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Lapozó függvények
  const handleNext = () => {
    if (activeSlide < refArray.length - 1) {
      setActiveSlide((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeSlide > 0) {
      setActiveSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center gap-6">
      <div className="relative w-full h-[450px] overflow-hidden rounded-lg">
        {refArray.map((ref) => {
          let slideClass = "opacity-0 pointer-events-none translate-x-full";

          if (activeSlide === ref.id) {
            slideClass = "active opacity-100 translate-x-0 z-10";
          } else if (activeSlide === ref.id + 1) {
            slideClass = "previous opacity-0 -translate-x-full";
          } else if (activeSlide === ref.id - 1) {
            slideClass = "next opacity-0 translate-x-full";
          }

          return (
            <div
              key={ref.id}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${slideClass}`}
            >
              {/*KÉP  */}
              <div className="absolute inset-0 w-full h-full z-0">
                <Image
                  fill
                  alt={ref.title}
                  src={ref.desktopPhotoSrc}
                  className="object-contain md:object-cover"
                />

                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              {/*  A SZÖVEG  */}
              <div className="absolute bottom-6 left-6 z-10 text-white">
                <h2 className="text-2xl font-bold">{ref.title}</h2>
                <div className="flex gap-4 mt-2 text-neutral-300">
                  <span>{ref.date}</span>
                  <span>{ref.stack}</span>
                </div>
              </div>
            </div>
          );
        })}

        {/*  A GOMBOK  */}
        <div className="absolute bottom-6 right-6 flex gap-4 z-20">
          <button
            onClick={handlePrev}
            disabled={activeSlide === 0}
            className="px-4 py-2 bg-green rounded disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            <IoArrowBack />
          </button>

          <button
            onClick={handleNext}
            disabled={activeSlide === refArray.length - 1}
            className="px-4 py-2 bg-green rounded disabled:opacity-50 disabled:cursor-not-allowed text-white"
          >
            <IoArrowForwardOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
