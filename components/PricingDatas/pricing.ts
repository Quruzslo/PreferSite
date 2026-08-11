export interface PricingItem {
  id: string;
  title: string;
  price: string;
  description: string;
  useCase: string;
  attributes: string[];
  mostPopular?: boolean;
  popular?: boolean;
}

const pricingData: PricingItem[] = [
  {
    id: "landing",
    title: "Landing oldal",
    price: "180 000 Ft-tól",
    description: "Egyetlen célra fókuszáló, magas konverziójú bemutató oldal.",
    useCase:
      "Hirdetési kampányokhoz, 1 konkrét termék vagy szolgáltatás gyors piacra dobásához és iratkozók/lead-ek gyűjtéséhez.",
    attributes: [
      "Egy oldalas, letisztult struktúra",
      "1 konkrét termékre/szolgáltatásra fókuszál",
      "Látványos Framer Motion animációk",
      "Interaktív görgetési effektek",
      "Mobil-first, villámgyors betöltés",
      "Kontakt űrlap és ReCAPTCHA védelem",
    ],
  },
  {
    id: "website",
    title: "Céges Weboldal",
    price: "350 000 Ft-tól",
    description:
      "Többoldalas, professzionális digitális névjegykártya a vállalkozásodnak.",
    useCase:
      "Céges márkaépítéshez, szolgáltatások részletes bemutatásához, bizalomépítéshez és Google keresőből érkező ügyfélszerzéshez.",
    mostPopular: true,
    attributes: [
      "Többoldalas szerkezet (Rólunk, Szolgáltatások, Karrier stb.)",
      "Egyedi, márkára szabott UI/UX design",
      "Keresőoptimalizált (SEO) felépítés",
      "Dinamikus tartalomkezelő (Blog / Hírek)",
      "GDPR konformitás és Süti kezelés",
      "Domain és Céges e-mail beállítás",
    ],
  },
  {
    id: "webshop",
    title: "Webáruház (Webshop)",
    price: "650 000 Ft-tól",
    description:
      "Teljesen automatizált online shop, ahol 24/7 értékesítheted a termékeidet.",
    useCase:
      "Fizikai vagy digitális termékek értékesítéséhez, automatizált számlázással és fizetéssel.",
    attributes: [
      "Termékkatalógus, kategóriák és szűrőrendszer",
      "Online kártyás fizetés (Stripe / Barion integráció)",
      "Automatikus szállítási opciók (Foxpost, GLS, stb.)",
      "Automatizált számlázás (Számlázz.hu / Billingo)",
      "Készletkezelő és adminisztrációs dashboard",
      "Kosárelhagyás csökkentő megoldások",
    ],
  },
  {
    id: "webapp",
    title: "Webapplikáció",
    price: "650 000 Ft-tól",
    description:
      "Egyedi, interaktív szoftveres megoldás, ami a böngészőben fut.",
    useCase:
      "SaaS (Software-as-a-Service) termékekhez, ügyfélportálokhoz vagy összetett kalkulátorokhoz/eszközökhöz.",
    attributes: [
      "Egyedi adatbázis-architektúra (MongoDB / PostgreSQL)",
      "Felhasználói fiókok, Auth és szerepkörök (RBAC)",
      "Interaktív Dashboard és adatvizualizáció",
      "Előfizetéses rendszerek (Stripe Billing / Subscriptions)",
      "REST API integrációk",
      "Magas szintű adatvédelem és skálázhatóság",
    ],
  },
  {
    id: "crm",
    title: "Egyedi CRM rendszer",
    price: "850 000 Ft-tól",
    description:
      "Belső belső belső folyamatokat és ügyfélkapcsolatokat digitalizáló rendszer.",
    useCase:
      "Cégre szabott ügyfélnyilvántartásra, projektmenedzsmentre, árajánlat-készítésre és munkafolyamat-automatizálásra.",
    attributes: [
      "Személyre szabott ügyfél- és projektadatbázis",
      "Automatizált munkafolyamatok (Status tracking)",
      "Jogosultságkezelés (Admin, Munkatárs, Ügyfél)",
      "Automatikus riportok, kimutatások és PDF generálás",
      "E-mail és Naptár szinkronizáció",
      "VPS / Docker alapú biztonságos infrastruktúra",
    ],
  },
  {
    id: "maintenance",
    title: "Rendszerfelügyelet és Karbantartás",
    price: "20 000 Ft/hó-tól",
    description:
      "Folyamatos technikai támogatás, biztonsági frissítések és maximális rendelkezésre állás.",
    useCase:
      "Már meglévő weboldalak, webshopok vagy egyedi rendszerek stabil, biztonságos és leállásmentes működtetéséhez.",
    popular: true,
    attributes: [
      "24/7 Automatizált szerver- és hibafigyelés (Uptime monitoring)",
      "Rendszeres automatikus adatbázis- és fájlmentés (Offsite backup)",
      "Rendszer- és biztonsági frissítések (Security patches)",
      "Kisebb hibajavítások és apróbb tartalmi módosítások",
      "Adatbázis- és sebességoptimalizálás",
      "Prioritásos technikai support és gyors hibaelhárítás (SLA)",
    ],
  },
];

export default pricingData;
