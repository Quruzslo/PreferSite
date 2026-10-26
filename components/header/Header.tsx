"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import logo from "@/public/Prefer-logo.png";
import navItems from "@/lib/navItems";
import { TransitionLink } from "@/lib/site/transition";
import { useSound } from "@/lib/site/sound";
import ArrowButton from "@/lib/ui/ArrowButton";

type Theme = "light" | "dark";

function useThemeUnderHeader(pathname: string) {
  const [theme, setTheme] = useState<Theme>("light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const probe = 36;
    const check = () => {
      let next: Theme = "light";
      document.querySelectorAll<HTMLElement>("[data-theme]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          next = el.dataset.theme as Theme;
        }
      });
      setTheme(next);
      setScrolled(window.scrollY > 24);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

  return { theme, scrolled };
}

function SoundToggle({ theme }: { theme: Theme }) {
  const { enabled, toggle } = useSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Hangok kikapcsolása" : "Hangok bekapcsolása"}
      className={`grid size-[34px] place-items-center rounded-[4px] transition-colors duration-300 ${
        theme === "dark"
          ? "bg-paper/10 text-paper hover:bg-paper/20"
          : "bg-ink/8 text-ink hover:bg-ink/15"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-[18px]"
        aria-hidden
      >
        <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z" />
        {enabled ? (
          <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
        ) : (
          <path d="m16 10 4 4m0-4-4 4" />
        )}
      </svg>
    </button>
  );
}

const services = navItems.find((item) => item.items)?.items ?? [];
const mainLinks = navItems.filter((item) => !item.items);

export default function Header() {
  const pathname = usePathname();
  const { theme, scrolled } = useThemeUnderHeader(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [menuOpen, lenis]);

  const closeMenu = () => {
    lenis?.start();
    setMenuOpen(false);
  };

  // Csúszó háttér
  const indicatorRef = useRef<HTMLLIElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    const el = e.currentTarget;
    if (indicatorRef.current) {
      indicatorRef.current.style.left = `${el.offsetLeft - 10}px`;
      indicatorRef.current.style.width = `${el.offsetWidth + 20}px`;
      indicatorRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    if (indicatorRef.current) {
      indicatorRef.current.style.opacity = "0";
    }
  };

  const textColor = theme === "dark" ? "text-paper" : "text-ink";

  const background = !scrolled
    ? "bg-transparent"
    : theme === "dark"
      ? "bg-ink/80 backdrop-blur-md"
      : "bg-paper/80 backdrop-blur-md";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 grid grid-cols-[1fr_auto] items-center gap-4 pb-3 pt-4 transition-colors duration-300 site-gutter lg:grid-cols-[1fr_auto_1fr] ${textColor} ${background}`}
      >
        <TransitionLink
          href="/"
          className="flex w-fit min-w-0 items-center gap-2.5"
          aria-label="Prefersite főoldal"
        >
          <span className="grid size-[34px] place-items-center rounded-[4px] bg-ink">
            <Image
              src={logo}
              alt=""
              width={18}
              height={24}
              priority
              className="h-6 w-auto"
            />
          </span>
          <span className="text-lg font-bold tracking-[-0.02em]">
            Prefersite
          </span>
        </TransitionLink>

        <nav aria-label="Főmenü" className="hidden lg:block">
          <ul
            className="relative flex items-center gap-6 text-[0.95rem] font-medium"
            onMouseLeave={handleMouseLeave}
          >
            {/* Csúszó elem */}
            <li
              ref={indicatorRef}
              aria-hidden
              className="pointer-events-none absolute top-1/2 h-full -translate-y-1/2 rounded-full bg-green opacity-0 transition-all duration-300 ease-out"
            />
            <li className="group relative z-10" onMouseEnter={handleMouseEnter}>
              <TransitionLink
                href="/#szolgaltatasok"
                className="flex items-center gap-1 py-2 transition-colors group-hover:text-ink"
              >
                Szolgáltatások
                <svg
                  viewBox="0 0 24 24"
                  className="size-3.5 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </TransitionLink>
              <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-300 ease-out-expo group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ">
                <ul className="flex flex-col rounded-[4px] bg-ink p-1.5 text-paper">
                  {services.map((s) => (
                    <li key={s.path}>
                      <TransitionLink
                        href={s.path}
                        className="block rounded-[3px] px-3 py-2 transition-colors hover:bg-paper/10"
                      >
                        {s.name}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {mainLinks
              .filter((item) => item.path !== "/kapcsolat")
              .map((item) => (
                <li
                  key={item.path}
                  className="relative z-10"
                  onMouseEnter={handleMouseEnter}
                >
                  <TransitionLink
                    href={item.path}
                    className="block py-2 transition-colors hover:text-ink"
                  >
                    {item.name}
                  </TransitionLink>
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <SoundToggle theme={theme} />
          <div className="hidden sm:block">
            <ArrowButton href="/kapcsolat" variant="green">
              Ajánlatkérés
            </ArrowButton>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`h-[34px] rounded-[4px] px-3.5 text-[0.95rem] font-medium lg:hidden ${
              theme === "dark" ? "bg-paper text-ink" : "bg-ink text-paper"
            }`}
          >
            Menü
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            data-lenis-prevent
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink pb-8 pt-4 text-paper site-gutter lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold tracking-[-0.02em]">
                Prefersite
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="h-[34px] rounded-[4px] bg-paper px-3.5 text-[0.95rem] font-medium text-ink"
              >
                Bezárás
              </button>
            </div>

            <nav aria-label="Mobil menü" className="mt-12 flex flex-col gap-10">
              <div>
                <p className="mb-3 text-sm text-stone-light">Szolgáltatások</p>
                <ul className="flex flex-col gap-1">
                  {services.map((s) => (
                    <li key={s.path}>
                      <TransitionLink
                        href={s.path}
                        onClick={closeMenu}
                        className="type-h3"
                      >
                        {s.name}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </div>
              <ul className="flex flex-col gap-1">
                {mainLinks.map((item) => (
                  <li key={item.path}>
                    <TransitionLink
                      href={item.path}
                      onClick={closeMenu}
                      className="type-h3"
                    >
                      {item.name}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
