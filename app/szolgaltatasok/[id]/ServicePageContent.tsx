"use client";

import Link from "next/link";
import { motion, Variants } from "motion/react";
import { FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import Referencies from "./Referencies";

interface ServiceData {
  hero: { title: string; subtitle: string; ctaText: string };
  importance: { title: string; items: string[] };
  benefits: {
    title: string;
    description: string;
    stats: { number: string; title: string; text: string }[];
  };
  midCta: {
    title: string;
    subtitle: string;
    question: string;
    ctaText: string;
  };
  features: { title: string; items: { title: string; text: string }[] };
  footerCta: { title: string; subtitle: string };
}

const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 1 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.94,
    filter: "blur(6px)",
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
      delay: i * 0.07,
    },
  }),
};

function SectionRule() {
  return (
    <motion.span
      variants={lineVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      style={{ transformOrigin: "left center" }}
      className="mb-6 block h-[5px] w-full rounded-full bg-green shadow-xl"
    />
  );
}

function CtaButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  const styles =
    variant === "solid"
      ? "bg-green text-white hover:shadow-lg hover:shadow-green/20"
      : "bg-white text-dark-green hover:bg-white/90";

  const className = `group relative inline-flex items-center gap-3 rounded-full py-4 pl-8 pr-6 font-semibold transition-all duration-300 ${styles}`;

  const content = (
    <>
      <span>{children}</span>
      <span className="flex w-0 items-center justify-center overflow-hidden opacity-0 -translate-x-2 transition-all duration-300 ease-in-out group-hover:w-6 group-hover:translate-x-0 group-hover:opacity-100">
        <MdArrowForward size={20} />
      </span>
    </>
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export default function ServicePageContent({
  service,
}: {
  service: ServiceData;
}) {
  return (
    <section className="min-h-screen bg-white pb-20 text-dark-color">
      {/* Hero */}
      <section className="zoldhatteres relative overflow-hidden bg-dark-color px-6 py-24 text-white md:py-32 w-[90%] mx-auto rounded-xl mt-[120px] shadow-[0_0_10px_0px_rgba(0_0_0_0.6)] ">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex select-none items-center overflow-hidden"
        >
          <span className="-translate-y-2 whitespace-nowrap text-[16vw] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)]">
            {service.hero.title}
          </span>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/#szolgaltatas"
            className="group mb-10 inline-flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-white"
          >
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            Vissza a szolgáltatásokhoz
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 55 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <h1 className="mb-6 text-3xl font-bold leading-tight md:text-5xl">
              {service.hero.title}
            </h1>
            <p className="mb-10 text-lg leading-relaxed text-white md:text-xl">
              {service.hero.subtitle}
            </p>
            <CtaButton href="#kapcsolat">{service.hero.ctaText}</CtaButton>
          </motion.div>
        </div>
      </section>

      {/* Miért */}
      <section className="border-b border-gray-100 px-6 py-20">
        <div className="mx-auto w-[90%]">
          <div className=" flex flex-col w-fit">
            <SectionRule />
            <h2 className="mb-10 max-w-2xl text-2xl font-bold md:text-3xl">
              {service.importance.title}
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {service.importance.items.map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-colors hover:border-green/30"
              >
                <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                <p className="text-sm font-medium text-dark-color">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ELŐNYÖK  */}
      <section className="bg-gray-50/50 px-6 py-20">
        <div className="mx-auto w-[90%]">
          <div className="mb-16 w-fit">
            <SectionRule />
            <h2 className="mb-4 text-3xl font-bold">
              {service.benefits.title}
            </h2>
            <p className="text-lg text-gray-600">
              {service.benefits.description}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {service.benefits.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
              >
                <div
                  className="absolute bottom-0 left-0 h-2/3 w-full translate-y-[55%] rounded-3xl bg-green/10 transition-all duration-500 group-hover:translate-y-[35%] group-hover:bg-green/20"
                  style={{ transform: "skew(0, 8deg)" }}
                />
                <div className="relative">
                  <div className="mb-4 text-4xl font-extrabold text-green lg:text-5xl">
                    {stat.number}
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{stat.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {stat.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KÖZÉPSŐ CTA */}
      <section className="zoldhatteres bg-dark-green px-6 py-20 text-center text-white">
        <div className="mx-auto w-[90%]">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            {service.midCta.title}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white">
            {service.midCta.subtitle}
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <p className="mb-6 text-xl font-semibold text-white">
              {service.midCta.question}
            </p>
            <CtaButton href="/#kapcsolat">{service.midCta.ctaText}</CtaButton>
          </div>
        </div>
      </section>

      {/*  FUNKCIÓK */}
      <section className="px-6 py-20">
        <div className="mx-auto w-[90%]">
          <div className="mb-12 w-fit">
            <SectionRule />
            <h2 className="text-3xl font-bold">{service.features.title}</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {service.features.items.map((feature, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="benefit-card  bg-white p-8  relative"
              >
                <h3 className="mb-3 text-xl font-bold text-dark-color">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Referencies></Referencies>

      {/* Utolsó CTA  */}
      <section id="kapcsolat" className="mx-auto mt-10 max-w-6xl px-6">
        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 text-center md:p-14">
          <h2 className="mb-4 text-2xl font-bold md:text-4xl">
            {service.footerCta.title}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 md:text-xl">
            {service.footerCta.subtitle}
          </p>
          <CtaButton href="/kapcsolat">Ingyenes konzultációt kérek</CtaButton>
        </div>
      </section>
    </section>
  );
}
