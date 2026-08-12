import { Metadata } from 'next';
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

export default function Page() {
  return <PdfToWordClient />;
}
