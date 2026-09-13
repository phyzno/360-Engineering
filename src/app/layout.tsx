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
  metadataBase: new URL("https://df-interiors.net"),
  title: {
    default: "DF Interiors | Interior Design & Fit-Out Company in Kuwait",
    template: "%s | DF Interiors Kuwait",
  },
  description:
    "DF Interiors is a leading interior design & fit-out company in Kuwait, offering architectural design, turnkey solutions, and premium residential & commercial interiors.",
  keywords: [
    "Interior design in kuwait",
    "Interior Design & Fit-out Company in Kuwait",
    "architectural design",
    "turnkey solutions",
    "residential interiors",
    "commercial interiors"
  ],
  authors: [{ name: "DF Interiors" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://df-interiors.net",
    siteName: "DF Interiors",
    title: "DF Interiors | Interior Design & Fit-Out Company in Kuwait",
    description:
      "DF Interiors is a leading interior design & fit-out company in Kuwait, offering architectural design, turnkey solutions, and premium residential & commercial interiors.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DF Interiors | Interior Design & Fit-Out Company in Kuwait",
    description: "DF Interiors is a leading interior design & fit-out company in Kuwait, offering architectural design, turnkey solutions, and premium residential & commercial interiors.",
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
