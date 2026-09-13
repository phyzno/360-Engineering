import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import LenisProvider from "@/components/providers/LenisProvider";
import TouchHoverFix from "@/components/ui/TouchHoverFix";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { AnimatePresence } from "framer-motion";

// Self-hosted via next/font — zero render blocking, zero CLS
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://archconceptbd.com"),
  title: {
    default: "Arch Concept | Interior Design & Fit-Out Company in Bangladesh",
    template: "%s | Arch Concept",
  },
  description:
    "Arch Concept is a leading interior design & fit-out company in Bangladesh, offering architectural design, turnkey solutions, and premium residential & commercial interiors.",
  keywords: [
    "Interior design in Bangladesh",
    "Interior Design & Fit-out Company in Bangladesh",
    "architectural design",
    "turnkey solutions",
    "residential interiors",
    "commercial interiors"
  ],
  authors: [{ name: "Arch Concept" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://archconceptbd.com",
    siteName: "Arch Concept",
    title: "Arch Concept | Interior Design & Fit-Out Company in Bangladesh",
    description:
      "Arch Concept is a leading interior design & fit-out company in Bangladesh, offering architectural design, turnkey solutions, and premium residential & commercial interiors.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arch Concept | Interior Design & Fit-Out Company in Bangladesh",
    description: "Arch Concept is a leading interior design & fit-out company in Bangladesh, offering architectural design, turnkey solutions, and premium residential & commercial interiors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable}`}
      style={
        {
          "--font-heading": "var(--font-cormorant)",
          "--font-body": "var(--font-jakarta)",
        } as React.CSSProperties
      }
    >
      <body>
        <LenisProvider>
          <TouchHoverFix />
          <CustomCursor />
          <Navbar />
          <AnimatePresence mode="wait">
            <main>{children}</main>
          </AnimatePresence>
          <Footer />
          <WhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
