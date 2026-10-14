import techStack from "./stack";

export default function TechStack() {
  return (
    <div
      id="stack"
      className="mt-16 grid gap-5 border-t border-ink/15 pt-5 lg:grid-cols-12 lg:gap-x-8"
    >
      <p className="text-[0.95rem] lg:col-span-4">Ezekkel a technológiákkal dolgozom</p>
      <ul className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:col-span-8">
        {techStack.map((tech) => (
          <li key={tech.name} className="font-mono text-[0.85rem]">
            {tech.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
