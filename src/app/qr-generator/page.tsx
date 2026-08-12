import { Metadata } from "next";
import QrGeneratorClient from "./QrGeneratorClient";

export const metadata: Metadata = {
  title: "QR Code Generator - Create QR Codes from Text or URLs | Filoza",
  description: "Generate QR codes from text, URLs, or other data online. Download as PNG image. Free, fast, and works in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/qr-generator"
  },
  openGraph: {
    title: "QR Code Generator - Create QR Codes from Text or URLs | Filoza",
    description: "Generate QR codes from text, URLs, or other data online. Download as PNG image. Free, fast, and works in your browser.",
    url: "https://filoza.vercel.app/qr-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator - Create QR Codes from Text or URLs | Filoza",
    description: "Generate QR codes from text, URLs, or other data online. Download as PNG image. Free, fast, and works in your browser.",
  }
};

export default function QrGeneratorPage() {
  return <QrGeneratorClient />;
}
