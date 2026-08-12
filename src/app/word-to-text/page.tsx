import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import WordToTextClient from './WordToTextClient';

export const metadata: Metadata = {
  title: "Word to Text Converter - Extract Text from DOCX | Filoza",
  description: "Extract raw text from Word (DOCX) documents online. Remove all formatting and get plain text output. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/word-to-text"
  },
  openGraph: {
    title: "Word to Text Converter - Extract Text from DOCX | Filoza",
    description: "Extract raw text from Word (DOCX) documents online. Remove all formatting and get plain text output. Processed in your browser.",
    url: "https://filoza.vercel.app/word-to-text",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to Text Converter - Extract Text from DOCX | Filoza",
    description: "Extract raw text from Word (DOCX) documents online. Remove all formatting and get plain text output. Processed in your browser.",
  }
};

export default function WordToTextPage() {
  const faq = [
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('word-to-text', 'Word to Text', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <WordToTextClient />
    </>
  );
}
