"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
  ReactNode,
} from "react";

type SoundKind = "hover" | "click";

interface SoundContextType {
  enabled: boolean;
  toggle: () => void;
}

const SoundContext = createContext<SoundContextType>({
  enabled: false,
  toggle: () => {},
});

const STORAGE_KEY = "prefer-sound";

// A hangbeállítás a localStorage-ban él. Ha a böngésző tiltja a tárolást,
// a memóriában tartott érték alapján működik tovább.
const listeners = new Set<() => void>();
let memoryValue: boolean | null = null;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  if (memoryValue !== null) return memoryValue;
  try {
    return localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function setStored(value: boolean) {
  memoryValue = value;
  try {
    localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
  } catch {}
  listeners.forEach((listener) => listener());
}

// A hangokat a böngésző generálja (Web Audio), így nincs letöltendő hangfájl.
function playTone(ctx: AudioContext, kind: SoundKind) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  if (kind === "click") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.08);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.09, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
  } else {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(1400, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.025, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
  }

  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.12);
}

export function SoundProvider({ children }: { children: ReactNode }) {
  // Alapból némítva: hang csak a látogató kifejezett kérésére szól.
  const enabled = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const ctxRef = useRef<AudioContext | null>(null);
  const lastHoverRef = useRef<Element | null>(null);

  const play = useCallback((kind: SoundKind) => {
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    playTone(ctx, kind);
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    setStored(next);
    if (next) play("click");
  }, [enabled, play]);

  // Egy helyen figyeljük az összes linket és gombot, így minden elem hangot ad.
  useEffect(() => {
    if (!enabled) return;

    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element).closest("a, button");
      if (el && el !== lastHoverRef.current) play("hover");
      lastHoverRef.current = el;
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, summary")) play("click");
    };

    document.addEventListener("pointerover", onOver);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("click", onClick, true);
    };
  }, [enabled, play]);

  return (
    <SoundContext.Provider value={{ enabled, toggle }}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => useContext(SoundContext);
