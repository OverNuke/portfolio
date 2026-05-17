"use client";

import Image from "next/image";
import { Footer as FooterUI } from "@/components/ui/footer";

export function Footer() {
  return (
    <FooterUI
      logo={
        <Image src="/SonicRing.gif" alt="Sonic Ring" width={40} height={40} />
      }
      brandName="Kevin S. Frías García"
      socialLinks={[]}
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
