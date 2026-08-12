import { Metadata } from "next";
import { generateToolJsonLd } from "@/lib/seo";
import CompressorClient from "./CompressorClient";

export const metadata: Metadata = {
  title: "Image Compressor - Compress JPG, PNG & WebP Online | Filoza",
  description: "Compress JPG, PNG, and WebP images online without losing quality. Adjust compression level, preview results, and download — all processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-compressor"
  },
  openGraph: {
    title: "Image Compressor - Compress JPG, PNG & WebP Online | Filoza",
    description: "Compress JPG, PNG, and WebP images online without losing quality. Adjust compression level, preview results, and download — all processed in your browser.",
    url: "https://filoza.vercel.app/image-compressor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor - Compress JPG, PNG & WebP Online | Filoza",
    description: "Compress JPG, PNG, and WebP images online without losing quality. Adjust compression level, preview results, and download — all processed in your browser.",
  }
};

export default function CompressorPage() {
  const faq = [];
  const jsonLd = generateToolJsonLd('image-compressor', 'Image Compressor', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CompressorClient />
    </>
  );
}
