"use client";
import myServices from "./MyServices";
import { motion, Variants } from "motion/react";
import { useRef } from "react";

const servicesVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 1,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Services() {
  // ref a külső konténernek
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    // viewport figyelő konti
    <motion.div
      ref={containerRef}
      // Behúzza az elem tetejéhez a viewportot
      onViewportEnter={() => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
      viewport={{ amount: 0.1 }}
      className="relative scroll-snap-wrapper flex h-[100dvh] w-full flex-col overflow-y-auto snap-y snap-mandatory scroll-smooth mt-[50px]"
    >
      {myServices.map((service) => (
        <motion.section
          key={service.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: false }}
          className="flex min-h-[max(100dvh,450px)] h-auto w-full shrink-0 snap-start flex-col justify-center overflow-hidden bg-transparent snap-always"
        >
          <motion.div
            variants={servicesVariants}
            style={{ transformOrigin: "left center" }}
            className="bg-dark-color flex flex-1 w-full flex-col justify-center pt-[110px] pb-[40px] md:pt-0 md:pb-0"
          >
            <div className="mx-auto w-[90%] max-w-[2560px] px-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-green-500">
                <span className="text-4xl font-extrabold text-transparent [-webkit-text-stroke:1px_#ffffff]">
                  0{service.id + 1}
                </span>{" "}
                . szolgáltatásom
              </span>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
                {service.title}
              </h2>
              <p className="mt-6 text-lg text-neutral-600 dark:text-neutral-400 md:text-xl">
                {service.description}
              </p>

              <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300 md:text-base"
                  >
                    <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>
      ))}
    </motion.div>
  );
}
