import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import PdfToWordClient from './PdfToWordClient';

export const metadata: Metadata = {
  title: "PDF to Word Converter - Convert PDF to DOCX Online | Filoza",
  description: "Convert PDF documents to editable Word (DOCX) files online. Extract text and structure from PDFs. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-to-word"
  },
  openGraph: {
    title: "PDF to Word Converter - Convert PDF to DOCX Online | Filoza",
    description: "Convert PDF documents to editable Word (DOCX) files online. Extract text and structure from PDFs. Processed in your browser.",
    url: "https://filoza.vercel.app/pdf-to-word",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Word Converter - Convert PDF to DOCX Online | Filoza",
    description: "Convert PDF documents to editable Word (DOCX) files online. Extract text and structure from PDFs. Processed in your browser.",
  }
};

export default function PdfToWordPage() {
  const faq = [
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('pdf-to-word', 'PDF to Word', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <PdfToWordClient />
    </>
  );
}
