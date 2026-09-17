"use client";

// import { useRef } from "react";
import Section from "../../lib/section";
import { benefits } from "./benefits";
// import { motion, useTransform, useMotionValue, useSpring } from "motion/react";

export const BenefitCard = ({ benefit }) => {
  return (
    <div className="benefit-parent !w-full h-full">
      <div className="benefit-card !w-full h-full flex flex-col">
        {benefit.badge && (
          <div className="benefit-date-box w-fit">
            <span className="benefit-badge !text-white">{benefit.badge}</span>
          </div>
        )}

        <div className="benefit-content-box flex-1 flex flex-col">
          <h3 className="benefit-title">{benefit.title}</h3>
          <p className="benefit-content mb-[25px]">{benefit.description}</p>

          <a
            href="/kapcsolat"
            className="benefit-see-more !text-white !mt-auto w-fit"
          >
            Részletek
          </a>
        </div>
      </div>
    </div>
  );
};
export default function BenefitSection() {
  return (
    <Section className="flex flex-col gap-[40px] my-[35px]">
      <h2 className="text-center text-3xl font-bold md:text-4xl my-[35px]">
        Az egyedi fejlesztés mellett szól
      </h2>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 xl:grid-cols-3 ">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </Section>
  );
}
