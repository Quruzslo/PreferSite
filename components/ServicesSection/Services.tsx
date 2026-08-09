"use client";
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
  return (
    <div className="relative flex w-full flex-col mt-[50px]">
      {myServices.map((service) => (
        <motion.section
          key={service.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.4, once: false }}
          onViewportEnter={(entry) => {
            if (entry && entry.target) {
              entry.target.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
          className="flex min-h-[max(100dvh,450px)] w-full shrink-0 flex-col justify-center overflow-hidden bg-transparent"
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
            </div>
          </motion.div>
        </motion.section>
      ))}
    </div>
  );
}
