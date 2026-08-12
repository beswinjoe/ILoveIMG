import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import RotateImageClient from './RotateImageClient';

export const metadata: Metadata = {
  title: "Rotate Image Online - Rotate JPG, PNG & WebP | Filoza",
  description: "Rotate images 90°, 180°, or 270° online. Supports JPG, PNG, and WebP. Free tool that processes images locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/rotate-image"
  },
  openGraph: {
    title: "Rotate Image Online - Rotate JPG, PNG & WebP | Filoza",
    description: "Rotate images 90°, 180°, or 270° online. Supports JPG, PNG, and WebP. Free tool that processes images locally in your browser.",
    url: "https://filoza.vercel.app/rotate-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate Image Online - Rotate JPG, PNG & WebP | Filoza",
    description: "Rotate images 90°, 180°, or 270° online. Supports JPG, PNG, and WebP. Free tool that processes images locally in your browser.",
  }
};

export default function RotateImagePage() {
  const faq = [
        { question: "Is my image uploaded?", answer: "No. Filoza processes your image entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('rotate-image', 'Rotate Image', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <RotateImageClient />
    </>
  );
}
