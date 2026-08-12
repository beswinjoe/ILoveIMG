import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import BlurImageClient from './BlurImageClient';

export const metadata: Metadata = {
  title: "Blur Image Online - Apply Gaussian Blur Effect | Filoza",
  description: "Apply a gaussian blur effect to images online. Adjust blur intensity for JPG, PNG, and WebP images. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/blur-image"
  },
  openGraph: {
    title: "Blur Image Online - Apply Gaussian Blur Effect | Filoza",
    description: "Apply a gaussian blur effect to images online. Adjust blur intensity for JPG, PNG, and WebP images. Processed locally in your browser.",
    url: "https://filoza.vercel.app/blur-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blur Image Online - Apply Gaussian Blur Effect | Filoza",
    description: "Apply a gaussian blur effect to images online. Adjust blur intensity for JPG, PNG, and WebP images. Processed locally in your browser.",
  }
};

export default function BlurImagePage() {
  const faq = [
        { question: "Is my image uploaded?", answer: "No. Filoza processes your image entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('blur-image', 'Blur Image', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <BlurImageClient />
    </>
  );
}
