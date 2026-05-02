interface CTAButtonProps {
  href?: string
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
}

const VARIANTS = {
  primary: 'bg-accent text-foreground hover:bg-accent/80 focus-visible:outline-accent',
  outline: 'border border-accent text-foreground hover:bg-accent/10 focus-visible:outline-accent',
}

const BASE =
  'inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer'

export function CTAButton({
  href,
  variant = 'primary',
  children,
  className = '',
  type = 'button',
}: CTAButtonProps) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto')
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={cls}>
      {children}
    </button>
  )
}
