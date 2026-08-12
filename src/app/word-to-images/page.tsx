import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import WordToImagesClient from './WordToImagesClient';

export const metadata: Metadata = {
  title: "Word to Images - Convert DOCX Pages to Images | Filoza",
  description: "Convert Word document pages into high-quality images online. Each page becomes a separate image file. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/word-to-images"
  },
  openGraph: {
    title: "Word to Images - Convert DOCX Pages to Images | Filoza",
    description: "Convert Word document pages into high-quality images online. Each page becomes a separate image file. Processed in your browser.",
    url: "https://filoza.vercel.app/word-to-images",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to Images - Convert DOCX Pages to Images | Filoza",
    description: "Convert Word document pages into high-quality images online. Each page becomes a separate image file. Processed in your browser.",
  }
};

export default function WordToImagesPage() {
  const faq = [
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('word-to-images', 'Word to Images', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <WordToImagesClient />
    </>
  );
}
