import { SectionHeading } from "../ui/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="py-section-sm md:py-section" aria-labelledby="contact-heading">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <SectionHeading id="contact-heading">
          Contact
        </SectionHeading>
        <div className="max-w-xl">
          <p className="text-muted leading-relaxed mb-8 text-[clamp(0.95rem,0.5vw+0.85rem,1.05rem)]">
            Have a project in mind or just want to say hi? My inbox is always
            open.
          </p>
        </div>
      </div>
    </section>
  );
}
