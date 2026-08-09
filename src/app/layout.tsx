import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://filoza.vercel.app'),
  title: {
    default: "Free Online File Tools – Image, PDF, Audio & More | Filoza",
    template: "%s | Filoza",
  },
  description: "Free online tools to compress, convert, resize and edit images, PDFs, documents and audio. Fast, private and easy to use with no signup.",
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
      <body suppressHydrationWarning>
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
