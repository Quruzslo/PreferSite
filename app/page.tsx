import { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import TechStack from "@/components/tech-stack/TechStack";
import BenefitSection from "../components/BenefitSection/BenefitSection";
import Services from "../components/ServicesSection/Services";
import CustomerStepsComp from "@/components/customerSteps/CustomerSteps";
import PricingSection from "@/components/PricingDatas/PricingSection";
import NavigateToContact from "@/components/Contact/NavigateToContact";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function HomePage() {
  return (
    <>
      <Hero></Hero>
      <BenefitSection></BenefitSection>
      <TechStack></TechStack>
      <Services></Services>
      <CustomerStepsComp></CustomerStepsComp>
      <PricingSection></PricingSection>
      <NavigateToContact></NavigateToContact>
    </>
  );
}
