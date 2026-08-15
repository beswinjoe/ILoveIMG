import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import ConverterClient from "./ConverterClient";

export const metadata: Metadata = {
  title: "Image Converter - JPG, PNG, WebP & More Online | Filoza",
  description: "Convert images between JPG, PNG, WebP, and other formats online. Universal image format converter that processes files locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-converter"
  },
  openGraph: {
    title: "Image Converter - JPG, PNG, WebP & More Online | Filoza",
    description: "Convert images between JPG, PNG, WebP, and other formats online. Universal image format converter that processes files locally in your browser.",
    url: "https://filoza.vercel.app/image-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Converter - JPG, PNG, WebP & More Online | Filoza",
    description: "Convert images between JPG, PNG, WebP, and other formats online. Universal image format converter that processes files locally in your browser.",
  }
};

export default function ConverterPage() {
  const faq: any[] = [];
  const jsonLd = generateToolJsonLd('image-converter', 'Image Converter', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ConverterClient />
    </>
  );
}
