interface SectionHeadingProps {
  children: React.ReactNode
  label?: string
  id?: string
}

export function SectionHeading({ children, label, id }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      {label && (
        <span className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
          {label}
        </span>
      )}
      <h2 id={id} className="text-4xl sm:text-5xl font-sans font-bold text-foreground leading-none">
        {children}
      </h2>
    </div>
  )
}
