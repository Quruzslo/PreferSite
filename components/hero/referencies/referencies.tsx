import refArray from "./refs";
import { useState } from "react";
import LiquidSliderBg from "./LiquidSliderBg";

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

  // --- Slider nyilak egérkövetése  ---
  const [prevBtnPos, setPrevBtnPos] = useState({ x: 0, y: 0 });
  const [nextBtnPos, setNextBtnPos] = useState({ x: 0, y: 0 });

  // Egér mozgásának követése a dobozon belül
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    setPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // console.log(e)
    // Egér távolsága a gomb középpontjától
    const x = (e.clientX - rect.left - rect.width / 2) * 0.5;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.5;
    setPos({ x, y });
  };

  // Ha kivisszük a cincint a wrapperből
  const handleMouseLeave = (
    setPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  ) => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <div className="w-full mx-auto flex flex-col items-center gap-6">
      <div className="relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-lg shadow-md bg-neutral-900">
        {/* Folyadék Canvas */}
        <div className="absolute inset-0 z-0">
          <LiquidSliderBg
            src={refArray[activeSlide].desktopPhotoSrc}
            intensity={0.4}
            speed={4}
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
        </div>

        {/* SZÖVEGEK */}
        {refArray.map((ref, index) => {
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
              <div className="absolute top-6 right-6 z-10 text-white text-[25px] flex items-center gap-2 overflow-hidden">
                <span className="ref-title text-[45px] inline-block align-middle [-webkit-text-stroke:1px_white] text-transparent font-bold">
                  {index + 1}
                </span>
                <span>|</span>
                <span className="align-middle">{refArray.length}</span>
              </div>
              <div className="absolute bottom-6 left-6 z-10 text-white">
                <h2 className="ref-title text-2xl font-bold">{ref.title}</h2>
                <div className="ref-details flex gap-4 mt-2 text-neutral-300 flex items-center">
                  <span className="ref-date">{ref.date}</span>
                  <a
                    href={ref.link}
                    target="_blank"
                    className="ref-stack bg-black/70 px-[15px] py-[5px] rounded-full"
                  >
                    Élő oldal
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* GOMBOK */}
        <div className="absolute bottom-6 right-6 flex gap-4 z-20">
          {/* ELŐZŐ GOMB */}
          <div
            onMouseMove={(e) => handleMouseMove(e, setPrevBtnPos)}
            onMouseLeave={() => handleMouseLeave(setPrevBtnPos)}
            className="slider-btn-wrapper p-2"
          >
            <button
              onClick={handlePrev}
              disabled={activeSlide === 0}
              className="slider-btn cursor-pointer px-4 py-2 w-[45px] h-[30px] flex items-center justify-center rounded-md bg-green disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-dark-green transition-transform duration-150 ease-out"
              style={{
                transform: `translate(${prevBtnPos.x}px, ${prevBtnPos.y}px)`,
              }}
            >
              <IoArrowBack />
            </button>
          </div>

          {/* KÖVETKEZŐ GOMB */}
          <div
            onMouseMove={(e) => handleMouseMove(e, setNextBtnPos)}
            onMouseLeave={() => handleMouseLeave(setNextBtnPos)}
            className="slider-btn-wrapper p-2"
          >
            <button
              onClick={handleNext}
              disabled={activeSlide === refArray.length - 1}
              className="slider-btn cursor-pointer px-4 py-2 w-[45px] h-[30px] flex items-center justify-center rounded-md bg-green disabled:opacity-50 disabled:cursor-not-allowed text-white hover:bg-dark-green transition-transform duration-150 ease-out"
              style={{
                transform: `translate(${nextBtnPos.x}px, ${nextBtnPos.y}px)`,
              }}
            >
              <IoArrowForwardOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
