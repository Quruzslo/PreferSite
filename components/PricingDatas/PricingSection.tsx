"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import pricingData, { PricingItem } from "./pricing";
import RevealText from "@/lib/ui/RevealText";
import ArrowButton from "@/lib/ui/ArrowButton";

function PricingRow({ item }: { item: PricingItem }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const tag = item.mostPopular ? "Legnépszerűbb" : item.popular ? "Népszerű" : null;

  return (
    <li className="border-t border-ink/20">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 py-6 text-left sm:gap-x-6 lg:grid-cols-12 lg:gap-x-8 lg:py-8"
      >
        <span className="flex min-w-0 flex-col gap-2 lg:col-span-4">
          <span className="type-h3">{item.title}</span>
          {tag && (
            <span className="w-fit rounded-[3px] bg-green px-1.5 py-0.5 text-[0.8rem] font-medium text-ink">
              {tag}
            </span>
          )}
        </span>
        <span className="col-start-1 row-start-2 font-mono text-lg lg:col-span-3 lg:col-start-5 lg:row-start-1 lg:pt-1">
          {item.price}
        </span>
        <span className="col-span-2 max-w-[48ch] text-stone lg:col-span-4 lg:col-start-8">
          {item.description}
        </span>
        <span
          aria-hidden
          className="col-start-2 row-start-1 grid size-9 place-items-center justify-self-end rounded-[4px] bg-ink/8 transition-colors group-hover:bg-ink group-hover:text-paper lg:col-span-1 lg:col-start-12"
        >
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-4"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M12 5v14M5 12h14" />
          </motion.svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-10 lg:grid-cols-12 lg:gap-x-8">
              <p className="lg:col-span-4">
                <span className="mb-1 block text-sm text-stone">Kinek ajánlom?</span>
                {item.useCase}
              </p>
              <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:col-span-7 lg:col-start-5">
                {item.attributes.map((attr) => (
                  <li key={attr} className="flex gap-2.5">
                    <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-ink" />
                    {attr.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function PricingSection() {
  return (
    <section
      id="arazas"
      data-theme="light"
      className="grain bg-paper py-24 site-gutter md:py-36"
    >
      <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:gap-x-8">
        <RevealText
          as="h2"
          inView
          text="Átlátható árak, rejtett költségek nélkül"
          className="type-h2 max-w-[16ch] lg:col-span-7"
        />
        <div className="flex flex-col gap-5 self-end lg:col-span-4 lg:col-start-9">
          <p className="text-stone">
            Az árak kiinduló árak. A pontos összeget az igényfelmérés után,
            írásos árajánlatban kapod meg.
          </p>
          <ArrowButton href="/kapcsolat" variant="ink">
            Árajánlatot kérek
          </ArrowButton>
        </div>
      </div>

      <ul className="border-b border-ink/20">
        {pricingData.map((item) => (
          <PricingRow key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
