import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import JpgToPngClient from "./JpgToPngClient";

export const metadata: Metadata = {
  title: "JPG to PNG Converter - Convert JPEG to PNG Online | Filoza",
  description: "Convert JPG and JPEG images to PNG format online for free. Preserve image quality and gain transparency support. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/jpg-to-png"
  },
  openGraph: {
    title: "JPG to PNG Converter - Convert JPEG to PNG Online | Filoza",
    description: "Convert JPG and JPEG images to PNG format online for free. Preserve image quality and gain transparency support. Processed locally in your browser.",
    url: "https://filoza.vercel.app/jpg-to-png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to PNG Converter - Convert JPEG to PNG Online | Filoza",
    description: "Convert JPG and JPEG images to PNG format online for free. Preserve image quality and gain transparency support. Processed locally in your browser.",
  }
};

export default function JpgToPngPage() {
  const faq = [];
  const jsonLd = generateToolJsonLd('jpg-to-png', 'JPG to PNG', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <JpgToPngClient />
    </>
  );
}
