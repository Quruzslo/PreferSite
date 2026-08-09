"use client";
import myServices from "./MyServices";
import { motion, Variants } from "motion/react";

// A te tökéletes animációd maradt!
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
  return (
    <div className="relative flex w-full flex-col">
      {myServices.map((service) => (
        <motion.section
          key={service.id}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          className="flex flex-col justify-center bg-transparent overflow-hidden"
        >
          <motion.div
            variants={servicesVariants}
            style={{ transformOrigin: "left center" }}
            className="bg-dark-color min-h-screen w-full flex flex-col justify-center"
          >
            <div className="mx-auto max-w-5xl px-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-green-500 ">
                0{service.id + 1} // Szolgáltatás
              </span>
              <h2 className="mt-2 text-3xl font-bold md:text-5xl lg:text-6xl text-white">
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
    </div>
  );
}
