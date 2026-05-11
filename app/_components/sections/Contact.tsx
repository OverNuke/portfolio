import Image from "next/image";
import { SOCIAL_LINKS } from "@/app/_lib/data";
import { SectionHeading } from "../ui/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-surface/50 backdrop-blur-xl ring-1 ring-edge/30 rounded-2xl" aria-labelledby="contact-heading">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading label="// 05" id="contact-heading">
          Contact
        </SectionHeading>
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
