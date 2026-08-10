import Hero from "@/components/hero/Hero";
import TechStack from "@/components/tech-stack/TechStack";
import BenefitSection from "../components/BenefitSection/BenefitSection";
import Services from "../components/ServicesSection/Services";
import CustomerStepsComp from "@/components/customerSteps/CustomerSteps";

export default function HomePage() {
  return (
    <>
      <Hero></Hero>
      <BenefitSection></BenefitSection>
      <TechStack></TechStack>
      <Services></Services>
      <CustomerStepsComp></CustomerStepsComp>
    </>
  );
}
