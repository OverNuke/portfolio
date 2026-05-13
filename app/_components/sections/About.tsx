import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section id="about" className="py-section-sm md:py-section px-gutter" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading id="about-heading">
          About me
        </SectionHeading>
        <div className="max-w-2xl space-y-4 text-muted leading-relaxed">
          <p>
            Replace this with your bio. Who are you, what do you build, what drives you.
          </p>
          <p>
            A second paragraph works great here — background, values, or what you&apos;re currently focused on.
          </p>
        </div>
      </div>
    </section>
  )
}
