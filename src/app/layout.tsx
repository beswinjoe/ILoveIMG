import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://filoza.vercel.app'),
  title: {
    default: "Free Online File Tools – Image, PDF, Audio & More | Filoza",
    template: "%s",
  },
  description: "70+ free online tools to compress, convert, resize, and edit images, PDFs, documents, and audio. Fast, private, and works in your browser with no signup.",
  alternates: {
    canonical: 'https://filoza.vercel.app',
  },
  openGraph: {
    type: 'website',
    siteName: 'Filoza',
  },
  twitter: {
    card: 'summary_large_image',
  },
  verification: {
    google: "FXZ7Os4TlkZpxzbGOn0x0pHB14RSju3qOgEyg7bL1xg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script 
          strategy="afterInteractive" 
          src="https://plausible.io/js/pa-weQFmNwawzoSvgxPKoS0m.js" 
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`
            window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
            plausible.init()
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <Script
          id="adsterra-popunder"
          strategy="lazyOnload"
          src="https://accedelid.com/18/90/32/189032bd9d9185ec6ee7017d6d182c92.js"
        />
        <Analytics />
      </body>
    </html>
  );
}
