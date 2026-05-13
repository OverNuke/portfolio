interface SectionHeadingProps {
  children: React.ReactNode;
  label?: string;
  id?: string;
}

export function SectionHeading({ children, label, id }: SectionHeadingProps) {
  return (
    <header className="relative mb-10 sm:mb-heading isolate">
      {label && (
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 -z-10 text-[clamp(5rem,14vw,11rem)] leading-none font-sans font-bold text-edge opacity-10 whitespace-nowrap max-w-full overflow-hidden"
        >
          {label}
        </span>
      )}
      <h2
        id={id}
        className="relative text-[clamp(2rem,5vw,3rem)] font-sans font-bold text-foreground leading-[1.1] tracking-tight"
      >
        {children}
      </h2>
    </header>
  );
}
