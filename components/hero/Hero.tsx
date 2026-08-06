import Section from "@/lib/section";
export default function Hero() {
  const h1Items = ["Webapplikáció", "Webshop", "Weboldal", "fejlesztés"];
  return (
    <Section className="flex-col md:flex-row flex pt-[120px] pb-[35px] h-[100vh] min-h-[450px] items-center justify-center gap-[25px] ">
      <div className="hero-bal w-full md:w-[50%] bg-stone-300 p-[10px] h-full">
        <h1 className="font-black  text-[20px] md:text-[35px] xl:text-[55px]  flex !flex-col  gap-[10px] ">
          {h1Items.map((item, idx) => (
            <span key={idx} className=" h1-elem ">
              {item}
            </span>
          ))}
        </h1>
        <p></p>
      </div>
      <div className="hero-jobb w-full md:w-[50%] bg-stone-300"></div>
    </Section>
  );
}
