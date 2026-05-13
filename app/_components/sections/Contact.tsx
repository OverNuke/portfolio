import Image from "next/image";
import { SOCIAL_LINKS } from "@/app/_lib/data";
import { SectionHeading } from "../ui/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="py-section-sm md:py-section px-gutter" aria-labelledby="contact-heading">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="max-w-xl">
          <p className="text-muted leading-relaxed mb-8">
            Have a project in mind or just want to say hi? My inbox is always
            open.
          </p>
        </div>
      </div>
    </section>
  );
}
