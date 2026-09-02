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

const groteskSans = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prefersite.hu"),

  title: "Prefersite | Weboldal, Webshop és CRM Fejlesztés Vállalkozásoknak",
  description:
    "Egyedi weboldal, webshop és CRM fejlesztés cégeknek és vállalkozóknak. Növelje vállalkozása hatékonyságát modern szoftverekkel! Kérjen egyedi ajánlatot!",

  openGraph: {
    title:
      "Prefersite | Egyedi Weboldal, Webshop és CRM Fejlesztés Vállalkozásoknak",
    description:
      "Egyedi weboldal, webshop és CRM fejlesztés cégeknek és vállalkozóknak. Növelje vállalkozása hatékonyságát modern szoftverekkel! Kérjen egyedi ajánlatot!",
    url: "https://prefersite.hu",
    siteName: "Prefersite",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "/references/ref-mockup-nobg.png",
        width: 1200,
        height: 630,
        alt: "Prefersite - Webfejlesztés Vállalkozásoknak. Weboldal, Webshop, CRM, Admin rendszer és Webapplikáció.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" className="h-full w-full">
      <body
        className={`${groteskSans.className} min-h-full flex flex-col antialiased relative`}
      >
        <ScrollContextProvider>
          <MouseFollowerElement />
          <ScrollToTop />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ScrollContextProvider>
      </body>
    </html>
  );
}
