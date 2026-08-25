interface ContactButtonProps {
  title: string;
  path: string;
  wrapperClass?: string;
  titleClass?: string;
  decorClass?: string;
}

export default function ContactButton({
  title,
  path,
  wrapperClass = "",
  titleClass = "",
  decorClass = "",
}: ContactButtonProps) {
  return (
    <a
      className={`relative contact-btn overflow-hidden inline-flex items-center gap-2 w-fit shrink-1 ${wrapperClass}`}
      aria-label={`${title} gomb navigáció`}
      href={path}
    >
      <div
        className={`decor-1 w-[15px] h-[15px] rounded-full border-2 border-white ${decorClass}`}
      />
      <div
        className={`decor-2 w-[15px] h-[15px] rounded-full border-2 border-white ${decorClass}`}
      />
      <div
        className={`decor-3 w-[15px] h-[15px] rounded-full border-2 border-white ${decorClass}`}
      />

      <span className={titleClass}>{title}</span>

      <div
        className={`decor-4 w-[15px] h-[15px] rounded-full border-2 border-white ${decorClass}`}
      />
      <div
        className={`decor-5 w-[15px] h-[15px] rounded-full border-2 border-white ${decorClass}`}
      />
      <div
        className={`decor-6 w-[15px] h-[15px] rounded-full border-2 border-white ${decorClass}`}
      />
    </a>
  );
}
