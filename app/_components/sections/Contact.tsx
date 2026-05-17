"use client";

import { Mail, Link, Code2, Download, User } from "lucide-react";
import { RetroControlCell } from "@/components/ui/retro-buttons/control-cell";
import { RetroExternal } from "@/components/ui/retro-buttons/external";
import { RetroIconStack } from "@/components/ui/retro-buttons/icon-stack";
import { RetroDownload } from "@/components/ui/retro-buttons/download";
import { SectionHeading } from "../ui/SectionHeading";

const ICON_PROPS = { size: 18, strokeWidth: 1.5 } as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="py-section-sm md:py-section"
      aria-labelledby="contact-heading"
    >
      <div className="flex flex-col gap-content">
        <SectionHeading id="contact-heading">Contact</SectionHeading>
        <p className="text-muted leading-relaxed text-[clamp(0.95rem,0.5vw+0.85rem,1.05rem)]">
          Have a project in mind or just want to say hi? My inbox is always
          open.
        </p>
        <div>
          <div className="flex flex-wrap justify-center gap-10 md:gap-12">
            <RetroControlCell
              label="EMAIL"
              icon={<Mail {...ICON_PROPS} />}
              aria-label="Send me an email"
              onClick={() => window.open("mailto:ksfgarcia24@gmail.com")}
            />
            <RetroExternal
              label="LINKEDIN"
              icon={<Link {...ICON_PROPS} />}
              hoverIcon={<User {...ICON_PROPS} />}
              aria-label="Visit my LinkedIn profile"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/keffwontwakeup/",
                  "_blank",
                  "noopener noreferrer",
                )
              }
            />
            <RetroIconStack
              label="GITHUB"
              icon={<Code2 {...ICON_PROPS} />}
              aria-label="Visit my GitHub profile"
              onClick={() =>
                window.open(
                  "https://github.com/OverNuke",
                  "_blank",
                  "noopener noreferrer",
                )
              }
            />
            <RetroDownload
              label="DOWNLOAD CV"
              icon={<Download {...ICON_PROPS} />}
              aria-label="Download my CV"
              onClick={() => {
                const a = document.createElement("a");
                a.href = "/cv.pdf";
                a.download = "Kevin_Garcia_CV.pdf";
                a.click();
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
