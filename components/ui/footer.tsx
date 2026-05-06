import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      <div className="px-4 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <Link
            href="/"
            className="flex items-center gap-x-3"
            aria-label={brandName}
          >
            {logo}
            <span className="font-bold text-xl">{brandName}</span>
          </Link>
          <ul className="flex list-none mt-6 md:mt-0 gap-x-1">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  size="icon"
                  className="h-10 w-10 rounded-full bg-surface-raised border border-edge hover:bg-accent/30 transition-colors"
                  asChild
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-1" />
        <div className="border-t mt-6 pt-8 md:mt-8 md:pt-10 lg:grid lg:grid-cols-10 gap-y-6">
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
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
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              {legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm leading-6 text-muted-foreground whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
            <div>{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
        </div>
      </div>
    </footer>
  );
}
