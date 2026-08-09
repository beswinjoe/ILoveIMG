import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Filoza - All your files. One smart platform.",
  description: "Fast, private and easy-to-use tools for images, PDFs, audio and more — directly in your browser.",
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
