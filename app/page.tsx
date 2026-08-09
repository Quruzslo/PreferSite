import Hero from "@/components/hero/Hero";
import TechStack from "@/components/tech-stack/TechStack";
import BenefitSection from "../components/BenefitSection/BenefitSection";
import Services from "../components/ServicesSection/Services";

export default function HomePage() {
  return (
    <>
      <Hero></Hero>
      <TechStack></TechStack>
      <BenefitSection></BenefitSection>
      <Services></Services>
    </>
  );
}
