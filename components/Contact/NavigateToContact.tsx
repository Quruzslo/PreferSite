"use client";
import Referencies from "../../lib/referencies/referencies";
import { motion, Variants } from "motion/react";
import ContactButton from "@/lib/ContactButton";

export default function NavigateToContact() {
  const contactPrios = [
    "Minőségi termékre",
    "Céges imázs növelésre",
    "Hatékony munkaeszközre",
    "Stabil partneri viszonyra",
    "Kiszámítható működésre",
    "Bevétel növelésre",
  ];

  const wrapperVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const containerVariant: Variants = {
    hidden: {
      clipPath: "inset(0% 100% 0% 0%)",
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.5,
        ease: [0.95, 0, 0.35, 1],
        delay: 0.4,
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.95, 0, 0.35, 1],
      },
    },
  };

  const shortLineVariants: Variants = {
    hidden: { clipPath: "inset(0% 100% 0% 0%)" },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.15,
        ease: "linear",
        delay: 0.6,
      },
    },
  };

  const longLineVariants: Variants = {
    hidden: { clipPath: "inset(0% 100% 0% 0%)" },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration: 0.25,
        ease: "easeOut",
        delay: 0.8,
      },
    },
  };

  return (
    <section
      id="referenciak"
      className="flex w-full bg-neutral-100 mx-auto py-[50px] px-[10px] my-[50px]"
    >
      <div className="flex-col flex md:flex-row gap-[25px] w-[90%] max-w-[2560px] mx-auto">
        <div className="flex flex-col gap-[20px] w-full md:w-1/2">
          <h2 className=" uppercase font-black md:!text-[65px] bg-clip-text text-transparent bg-gradient-to-r from-green to-violet-600 text-shadow-md">
            Ha szükséged van
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] w-full mx-auto">
            {contactPrios.map((prio, _) => (
              <div
                key={prio}
                className="relative flex items-stretch h-full w-full  "
              >
                <motion.div
                  initial="hidden"
                  variants={wrapperVariants}
                  whileInView="visible"
                  viewport={{ margin: "-10% 0px -10% 0px", once: false }}
                  className="relative flex items-center w-full"
                >
                  {/* Balról jobbra kitöltő zöld háttér */}
                  <motion.div
                    variants={containerVariant}
                    className="bg-green rounded-full p-[10px] w-full md:w-full flex flex-row items-center gap-[10px]"
                  >
                    {/* Ikon konténer */}
                    <motion.div
                      variants={iconVariants}
                      className="flex items-center justify-center p-[5px] z-20 w-fit rounded-full bg-white"
                    >
                      <motion.div className="relative w-[30px] h-[30px]">
                        <motion.div
                          variants={shortLineVariants}
                          className="absolute h-[4px] w-[12px] bg-green rotate-[45deg] left-[4px] top-[16px] rounded-full"
                        />
                        <motion.div
                          variants={longLineVariants}
                          className="absolute h-[4px] w-[22px] bg-green rotate-[-50deg] left-[10px] top-[12px] rounded-full"
                        />
                      </motion.div>
                    </motion.div>

                    <p className="text-white">{prio}</p>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
          <ContactButton
            path={"/kapcsolat"}
            title={"Beszéljünk!"}
            wrapperClass={
              "bg-dark-color rounded-full w-fit p-[15px] items-center justify-center flex flex-row nowrap"
            }
            titleClass={"text-white bg-dark-color z-2 w-fit"}
            decorClass="border-white bg-white"
          ></ContactButton>
        </div>
        <div className="flex flex-col gap-[20px] w-full md:w-1/2">
          <h2 className="font-bold ">Néhány korábbi projektem</h2>
          <Referencies></Referencies>
        </div>
      </div>
    </section>
  );
}
