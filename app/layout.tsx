import type { Metadata } from "next";
import { Google_Sans_Code, Syne, Geist } from "next/font/google";
import "./globals.css";
import BubbleMenu from "./_components/ui/BubbleMenu";
import { Footer } from "./_components/layout/Footer";
import { cn } from "@/lib/utils";
import { DotFieldBackground } from "./_components/layout/DotField";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-google-sans-code",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Keff Portfolio",
  description: "Wow, I'm a software engineer. My portfolio.",
};

const logo = (
  <span className="font-mono text-sm font-medium text-foreground">
    Live &<span className="text-muted"> learn</span>
  </span>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "dark",
        syne.variable,
        googleSansCode.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body>
        <DotFieldBackground />
        <BubbleMenu logo={logo} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
