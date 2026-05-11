interface SectionHeadingProps {
  children: React.ReactNode;
  label?: string;
  id?: string;
}

export function SectionHeading({ children, label, id }: SectionHeadingProps) {
  return (
    <div className="relative mb-16">
      {label && (
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -top-6 right-0 text-[11rem] leading-none font-sans font-bold text-edge opacity-10"
        >
          {label}
        </span>
      )}
      <h2
        id={id}
        className="relative text-4xl sm:text-5xl font-sans font-bold text-foreground leading-none"
      >
        {children}
      </h2>
    </div>
  );
}
