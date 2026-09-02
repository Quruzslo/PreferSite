"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = document.cookie.includes("cookie-consent=true");
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    document.cookie =
      "cookie-consent=true; max-age=31536000; path=/; SameSite=Lax";
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed flex flex-row bottom-[15px] left-[15px] bg-white text-dark-color/70 p-4 rounded-md z-50 flex gap-4 items-center w-fit shadow-[0px_5px_10px_0px_rgba(0,0,0,0.6)] ">
      <p className="font-bold">Az oldal csak szükséges sütiket használ.</p>
      <button
        onClick={handleAccept}
        className="bg-dark-green text-white px-4 py-2 rounded-full text-sm font-bold"
      >
        Elfogadom
      </button>
    </div>
  );
}
