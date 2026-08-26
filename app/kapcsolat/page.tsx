import ContactSection from "../../components/Contact/ContactSection";
import CurvedLines from "./CurvedLine";

const h2Elements = ["Weboldal", "Webshop", "CRM", "Webapplikáció"];

export default function ContactPage() {
  return (
    <section className="flex w-full min-h-full flex-col gap-[25px] bg-dark-color py-[150px]">
      <CurvedLines className="z-0 bottom-0 left-0"></CurvedLines>
      <CurvedLines className="z-0 top-[120px] md:top-0 left-0"></CurvedLines>
      <div className="flex flex-col mb-[50px]  w-[90%] max-w-[2560px] mx-auto justify-center items-center">
        <h2 className="flex flex-row gap-[10px] flex-wrap text-center items-center justify-center">
          {h2Elements.map((elem, _) => (
            <span
              key={elem}
              className="text-[20px] md:text-[65px] text-transparent font-black uppercase bg-clip-text bg-gradient-to-r from-white/50 to-green mx-[15px]"
            >
              {elem}
            </span>
          ))}
        </h2>
        <p className="text-[20px] text-white font-bold my-[15px]">
          - egyedi fejlesztésben -
        </p>
      </div>
      <ContactSection></ContactSection>
    </section>
  );
}
