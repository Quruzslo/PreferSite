import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import "../components/header/header.css";
import Header from "@/components/header/Header";
import Image from "next/image";
import MouseFollowerElement from "@/lib/mouseFollowerElement";

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
        <MouseFollowerElement />
        <Image
          src="/noisy.svg"
          alt=""
          fill
          priority
          className="object-cover -z-10 pointer-events-none w-full h-full fixed top-0 left-0"
        />
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
