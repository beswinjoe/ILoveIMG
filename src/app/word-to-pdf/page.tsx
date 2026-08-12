import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import WordToPdfClient from './WordToPdfClient';

export const metadata: Metadata = {
  title: "Word to PDF Converter - Convert DOCX to PDF Online | Filoza",
  description: "Convert Word documents (DOCX) to PDF format online. Preserves formatting and layout. Free and processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/word-to-pdf"
  },
  openGraph: {
    title: "Word to PDF Converter - Convert DOCX to PDF Online | Filoza",
    description: "Convert Word documents (DOCX) to PDF format online. Preserves formatting and layout. Free and processed in your browser.",
    url: "https://filoza.vercel.app/word-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to PDF Converter - Convert DOCX to PDF Online | Filoza",
    description: "Convert Word documents (DOCX) to PDF format online. Preserves formatting and layout. Free and processed in your browser.",
  }
};

export default function WordToPdfPage() {
  const faq = [
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('word-to-pdf', 'Word to PDF', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <WordToPdfClient />
    </>
  );
}
