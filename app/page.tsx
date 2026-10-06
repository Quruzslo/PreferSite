import { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import TechStack from "@/components/tech-stack/TechStack";
import BenefitSection from "../components/BenefitSection/BenefitSection";
import Services from "../components/ServicesSection/Services";
import CustomerStepsComp from "@/components/customerSteps/CustomerSteps";
import PricingSection from "@/components/PricingDatas/PricingSection";
import NavigateToContact from "@/components/Contact/NavigateToContact";
import CounterSection from "@/components/Counters/CounterSection";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  return (
    <>
      <Hero />
      <BenefitSection />
      <TechStack />
      <CounterSection />
      <Services />
      <CustomerStepsComp />
      <PricingSection />
      <NavigateToContact />
    </>
  );
}
