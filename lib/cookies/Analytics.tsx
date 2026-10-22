"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { getConsent, subscribeConsent } from "./consent";

const GA_ID = "G-CM6Z8D9ZWN";

export default function Analytics() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsent,
    () => null,
  );

  if (consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
