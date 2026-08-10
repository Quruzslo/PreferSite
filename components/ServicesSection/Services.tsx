"use client";

import { useRef } from "react";
import myServices from "./MyServices";
import { motion, Variants } from "motion/react";

const servicesVariants: Variants = {
  hidden: { scaleX: 0, opacity: 1 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Services() {
  const isSnapping = useRef(false);

  const handleSnap = (entry: any) => {
    if (isSnapping.current) return;

    if (entry && entry.target) {
      isSnapping.current = true;

      entry.target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        isSnapping.current = false;
      }, 400);
    }
  };

  return (
    <div className="relative flex w-full flex-col mt-[50px]">
      {myServices.map((service) => (
        <motion.section
          key={service.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          onViewportEnter={(entry) => handleSnap(entry)}
          className="flex min-h-[max(100vh,450px)] w-full shrink-0 flex-col justify-center overflow-hidden bg-transparent"
        >
          <motion.div
            variants={servicesVariants}
            style={{ transformOrigin: "left center" }}
            className="bg-dark-color zoldhatteres flex flex-1 w-full flex-col justify-center pt-[110px] pb-[40px] md:pt-0 md:pb-0 will-change-transform"
          >
            <div className="mx-auto w-[90%] max-w-[2560px] px-[10px]">
              <span className="text-[20px] font-semibold uppercase tracking-wider text-green">
                <span className="text-4xl font-extrabold text-transparent [-webkit-text-stroke:1px_#ffffff]">
                  0{service.id + 1}
                </span>{" "}
                . szolgáltatásom
              </span>
              <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
                {service.title}
              </h2>
              <p className="mt-6 text-lg text-white md:text-xl">
                {service.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] mt-[25px] w-fit mr-auto">
                {service.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row nowrap gap-[5px] items-center"
                  >
                    <span className="w-[10px] h-[10px] rounded-full bg-green shrink-0" />
                    <p className="text-neutral-300">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>
      ))}
    </div>
  );
}
