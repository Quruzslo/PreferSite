"use client";
import { RxCookie } from "react-icons/rx";

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
    <div className="fixed flex flex-col flex-wrap bottom-[15px] left-[15px] bg-dark-color/50 backdrop-blur-md text-white p-4 rounded-md z-50 flex gap-[15px] items-center mx-auto justify-between w-[90%] md:w-fit shadow-[0px_5px_10px_0px_rgba(0,0,0,0.6)] ">
      <RxCookie
        size={45}
        className="mr-auto border-2 border-white rounded-full p-[5px] "
      />
      <p className="font-bold text-[12px] md:text-[15px]">
        Az oldal kizárólag szükséges sütiket használ.
      </p>
      <button
        onClick={handleAccept}
        className="bg-dark-green text-white px-4 py-2 rounded-full text-sm font-bold"
      >
        Elfogadom
      </button>
    </div>
  );
}
