"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ComponentProps,
  ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";

type Phase = "idle" | "cover" | "reveal";

const TransitionContext = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

function scrollToTarget(
  lenis: ReturnType<typeof useLenis>,
  hash: string | null,
  immediate: boolean,
) {
  const el = hash ? document.querySelector<HTMLElement>(hash) : null;
  if (lenis) {
    // Új oldal után a Lenis még a régi oldalmagassággal számolna.
    lenis.resize();
    lenis.scrollTo(el ?? 0, { immediate, force: true });
  } else if (el) {
    el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}

// Oldalváltáskor egy sötét függöny alulról eltakarja az oldalt, közben
// betölt az új oldal, majd a függöny felfelé kicsúszik.
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const pendingRef = useRef<{ href: string; hash: string | null } | null>(
    null,
  );
  const lastPathRef = useRef(pathname);

  const navigate = useCallback(
    (href: string) => {
      if (reduceMotion) {
        router.push(href);
        return;
      }
      const url = new URL(href, window.location.href);
      pendingRef.current = { href, hash: url.hash || null };
      setPhase("cover");
    },
    [reduceMotion, router],
  );

  useEffect(() => {
    if (pathname === lastPathRef.current) return;
    lastPathRef.current = pathname;
    if (!pendingRef.current) return;

    const { hash } = pendingRef.current;
    pendingRef.current = null;
    const frame = requestAnimationFrame(() => {
      scrollToTarget(lenis, hash, true);
      setPhase("reveal");
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, lenis]);

  // Ha a navigáció valamiért elakad, ne maradjon a függöny a képernyőn.
  useEffect(() => {
    if (phase !== "cover") return;
    const timeout = setTimeout(() => {
      pendingRef.current = null;
      setPhase("reveal");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [phase]);

  const handleComplete = () => {
    if (phase === "cover" && pendingRef.current) {
      router.push(pendingRef.current.href, { scroll: false });
    } else if (phase === "reveal") {
      setPhase("idle");
    }
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="curtain"
            aria-hidden
            className="fixed inset-0 z-[1000] flex items-end bg-ink site-gutter pb-6 md:pb-10"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={
              phase === "cover"
                ? { clipPath: "inset(0% 0% 0% 0%)" }
                : { clipPath: "inset(0% 0% 100% 0%)" }
            }
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={handleComplete}
          >
            <span className="type-h2 text-paper">Prefersite</span>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

// A belső linkek ezen keresztül navigálnak, hogy lefusson a függöny.
// Az ugyanazon az oldalon lévő horgonyokhoz (pl. /#arazas) simán görget.
export function TransitionLink({ href, onClick, ...rest }: TransitionLinkProps) {
  const { navigate } = useContext(TransitionContext);
  const pathname = usePathname();
  const lenis = useLenis();

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          rest.target === "_blank"
        ) {
          return;
        }

        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;

        e.preventDefault();
        if (url.pathname === pathname) {
          scrollToTarget(lenis, url.hash || null, false);
          if (url.hash) history.replaceState(null, "", url.hash);
          return;
        }
        navigate(url.pathname + url.search + url.hash);
      }}
    />
  );
}
