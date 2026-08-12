import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import ExifRemoverClient from './ExifRemoverClient';

export const metadata: Metadata = {
  title: "EXIF Remover - Remove Metadata from Images Online | Filoza",
  description: "Remove hidden EXIF metadata from images online. Strip location data, camera info, and other metadata for privacy. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/exif-remover"
  },
  openGraph: {
    title: "EXIF Remover - Remove Metadata from Images Online | Filoza",
    description: "Remove hidden EXIF metadata from images online. Strip location data, camera info, and other metadata for privacy. Processed in your browser.",
    url: "https://filoza.vercel.app/exif-remover",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EXIF Remover - Remove Metadata from Images Online | Filoza",
    description: "Remove hidden EXIF metadata from images online. Strip location data, camera info, and other metadata for privacy. Processed in your browser.",
  }
};

export default function ExifRemoverPage() {
  const faq = [
        { question: "Are my images uploaded anywhere?", answer: "No. Filoza strips the metadata entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('exif-remover', 'EXIF Remover', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ExifRemoverClient />
    </>
  );
}
