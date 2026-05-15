import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section id="about" className="py-section-sm md:py-section" aria-labelledby="about-heading">
      <div className="container-content">
        <SectionHeading id="about-heading">
          About me
        </SectionHeading>
        <div className="max-w-2xl space-y-4 text-muted leading-relaxed text-[clamp(0.95rem,0.5vw+0.85rem,1.05rem)]">
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
