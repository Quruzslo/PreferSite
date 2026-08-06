import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className = "" }: SectionProps) {
  return (
    <section className="w-full flex flex-col ">
      <div className={`w-[90%] max-w-[2560px] mx-auto ${className}`.trim()}>
        {children}
      </div>
    </section>
  );
}
