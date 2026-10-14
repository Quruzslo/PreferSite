"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import myServices from "./MyServices";
import ArrowButton from "@/lib/ui/ArrowButton";
import { TransitionLink } from "@/lib/site/transition";

// A MyServices.js "path" mezője és a szolgáltatás-oldalak slugja eltér, ezért itt párosítjuk őket.
const serviceMeta: Record<string, { slug: string; name: string }> = {
  webapp: { slug: "webapplikacio", name: "Webapplikáció" },
  webshop: { slug: "webshop", name: "Webshop" },
  crm: { slug: "crm", name: "CRM rendszer" },
  weboldal: { slug: "weboldal", name: "Weboldal" },
  karbantartas: { slug: "karbantartas", name: "Karbantartás" },
};

const items = myServices.map((s) => ({
  ...s,
  ...serviceMeta[s.path],
  href: `/szolgaltatasok/${serviceMeta[s.path].slug}`,
}));

export default function Services() {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section
      id="szolgaltatasok"
      data-theme="dark"
      className="bg-ink py-24 text-paper site-gutter md:py-36"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-28 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-green" aria-hidden />
              <h2 className="type-lead">Miben segíthetek?</h2>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.path}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6"
              >
                <p className="max-w-[40ch] text-stone-light">
                  {current.description}
                </p>
                <ArrowButton href={current.href} variant="paper">
                  {current.name} részletei
                </ArrowButton>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <span className="size-2.5 rounded-full bg-green" aria-hidden />
          <h2 className="type-lead">Miben segíthetek?</h2>
        </div>

        <ul className="flex flex-col lg:col-span-8">
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <motion.li
                key={item.path}
                onViewportEnter={() => setActive(i)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="border-b border-paper/10 py-4 first:pt-0 lg:border-none lg:py-1"
              >
                <TransitionLink
                  href={item.href}
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`type-h1 flex items-center gap-4 transition-colors duration-500 ${
                    isActive ? "text-paper" : "text-paper/25"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`size-3 shrink-0 rounded-full bg-green transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {item.name}
                </TransitionLink>
                <p className="mt-3 max-w-[40ch] text-stone-light lg:hidden">
                  {item.description}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
