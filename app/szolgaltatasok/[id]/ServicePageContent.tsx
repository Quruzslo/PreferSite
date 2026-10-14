import Image from "next/image";
import { IconType } from "react-icons";
import {
  FiActivity,
  FiAward,
  FiCheckCircle,
  FiCreditCard,
  FiDatabase,
  FiEyeOff,
  FiGrid,
  FiKey,
  FiLayers,
  FiLayout,
  FiLifeBuoy,
  FiLink,
  FiPackage,
  FiPieChart,
  FiRefreshCw,
  FiRepeat,
  FiSearch,
  FiServer,
  FiShield,
  FiShoppingCart,
  FiSliders,
  FiSmartphone,
  FiSmile,
  FiTarget,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import navItems from "@/lib/navItems";
import { TransitionLink } from "@/lib/site/transition";
import ArrowButton from "@/lib/ui/ArrowButton";
import RevealText from "@/lib/ui/RevealText";
import References from "@/components/References/References";
import NavigateToContact from "@/components/Contact/NavigateToContact";

interface ServiceData {
  slug: string;
  hero: { title: string; subtitle: string; ctaText: string };
  img: string;
  importance: { title: string; items: string[] };
  seoTitle: string;
  benefits: {
    title: string;
    description: string;
    stats: { number: string; title: string; text: string }[];
  };
  midCta: {
    title: string;
    subtitle: string;
    question: string;
    ctaText: string;
  };
  features: {
    title: string;
    items: {
      icon: string;
      title: string;
      text: string;
    }[];
  };
  footerCta: { title: string; subtitle: string };
}

// Csak a ténylegesen használt ikonok, hogy ne kerüljön a teljes ikoncsomag a bundle-be.
const icons: Record<string, IconType> = {
  FiActivity,
  FiAward,
  FiCheckCircle,
  FiCreditCard,
  FiDatabase,
  FiEyeOff,
  FiGrid,
  FiKey,
  FiLayers,
  FiLayout,
  FiLifeBuoy,
  FiLink,
  FiPackage,
  FiPieChart,
  FiRefreshCw,
  FiRepeat,
  FiSearch,
  FiServer,
  FiShieldCheck: FiShield,
  FiShoppingCart,
  FiSliders,
  FiSmartphone,
  FiSmile,
  FiTarget,
  FiUsers,
  FiZap,
};

const serviceLinks = navItems.find((item) => item.items)?.items ?? [];

export default function ServicePageContent({
  service,
}: {
  service: ServiceData;
}) {
  const shortName =
    serviceLinks.find((s) => s.path.endsWith(`/${service.slug}`))?.name ??
    service.seoTitle;

  return (
    <>
      {/* Hero */}
      <section
        data-theme="light"
        className="grain bg-paper pb-20 pt-28 site-gutter md:pb-28 md:pt-32"
      >
        <nav aria-label="Morzsamenü" className="mb-8 text-[0.95rem]">
          <TransitionLink
            href="/#szolgaltatasok"
            className="text-stone transition-colors hover:text-ink"
          >
            Szolgáltatások
          </TransitionLink>
          <span className="mx-2 text-stone" aria-hidden>
            /
          </span>
          <span aria-current="page">{shortName}</span>
        </nav>

        <RevealText
          as="h1"
          text={service.hero.title}
          className="type-h1 max-w-[18ch]"
          delay={0.1}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <p className="type-lead max-w-[38ch]">{service.hero.subtitle}</p>
            <ArrowButton href="/kapcsolat" variant="green">
              {service.hero.ctaText.replace(/!$/, "")}
            </ArrowButton>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-paper-deep lg:col-span-6 lg:col-start-7">
            <Image
              src={service.img}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-8 md:p-14"
            />
          </div>
        </div>
      </section>

      {/* Miért fontos */}
      <section
        data-theme="dark"
        className="bg-ink py-24 text-paper site-gutter md:py-32"
      >
        <RevealText
          as="h2"
          inView
          text={service.importance.title}
          className="type-h2 mb-14 max-w-[20ch]"
        />
        <ul className="grid gap-x-8 md:grid-cols-2">
          {service.importance.items.map((item) => (
            <li
              key={item}
              className="flex gap-4 border-t border-paper/15 py-6 text-[min(7vw,clamp(1.25rem,1.9vw,1.75rem))] font-medium leading-tight tracking-[-0.015em]"
            >
              <span
                aria-hidden
                className="mt-[0.4em] size-2.5 shrink-0 rounded-full bg-green"
              />
              <span className="min-w-0 [overflow-wrap:break-word]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Előnyök + köztes CTA */}
      <section
        data-theme="light"
        className="grain bg-paper py-24 site-gutter md:py-32"
      >
        <div className="mb-16 grid gap-8 lg:grid-cols-12 lg:gap-x-8">
          <RevealText
            as="h2"
            inView
            text={service.benefits.title}
            className="type-h2 max-w-[18ch] lg:col-span-7"
          />
          <p className="self-end text-stone lg:col-span-4 lg:col-start-9">
            {service.benefits.description}
          </p>
        </div>

        <ul className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {service.benefits.stats.map((stat) => (
            <li
              key={stat.title}
              className="flex flex-col gap-3 border-t border-ink/20 pt-6"
            >
              <span className="type-h1 tabular-nums">{stat.number}</span>
              <h3 className="text-xl font-bold tracking-[-0.01em]">
                {stat.title}
              </h3>
              <p className="max-w-[36ch] text-stone">{stat.text}</p>
            </li>
          ))}
        </ul>

        <div
          data-theme="dark"
          className="mt-24 grid gap-8 rounded-[6px] bg-ink p-6 text-paper md:p-12 lg:grid-cols-12 lg:gap-x-8"
        >
          <h2 className="type-h2 lg:col-span-6">{service.midCta.title}</h2>
          <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
            <p className="text-stone-light">{service.midCta.subtitle}</p>
            <p className="text-lg font-medium">{service.midCta.question}</p>
            <ArrowButton href="/kapcsolat" variant="green">
              {service.midCta.ctaText.replace(/!$/, "")}
            </ArrowButton>
          </div>
        </div>
      </section>

      {/* Funkciók */}
      <section
        data-theme="dark"
        className="bg-ink py-24 text-paper site-gutter md:py-32"
      >
        <RevealText
          as="h2"
          inView
          text={service.features.title}
          className="type-h2 mb-14 max-w-[20ch]"
        />
        <ul>
          {service.features.items.map((feature) => {
            const Icon = icons[feature.icon] ?? FiCheckCircle;
            return (
              <li
                key={feature.title}
                className="grid gap-4 border-t border-paper/15 py-8 lg:grid-cols-12 lg:gap-x-8"
              >
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:col-span-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[4px] bg-paper/10">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="type-h3 min-w-0">{feature.title}</h3>
                </div>
                <p className="max-w-[56ch] self-center text-stone-light lg:col-span-6 lg:col-start-7">
                  {feature.text}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <References title="Néhány korábbi projektem" initial={3} />

      <NavigateToContact
        subtitle={`${service.footerCta.title} ${service.footerCta.subtitle}`}
      />
    </>
  );
}
