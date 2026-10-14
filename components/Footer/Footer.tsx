"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useLenis } from "lenis/react";
import navItems from "@/lib/navItems";
import { TransitionLink } from "@/lib/site/transition";
import { ArrowIcon } from "@/lib/ui/ArrowButton";

const services = navItems.find((item) => item.items)?.items ?? [];
const pages = navItems.filter((item) => !item.items);

const aiQuestion = encodeURIComponent(
  "Mit tudsz a Prefersite-ról (prefersite.hu)? Milyen webfejlesztési szolgáltatásokat kínál, és mennyibe kerülnek?",
);
const aiLinks = [
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${aiQuestion}` },
  { name: "Claude", href: `https://claude.ai/new?q=${aiQuestion}` },
  {
    name: "Perplexity",
    href: `https://www.perplexity.ai/search?q=${aiQuestion}`,
  },
];

const timeFormat = new Intl.DateTimeFormat("hu-HU", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Budapest",
});

function subscribeToClock(callback: () => void) {
  const interval = setInterval(callback, 15_000);
  return () => clearInterval(interval);
}

// A szerveren nincs óra (null), így nem lesz eltérés a hidratáláskor.
function useBudapestTime() {
  return useSyncExternalStore(
    subscribeToClock,
    () => timeFormat.format(new Date()),
    () => null,
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-stone-light">{title}</p>
      <ul className="flex flex-col gap-1.5">{children}</ul>
    </div>
  );
}

const linkClass = "break-words transition-opacity hover:opacity-60";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const lenis = useLenis();
  const time = useBudapestTime();
  const year = new Date().getFullYear();

  // Görgetéskor a footer tartalma lassabban érkezik, mint az oldal: előcsúszik.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <footer
      ref={ref}
      data-theme="dark"
      className="relative overflow-hidden bg-ink text-paper"
    >
      <motion.div
        style={reduceMotion ? undefined : { y }}
        className="flex min-h-[60svh] flex-col justify-between gap-20 pb-6 pt-24 site-gutter"
      >
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <p className="text-sm text-stone-light">Írj egy e-mailt</p>
            <a
              href="mailto:info@prefersite.hu"
              data-cursor="Írok"
              className="type-h2 w-fit break-all transition-colors hover:text-green"
            >
              info@prefersite.hu
            </a>
            <a href="tel:+36203127968" className={`w-fit text-lg ${linkClass}`}>
              +36 20 312 7968
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-10 lg:col-span-6 lg:col-start-7">
            <FooterColumn title="Oldalak">
              {pages.map((item) => (
                <li key={item.path}>
                  <TransitionLink href={item.path} className={linkClass}>
                    {item.name}
                  </TransitionLink>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn title="Szolgáltatások">
              {services.map((item) => (
                <li key={item.path}>
                  <TransitionLink href={item.path} className={linkClass}>
                    {item.name}
                  </TransitionLink>
                </li>
              ))}
            </FooterColumn>
            <FooterColumn title="Kérdezd az AI-t rólam">
              {aiLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 ${linkClass}`}
                  >
                    {item.name}
                    <ArrowIcon className="size-3.5" />
                  </a>
                </li>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/15 pt-5 text-sm text-stone-light md:flex-row md:items-center md:justify-between">
          <p>© {year} Prefersite. Minden jog fenntartva.</p>
          <TransitionLink href="/adatkezeles" className={linkClass}>
            Adatkezelési tájékoztató
          </TransitionLink>
          <p>
            Helyi idő Kaposváron:{" "}
            <span className="font-mono text-paper">{time ?? "--:--"}</span>
          </p>
          <button
            type="button"
            onClick={() =>
              lenis
                ? lenis.scrollTo(0)
                : window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className={`w-fit text-left text-paper ${linkClass}`}
          >
            Vissza a tetejére ↑
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
