import { Metadata } from 'next';
import PdfToWordClient from './PdfToWordClient';

export const metadata: Metadata = {
  title: "PDF to Word Online – Free | Filoza",
  description: "Convert PDF documents into editable Word (DOCX) files.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-to-word"
  },
  openGraph: {
    title: "PDF to Word Online – Free | Filoza",
    description: "Convert PDF documents into editable Word (DOCX) files.",
    url: "https://filoza.vercel.app/pdf-to-word",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Word Online – Free | Filoza",
    description: "Convert PDF documents into editable Word (DOCX) files.",
  }
};

export default function Page() {
  return <PdfToWordClient />;
}
