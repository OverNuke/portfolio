import type React from "react";
import Link from "next/link";
import { RetroPlayTile } from "./retro-buttons/play-tile";
import { CertificationsFooter } from "@/app/_components/ui/certifications/CertificationsFooter";

interface FooterProps {
  logo: React.ReactNode;
  brandName: string;
  socialLinks: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  mainLinks: Array<{
    href: string;
    label: string;
  }>;
  legalLinks: Array<{
    href: string;
    label: string;
  }>;
  copyright: {
    text: string;
    license?: string;
  };
}

export function Footer({
  logo,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
      <div className="container-content">
        {socialLinks.length > 0 && (
          <div className="md:flex md:items-center md:justify-between">
            <ul className="flex list-none mt-6 md:mt-0 gap-x-2">
              {socialLinks.map((link, i) => (
                <li key={i}>
                  <RetroPlayTile
                    aria-label={link.label}
                    onClick={() => window.open(link.href, "_blank", "noopener")}
                    icon={link.icon}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="border-t border-edge mt-6 pt-8 md:mt-8 md:pt-10 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="flex items-center gap-x-3 shrink-0"
            aria-label={brandName}
          >
            {logo}
            <span className="text-sm text-muted-foreground">{brandName}</span>
          </Link>
          <nav>
            <ul className="list-none flex flex-wrap gap-x-6 gap-y-2">
              {mainLinks.map((link, i) => (
                <li key={i} className="shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-10">
          <CertificationsFooter />
        </div>
      </div>
    </footer>
  );
}
