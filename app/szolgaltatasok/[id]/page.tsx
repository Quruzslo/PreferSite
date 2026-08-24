import { notFound } from "next/navigation";
import { szolgaltatasokData } from "../szolgaltatasData";
import ServicePageContent from "./ServicePageContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const service = szolgaltatasokData.find((item) => item.slug === id);

  if (!service) {
    return {
      title: "Szolgáltatás nem található",
    };
  }

  return {
    title: service.benefits.title,
    description:
      service.hero.subtitle ||
      "Egyedi webalkalmazás, weboldal, webshop, CRM rendszer fejlesztés.",
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
