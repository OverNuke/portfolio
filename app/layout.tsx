import type { Metadata } from "next";
import { JetBrains_Mono, Syne, Geist } from "next/font/google";
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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kevin Sebastián Frías García — Developer Portfolio",
  description:
    "Personal portfolio of Kevin Sebastián Frías García, software engineer.",
};

const logo = (
  <span className="font-mono text-sm font-medium text-foreground">
    Ke<span className="text-muted">vin</span>
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
        jetbrainsMono.variable,
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
