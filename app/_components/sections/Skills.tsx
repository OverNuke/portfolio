"use client";

import LogoLoop from "../ui/LogoLoop";
import { SectionHeading } from "../ui/SectionHeading";

const TECH_LOGOS = [
  { src: "/dev-icons/expressjs-light.svg", alt: "Express.js" },
  { src: "/dev-icons/python.svg", alt: "Python" },
  { src: "/dev-icons/flutter.svg", alt: "Flutter" },
  { src: "/dev-icons/firebase.svg", alt: "Firebase" },
  { src: "/dev-icons/docker.svg", alt: "Docker" },
  { src: "/dev-icons/git.svg", alt: "Git" },
  { src: "/dev-icons/postman.svg", alt: "Postman" },
  { src: "/dev-icons/vscode.svg", alt: "VS Code" },
  { src: "/dev-icons/mysql.svg", alt: "MySQL" },
];

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="flex flex-col gap-content">
        <SectionHeading id="skills-heading">Skills</SectionHeading>
        {/* Full-bleed wrapper: rompe el container-content y contiene el overflow horizontal
            del LogoLoop sin recortar el scaleOnHover (overflow-y queda visible). */}
        <div className="-mx-[calc(50vw-50%)] w-screen overflow-x-clip">
          <div
            className="flex overflow-hidden items-center h-[72px]"
            role="region"
            aria-label="Technology logos"
          >
            <LogoLoop
              logos={TECH_LOGOS}
              speed={30}
              direction="right"
              logoHeight={60}
              gap={30}
              hoverSpeed={0}
              fadeOut
              scaleOnHover
              ariaLabel="Technology skills"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
