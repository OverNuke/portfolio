import { SectionHeading } from '../ui/SectionHeading'

export function About() {
  return (
    <section id="about" className="py-32 px-6 bg-surface/50 backdrop-blur-xl ring-1 ring-edge/30 rounded-2xl" aria-labelledby="about-heading">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading label="// 01" id="about-heading">
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
