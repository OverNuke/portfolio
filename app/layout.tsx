import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Syne } from "next/font/google";
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

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const kohinoorZerone = localFont({
  src: "../public/fonts/KohinoorZerone-Zero.ttf",
  variable: "--font-zerone",
  weight: "200",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://keff.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kevin García — Frontend Developer",
    template: "%s | Kevin García",
  },
  description:
    "Jr. Software Engineer looking for opportunities. Based in México.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Kevin García Portfolio",
    title: "Kevin García — Jr. Software Engineer",
    description:
      "Jr. Software Engineer looking for opportunities. Based in México.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kevin García Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin García — Jr. Software Engineer",
    description:
      "Jr. Software Engineer looking for opportunities. Based in México.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        syne.variable,
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
