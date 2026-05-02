import { CTAButton } from '../ui/CTAButton'
import DecryptedText from '@/components/DecryptedText'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16" aria-labelledby="hero-heading">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-24">
        <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
          // Hello, world
        </p>
        <h1
          id="hero-heading"
          className="text-6xl sm:text-8xl font-sans font-bold text-foreground leading-tight mb-8"
        >
          <DecryptedText text="Kevin" animateOn="view" sequential speed={130} />
          <br />
          <span className="bg-surface-raised text-foreground px-3 py-1 inline-block">
            <DecryptedText text="Sebastián" animateOn="view" sequential speed={140} />
          </span>
          <br />
          <DecryptedText text="Frías García" animateOn="view" sequential speed={150} />
        </h1>
        <p className="text-muted text-lg max-w-xl leading-relaxed mb-10">
          Software engineer building things for the web. Focused on clean architecture and expressive interfaces.
        </p>
        <div className="flex flex-wrap gap-4">
          <CTAButton href="#projects">View projects</CTAButton>
          <CTAButton href="#contact" variant="outline">Get in touch</CTAButton>
        </div>
      </div>
    </section>
  )
}
