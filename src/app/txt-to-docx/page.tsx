import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import TxtToDocxClient from './TxtToDocxClient';

export const metadata: Metadata = {
  title: "TXT to DOCX Converter - Convert Text to Word Online | Filoza",
  description: "Convert plain text (.txt) files to editable Word (DOCX) documents online. Processed in your browser with no file uploads.",
  alternates: {
    canonical: "https://filoza.vercel.app/txt-to-docx"
  },
  openGraph: {
    title: "TXT to DOCX Converter - Convert Text to Word Online | Filoza",
    description: "Convert plain text (.txt) files to editable Word (DOCX) documents online. Processed in your browser with no file uploads.",
    url: "https://filoza.vercel.app/txt-to-docx",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TXT to DOCX Converter - Convert Text to Word Online | Filoza",
    description: "Convert plain text (.txt) files to editable Word (DOCX) documents online. Processed in your browser with no file uploads.",
  }
};

export default function TxtToDocxPage() {
  const faq = [
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('txt-to-docx', 'TXT to DOCX', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <TxtToDocxClient />
    </>
  );
}
