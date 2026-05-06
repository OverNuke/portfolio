import Image from "next/image";
import { Footer as FooterUI } from "@/components/ui/footer";

export function Footer() {
  return (
    <FooterUI
      logo={
        <Image src="/SonicRing.gif" alt="Sonic Ring" width={40} height={40} />
      }
      brandName="Kevin S. Frías García"
      socialLinks={[
        {
          icon: (
            <Image
              src="/github-light.svg"
              alt="GitHub"
              width={20}
              height={20}
            />
          ),
          href: "https://github.com/OverNuke",
          label: "GitHub",
        },
        {
          icon: (
            <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} />
          ),
          href: "https://www.linkedin.com/in/keffwontwakeup/",
          label: "LinkedIn",
        },
        {
          icon: <Image src="/gmail.svg" alt="Email" width={20} height={20} />,
          href: "mailto:ksfgarcia24@gmail.com",
          label: "Email",
        },
      ]}
      mainLinks={[
        { href: "#about", label: "About" },
        { href: "#projects", label: "Projects" },
        { href: "#skills", label: "Skills" },
        { href: "#contact", label: "Contact" },
      ]}
      legalLinks={[]}
      copyright={{
        text: `© ${new Date().getFullYear()} Kevin S. Frías García`,
      }}
    />
  );
}
