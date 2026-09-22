import ContactSection from "../../components/Contact/ContactSection";
import CurvedLines from "./CurvedLine";

const h2Elements = ["Weboldal", "Webshop", "CRM", "Webapplikáció"];
export const metadata = {
  title: "Webfejlesztés - Kapcsolat",
  description:
    "Weboldal készítés országosan bárhonnan. Weboldal készítés Kaposváron, webfejlesztés Budapesten, Győrben.",
};

export default function ContactPage() {
  return (
    <section className="flex w-full min-h-fit h-[100vh] flex-col gap-[25px] bg-white py-[100px] md:py-[150px]">
      <CurvedLines className="z-0 bottom-0 left-0"></CurvedLines>
      <CurvedLines className="z-0 top-[120px] md:top-0 left-0"></CurvedLines>

      <ContactSection></ContactSection>
    </section>
  );
}
