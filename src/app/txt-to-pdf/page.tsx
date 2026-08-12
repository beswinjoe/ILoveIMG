import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import TxtToPdfClient from './TxtToPdfClient';

export const metadata: Metadata = {
  title: "TXT to PDF Converter - Convert Text Files to PDF Online | Filoza",
  description: "Convert plain text (.txt) files to formatted PDF documents online. Upload a text file and download a clean PDF. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/txt-to-pdf"
  },
  openGraph: {
    title: "TXT to PDF Converter - Convert Text Files to PDF Online | Filoza",
    description: "Convert plain text (.txt) files to formatted PDF documents online. Upload a text file and download a clean PDF. Processed in your browser.",
    url: "https://filoza.vercel.app/txt-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TXT to PDF Converter - Convert Text Files to PDF Online | Filoza",
    description: "Convert plain text (.txt) files to formatted PDF documents online. Upload a text file and download a clean PDF. Processed in your browser.",
  }
};

export default function TxtToPdfPage() {
  const faq = [
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('txt-to-pdf', 'TXT to PDF', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <TxtToPdfClient />
    </>
  );
}
