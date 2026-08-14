import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import "../components/header/header.css";
import Header from "@/components/header/Header";
import MouseFollowerElement from "@/lib/mouseFollowerElement";
import ScrollToTop from "@/lib/scrollToTop";
import Footer from "../components/Footer/Footer";
import ScrollContextProvider from "@/lib/ScrollContext";

const groteskSans = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata = {
  title: "Prefer Site",
  description:
    "Egyedi webalkalmazás, weboldal, webshop, CRM rendszer fejlesztés.",
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
