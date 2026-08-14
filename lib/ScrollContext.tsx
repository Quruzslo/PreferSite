"use client";

import { createContext, useState, useCallback, ReactNode } from "react";

interface ScrollContextType {
  isScrolling: boolean;
  triggerIsScrolling: (durationMs?: number) => void;
}

export const ScrollContext = createContext<ScrollContextType | null>(null);

export default function ScrollContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isScrolling, setIsScrolling] = useState(false);

  const triggerIsScrolling = useCallback((durationMs = 1500) => {
    setIsScrolling(true);

    setTimeout(() => {
      setIsScrolling(false);
    }, durationMs);
  }, []);

  return (
    <ScrollContext.Provider value={{ isScrolling, triggerIsScrolling }}>
      {children}
    </ScrollContext.Provider>
  );
}
