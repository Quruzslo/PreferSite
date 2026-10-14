import Image from "next/image";
import Kepem from "@/public/cv-kep-github.jpg";
import RevealText from "@/lib/ui/RevealText";
import ContactForm from "./ContacForm";

const promises = [
  { title: "Kötetlenség", text: "Az első beszélgetés díjmentes és kötelezettség nélküli." },
  { title: "Gyors válasz", text: "Minden megkeresésre személyesen válaszolok." },
  { title: "Átláthatóság", text: "Írásos árajánlat, rejtett költségek nélkül." },
];

export default function ContactSection() {
  return (
    <section
      id="kapcsolat"
      data-theme="light"
      className="grain bg-paper pb-24 pt-28 site-gutter md:pb-36 md:pt-32"
    >
      <RevealText
        as="h1"
        text="Kérj ajánlatot"
        className="type-display"
        delay={0.1}
      />

      <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <p className="type-lead max-w-[34ch]">
            Írd meg röviden, milyen weboldalra, webshopra vagy rendszerre van
            szükséged, és felveszem veled a kapcsolatot.
          </p>

          <div className="flex items-center gap-4">
            <Image
              src={Kepem}
              alt="Szili Gál Áron, full-stack fejlesztő"
              width={72}
              height={72}
              className="size-[72px] rounded-[4px] object-cover"
            />
            <div>
              <p className="font-bold">Szili Gál Áron</p>
              <p className="text-stone">Full-stack fejlesztő</p>
            </div>
          </div>

          <ul className="flex flex-col">
            <li className="border-t border-ink/20 py-4">
              <span className="block text-sm text-stone">E-mail</span>
              <a
                href="mailto:sziligalaron@gmail.com"
                className="text-lg font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                sziligalaron@gmail.com
              </a>
            </li>
            <li className="border-y border-ink/20 py-4">
              <span className="block text-sm text-stone">Telefon</span>
              <a
                href="tel:+36203127968"
                className="text-lg font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
              >
                +36 20 312 7968
              </a>
            </li>
          </ul>

          <ul className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {promises.map((p) => (
              <li key={p.title} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[0.5em] size-2 shrink-0 rounded-full bg-green"
                />
                <p>
                  <span className="font-bold">{p.title}.</span>{" "}
                  <span className="text-stone">{p.text}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
