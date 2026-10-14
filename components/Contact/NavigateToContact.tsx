import ArrowButton from "@/lib/ui/ArrowButton";
import RevealText from "@/lib/ui/RevealText";

interface NavigateToContactProps {
  title?: string;
  subtitle?: string;
}

export default function NavigateToContact({
  title = "Beszéljük át a projektedet",
  subtitle = "Írd meg röviden, mire van szükséged. Egy kötetlen beszélgetésen átnézzük a lehetőségeket, és átlátható árajánlatot kapsz.",
}: NavigateToContactProps) {
  return (
    <section
      data-theme="light"
      className="grain bg-paper py-28 site-gutter md:py-40"
    >
      <RevealText
        as="h2"
        inView
        text={title}
        className="type-display max-w-[13ch]"
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-x-8">
        <p className="type-lead max-w-[36ch] lg:col-span-5">{subtitle}</p>
        <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
          <ArrowButton href="/kapcsolat" variant="green" size="lg">
            Ajánlatot kérek
          </ArrowButton>
          <p className="text-stone">
            Vagy hívj:{" "}
            <a
              href="tel:+36203127968"
              className="font-medium text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              +36 20 312 7968
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
