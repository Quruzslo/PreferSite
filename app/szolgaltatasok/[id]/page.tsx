import { notFound } from "next/navigation";
import { szolgaltatasokData } from "../szolgaltatasData";
import ServicePageContent from "./ServicePageContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

const BASE_URL = "https://www.prefersite.hu";

export async function generateStaticParams() {
  return szolgaltatasokData.map((service) => ({
    id: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const service = szolgaltatasokData.find((item) => item.slug === id);

  if (!service) {
    return {
      title: "Szolgáltatás nem található - Prefersite",
    };
  }

  const canonicalUrl = `${BASE_URL}/szolgaltatasok/${service.slug}`;

  return {
    title: `${service.seoTitle}`,
    description:
      service.seoDescription ||
      "Egyedi webalkalmazás, weboldal, webshop, CRM rendszer fejlesztés.",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.seoTitle}`,
      description:
        service.seoDescription ||
        "Egyedi webalkalmazás, weboldal, webshop, CRM rendszer fejlesztés.",
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { id } = await params;
  const service = szolgaltatasokData.find((item) => item.slug === id);

  if (!service) {
    notFound();
  }

  return <ServicePageContent service={service} />;
}
