import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import GrayscaleImageClient from './GrayscaleImageClient';

export const metadata: Metadata = {
  title: "Grayscale Image Converter - Convert Images to Black & White | Filoza",
  description: "Convert color images to grayscale (black and white) online. Supports JPG, PNG, and WebP. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/grayscale-image"
  },
  openGraph: {
    title: "Grayscale Image Converter - Convert Images to Black & White | Filoza",
    description: "Convert color images to grayscale (black and white) online. Supports JPG, PNG, and WebP. Processed locally in your browser.",
    url: "https://filoza.vercel.app/grayscale-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grayscale Image Converter - Convert Images to Black & White | Filoza",
    description: "Convert color images to grayscale (black and white) online. Supports JPG, PNG, and WebP. Processed locally in your browser.",
  }
};

export default function GrayscaleImagePage() {
  const faq = [
        { question: "Is my image uploaded?", answer: "No. Filoza processes your image entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('grayscale-image', 'Grayscale Image', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <GrayscaleImageClient />
    </>
  );
}
