"use client";

import Image from "next/image";
import { useState } from "react";
import refArray from "@/lib/referencies/refs";
import { ArrowIcon } from "@/lib/ui/ArrowButton";

type Reference = (typeof refArray)[number];

function ReferenceItem({ item }: { item: Reference }) {
  return (
    <li className="grid gap-5 md:grid-cols-12 md:gap-x-8">
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Megnézem"
        aria-label={`${item.title} weboldal megnyitása új lapon`}
        className="group relative block aspect-[16/10] overflow-hidden  bg-transparent md:col-span-8 "
      >
        <Image
          src={item.desktopPhotoSrc}
          alt={`${item.title} weboldal`}
          fill
          sizes="(min-width: 1024px) 50vw, (min-width: 768px) 66vw, 100vw"
          className="object-contain object-center  transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] "
        />
      </a>
      <div className="flex flex-col gap-3 md:col-span-4">
        <p className="flex items-center gap-2 font-mono text-[0.8rem]">
          <span className="rounded-[3px] border border-ink/25 px-1.5 py-0.5">
            {item.stack}
          </span>
          <span className="text-stone">{item.date}</span>
        </p>
        <h3 className="type-h3">{item.title}</h3>
        <p className="max-w-[44ch] text-stone">{item.description}</p>
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex w-fit items-center gap-1.5 font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
        >
          Oldal megnyitása
          <ArrowIcon className="size-4" />
        </a>
      </div>
    </li>
  );
}

export default function References({
  title = "Referenciák",
  initial = 5,
}: {
  title?: string;
  initial?: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? refArray : refArray.slice(0, initial);
  const hasMore = refArray.length > initial;

  return (
    <section
      id="referenciak"
      data-theme="light"
      className="grain bg-paper py-24 site-gutter md:py-36"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2.5 lg:sticky lg:top-28">
            <span className="size-2.5 rounded-full bg-green" aria-hidden />
            <h2 className="type-lead">{title}</h2>
          </div>
        </div>
        <ul className="flex flex-col gap-16 md:gap-24 lg:col-span-9">
          {visible.map((item) => (
            <ReferenceItem key={item.id} item={item} />
          ))}
        </ul>
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="group mt-20 grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-t border-ink/20 pt-5 text-left sm:gap-6 lg:grid-cols-12 lg:gap-x-8"
        >
          <span className="type-h2 lg:col-span-3">{refArray.length}</span>
          <span className="type-h2 transition-opacity group-hover:opacity-60 lg:col-span-7">
            {showAll ? "Kevesebb referencia" : "Összes referencia"}
          </span>
          <span className="type-h2 justify-self-end lg:col-span-2">
            {showAll ? "(−)" : "(+)"}
          </span>
        </button>
      )}
    </section>
  );
}
