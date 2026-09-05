import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import "../components/header/header.css";
import "../components/hero/stacked.css";

import Header from "@/components/header/Header";
import MouseFollowerElement from "@/lib/mouseFollowerElement";
import ScrollToTop from "@/lib/scrollToTop";
import Footer from "../components/Footer/Footer";
import ScrollContextProvider from "@/lib/ScrollContext";
import CookieBanner from "@/lib/cookies/CookieBanner";

const groteskSans = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.prefersite.hu"),

  title: {
    default: "Egyedi Weboldal, Webshop és CRM Fejlesztés | Prefersite",
    template: "%s | Prefersite",
  },
  description:
    "Egyedi weboldal, webshop és CRM fejlesztés cégeknek és vállalkozóknak. Növelje vállalkozása hatékonyságát modern szoftverekkel! Kérjen egyedi ajánlatot!",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Prefersite | Egyedi Weboldal, Webshop és CRM Fejlesztés",
    description:
      "Egyedi weboldal, webshop és CRM fejlesztés cégeknek és vállalkozóknak. Növelje vállalkozása hatékonyságát modern szoftverekkel! Kérjen egyedi ajánlatot!",
    url: "https://www.prefersite.hu",
    siteName: "Prefersite",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "/references/ref-mockup-nobg.png",
        width: 1200,
        height: 630,
        alt: "Prefersite - Webfejlesztés Vállalkozásoknak. Weboldal, Webshop, CRM és Webapplikáció.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prefersite | Egyedi Weboldal, Webshop és CRM Fejlesztés",
    description:
      "Egyedi weboldal, webshop és CRM fejlesztés cégeknek és vállalkozóknak.",
    images: ["/references/ref-mockup-nobg.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Prefersite",
  url: "https://www.prefersite.hu",
  logo: "https://www.prefersite.hu/icon.png",
  description:
    "Egyedi weboldal, webshop és CRM fejlesztés cégeknek és vállalkozóknak.",
  areaServed: "HU",
  serviceType: [
    "Weboldal fejlesztés Budapest, Kaposvár, Győr",
    "Webshop fejlesztés",
    "CRM rendszerek",
    "Egyedi szoftverfejlesztés",
    "Webapplikáció fejlesztés",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className="h-full w-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${groteskSans.className} min-h-full flex flex-col antialiased relative`}
      >
        <ScrollContextProvider>
          <MouseFollowerElement />
          <ScrollToTop />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </ScrollContextProvider>
      </body>
    </html>
  );
}
