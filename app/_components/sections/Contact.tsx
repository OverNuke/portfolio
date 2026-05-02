import Image from "next/image";
import { SOCIAL_LINKS } from "@/app/_lib/data";
import { SectionHeading } from "../ui/SectionHeading";
import { CTAButton } from "../ui/CTAButton";

export function Contact() {
  return (
    <section id="contact" className="py-24" aria-labelledby="contact-heading">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <SectionHeading label="// 05" id="contact-heading">
          Contact
        </SectionHeading>
        <div className="max-w-xl ">
          <p className="text-muted leading-relaxed mb-8">
            Have a project in mind or just want to say hi? My inbox is always
            open.
          </p>
        </div>
      </div>
    </section>
  );
}
