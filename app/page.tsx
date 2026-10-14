import { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import BenefitSection from "@/components/BenefitSection/BenefitSection";
import Statement from "@/components/Statement/Statement";
import References from "@/components/References/References";
import Services from "@/components/ServicesSection/Services";
import PricingSection from "@/components/PricingDatas/PricingSection";
import CustomerStepsComp from "@/components/customerSteps/CustomerSteps";
import NavigateToContact from "@/components/Contact/NavigateToContact";

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
      <Statement />
      <References />
      <Services />
      <PricingSection />
      <CustomerStepsComp />
      <NavigateToContact />
    </>
  );
}
