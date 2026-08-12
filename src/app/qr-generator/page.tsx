import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
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
  const faq = [
        { question: "Do these QR codes expire?", answer: "No. The QR codes generated here are static, meaning they encode the information directly into the image pattern. They will never expire." },
        { question: "Is my data sent to a server?", answer: "No. The QR codes are generated entirely within your browser for complete privacy." }
      ];
  const jsonLd = generateToolJsonLd('qr-generator', 'QR Code Generator', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <QrGeneratorClient />
    </>
  );
}
