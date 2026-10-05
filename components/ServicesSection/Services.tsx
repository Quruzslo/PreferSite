"use client";

import { useRef } from "react";
import myServices from "./MyServices";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import { ScrollContext } from "@/lib/ScrollContext";

const servicesVariants: Variants = {
  hidden: {
    clipPath: "inset(50% 50% 50% 50% round 50%)",
    opacity: 1,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 0px)",
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function ServiceCard({ service }: { service: (typeof myServices)[0] }) {
  // const { isScrolling } = useContext(ScrollContext)!;

  // const isSnapping = useRef(false);

  // const handleSnap = (entry: any) => {

  //   if (isScrolling || isSnapping.current) return;

  //   if (isSnapping.current) return;

  //   if (entry && entry.target) {

  //     isSnapping.current = true;

  //     entry.target.scrollIntoView({

  //       behavior: "smooth",

  //       block: "start",

  //     });

  //     setTimeout(() => {

  //       isSnapping.current = false;

  //     }, 400);

  //   }

  // };

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });

  return (
    <section
      ref={ref}
      id={service.path}
      // onViewportEnter={(entry) => handleSnap(entry)}
      className="flex min-h-[max(100vh,450px)] w-full shrink-0 flex-col justify-center overflow-hidden bg-transparent"
    >
      <motion.div
        variants={servicesVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ willChange: "clip-path" }}
        className="bg-dark-color zoldhatteres flex flex-1 w-full flex-col justify-center pt-[110px] pb-[40px] md:pt-0 md:pb-0"
      >
        <div className="mx-auto w-[90%] max-w-[2560px] px-[10px] flex flex-col md:flex-row gap-[20px]">
          {/* bal oldal --- */}
          <div className="service-left flex flex-col w-full md:w-1/2 py-[20px]">
            <span className="text-[20px] font-semibold tracking-wider text-green">
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

          <div className="service-left relative w-full md:w-1/2 min-h-[300px] md:min-h-[400px]">
            <Image
              src={service.img}
              alt={service.title}
              fill
              className="object-contain w-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function Services() {
  return (
    <div
      id="szolgaltatas"
      className="relative flex w-full flex-col my-[35px] gap-0"
    >
      {myServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
