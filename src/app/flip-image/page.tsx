import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import FlipImageClient from './FlipImageClient';

export const metadata: Metadata = {
  title: "Flip Image Online - Mirror Images Horizontally or Vertically | Filoza",
  description: "Flip images horizontally or vertically online. Supports JPG, PNG, and WebP formats. Free and processed entirely in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/flip-image"
  },
  openGraph: {
    title: "Flip Image Online - Mirror Images Horizontally or Vertically | Filoza",
    description: "Flip images horizontally or vertically online. Supports JPG, PNG, and WebP formats. Free and processed entirely in your browser.",
    url: "https://filoza.vercel.app/flip-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flip Image Online - Mirror Images Horizontally or Vertically | Filoza",
    description: "Flip images horizontally or vertically online. Supports JPG, PNG, and WebP formats. Free and processed entirely in your browser.",
  }
};

export default function FlipImagePage() {
  const faq = [
        { question: "Is my image uploaded?", answer: "No. Filoza processes your image entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('flip-image', 'Flip Image', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <FlipImageClient />
    </>
  );
}
