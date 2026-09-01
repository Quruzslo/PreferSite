"use client";

import { useRef } from "react";
import Section from "../../lib/section";
import { benefits } from "./benefits";
import { motion, useScroll, useTransform } from "motion/react";

const BenefitCard = ({ benefit }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "80% end"],
  });

  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(8px)", "blur(0px)"],
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        filter,
        opacity,
        willChange: "filter, opacity",
      }}
      className="flex flex-col gap-4 benefit-card relative p-[10px] bg-dark-color rounded-[19px] text-white"
    >
      <span className="w-fit benefit-badge rounded-[11px] bg-green px-3 py-1 text-[20px] font-black uppercase text-white ">
        {benefit.badge}
      </span>
      <h3 className="text-xl font-bold bg-white ml-[-10px] my-[15px] w-fit text-dark-color rounded-tr-[20px] rounded-br-[20px] pr-[5px] py-[15px] benefit-title relative">
        {benefit.title}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-100">
        {benefit.description}
      </p>
    </motion.div>
  );
};

export default function BenefitSection() {
  return (
    <Section className="flex flex-col gap-[40px] py-[50px]">
      <h2 className="text-center text-3xl font-bold md:text-4xl my-[35px]">
        Ezért érdemes az egyedi fejlesztés mellett dönteni
      </h2>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 xl:grid-cols-3">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </Section>
  );
}
