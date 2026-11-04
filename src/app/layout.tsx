import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWidgets } from "@/components/layout/FloatingWidgets";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateOrganizationJsonLd } from "@/data/seoMap";
import { MetaPixel } from "@/components/analytics/MetaPixel";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AAROHA Technologies | Software, Cloud & Data Engineering | Powered by J2D",
  description:
    "AAROHA Technologies delivers custom software development, application engineering, cloud & data solutions, and IT training. Powered by J2D Technologies.",
  metadataBase: new URL("https://www.aaroha-inc.com"),
  alternates: {
    canonical: "https://www.aaroha-inc.com",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "AAROHA Technologies | Software, Cloud & Data Engineering",
    description: "Custom software, cloud data pipelines, and technology training. Powered by J2D Technologies.",
    url: "https://www.aaroha-inc.com",
    siteName: "AAROHA Technologies",
    images: [
      {
        url: "/assets/aaroha-logo-transparent.png",
        width: 1024,
        height: 232,
        alt: "AAROHA Technologies — Elevate | Empower | Excel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AAROHA Technologies | Software, Cloud & Data Engineering",
    description: "Custom software, cloud data pipelines, and technology training. Powered by J2D Technologies.",
    images: ["/assets/aaroha-logo-transparent.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} scroll-smooth`}>
      <head>
        <JsonLd data={generateOrganizationJsonLd()} />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900 flex flex-col min-h-screen">
        <MetaPixel />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWidgets />
      </body>
    </html>
  );
}
