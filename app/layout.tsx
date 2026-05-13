import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import BubbleMenu from "./_components/ui/BubbleMenu";
import { Footer } from "./_components/layout/Footer";
import { ClientAnimations } from "./_components/layout/ClientAnimations";
import { cn } from "@/lib/utils";

const gcMono = localFont({
  src: "../public/GoogleSansCode-VariableFont_MONO,wght.ttf",
  variable: "--font-gc-mono",
  weight: "100 900",
  display: "swap",
});

const gcProp = localFont({
  src: "../public/GoogleSansCode_Proportional-Regular.ttf",
  variable: "--font-gc-prop",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const kohinoorZerone = localFont({
  src: "../public/fonts/KohinoorZerone-Zero.ttf",
  variable: "--font-zerone",
  weight: "200",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keff Portfolio",
  description: "Wow, I'm a software engineer. My portfolio btw.",
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
        gcMono.variable,
        gcProp.variable,
        playfair.variable,
        kohinoorZerone.variable,
      )}
    >
      <body>
        <ClientAnimations />
        <BubbleMenu logo={logo} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
