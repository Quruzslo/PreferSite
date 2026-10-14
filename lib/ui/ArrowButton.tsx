import { ReactNode } from "react";
import { TransitionLink } from "@/lib/site/transition";

type Variant = "green" | "ink" | "paper";
type Size = "md" | "lg";

const variants: Record<Variant, { button: string; box: string }> = {
  green: { button: "bg-green text-ink hover:bg-[#66c98f]", box: "bg-ink/10" },
  ink: { button: "bg-ink text-paper hover:bg-ink-card", box: "bg-paper/12" },
  paper: { button: "bg-paper text-ink hover:bg-white", box: "bg-ink/8" },
};

const sizes: Record<Size, { button: string; box: string }> = {
  md: { button: "gap-3 py-1.5 pl-3.5 pr-1.5 text-[0.95rem]", box: "size-7" },
  lg: { button: "gap-4 py-2 pl-5 pr-2 text-lg", box: "size-10" },
};

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

// Nyíl a gomb dobozában: hoverre kicsúszik jobbra fel, és egy új érkezik a helyére.
function ArrowBox({ className }: { className: string }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-[3px] ${className}`}
    >
      <ArrowIcon className="size-[55%] transition-transform duration-500 ease-out-expo group-hover:translate-x-[160%] group-hover:-translate-y-[160%]" />
      <ArrowIcon className="absolute size-[55%] -translate-x-[160%] translate-y-[160%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
    </span>
  );
}

interface ArrowButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

export default function ArrowButton({
  href,
  children,
  variant = "ink",
  size = "md",
  external = false,
  className = "",
  ariaLabel,
}: ArrowButtonProps) {
  const classes = `group inline-flex w-fit items-center rounded-[4px] font-medium transition-colors duration-300 ${variants[variant].button} ${sizes[size].button} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <ArrowBox className={`${variants[variant].box} ${sizes[size].box}`} />
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <TransitionLink href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </TransitionLink>
  );
}
