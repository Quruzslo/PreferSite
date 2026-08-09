import Section from "@/lib/section";
import techStack from "./stack";
import Image from "next/image";

export default function TechStack() {
  return (
    <Section className="flex flex-col my-[50px] ">
      <h2 className="text-center text-3xl font-bold md:text-4xl my-[35px]">
        Eszközök, amikkel dolgozom
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {techStack.map((stack) => (
          <div key={stack.name} className="flex flex-col items-center gap-3">
            <Image
              title={stack.name}
              src={stack.img}
              alt={stack.name}
              width={100}
              height={100}
              className="w-[75px] h-[75px] md:w-[100px] md:h-[100px]"
            />
            {/* <p>{stack.name}</p> */}
          </div>
        ))}
      </div>
    </Section>
  );
}
