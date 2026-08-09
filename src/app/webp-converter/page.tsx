import { Metadata } from "next";
import WebpClient from "./WebpClient";

export const metadata: Metadata = {
  title: "WebP Converter Online – Free | Filoza",
  description: "Convert between WebP and other formats. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/webp-converter"
  },
  openGraph: {
    title: "WebP Converter Online – Free | Filoza",
    description: "Convert between WebP and other formats. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/webp-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP Converter Online – Free | Filoza",
    description: "Convert between WebP and other formats. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function WebpConverterPage() {
  return <WebpClient />;
}
