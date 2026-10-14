import ScrollWords from "@/lib/ui/ScrollWords";

export default function Statement() {
  return (
    <section
      data-theme="dark"
      className="bg-ink pb-28 pt-24 text-paper site-gutter md:pb-40 md:pt-36"
    >
      <ScrollWords
        text="Átbeszéljük. Megtervezem. Elkészítem. Neked adom."
        className="type-display max-w-[12ch]"
      />
      <div className="mt-14 grid lg:grid-cols-12">
        <p className="type-lead text-stone-light lg:col-span-5 lg:col-start-8">
          Mindent egy kézben tartok a tervezéstől a folyamatos üzemeltetésig.
          Domain, tárhely, karbantartás és gyors hibajavítás, hogy neked csak a
          vállalkozásod növekedésére kelljen figyelned.
        </p>
      </div>
    </section>
  );
}
