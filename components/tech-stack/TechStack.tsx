"use client";
import Section from "@/lib/section";
import techStack from "./stack";
import Image from "next/image";
import { motion } from "motion/react";

export default function TechStack() {
  const techVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    transition: { duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <Section className="flex flex-col my-[50px] ">
      <h2 className="text-center text-3xl font-bold md:text-4xl my-[35px]">
        Eszközök, amikkel dolgozom
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {techStack.map((stack) => (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.6, once: false }}
            variants={techVariants}
            key={stack.name}
            className="flex flex-col items-center gap-3"
          >
            <Image
              title={stack.name}
              src={stack.img}
              alt={stack.name}
              width={100}
              height={100}
              className="w-[75px] h-[75px] md:w-[100px] md:h-[100px]"
            />
            {/* <p>{stack.name}</p> */}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
