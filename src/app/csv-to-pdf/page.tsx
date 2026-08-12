import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import CsvToPdfClient from './CsvToPdfClient';

export const metadata: Metadata = {
  title: "CSV to PDF Converter - Convert CSV Files to PDF Online | Filoza",
  description: "Convert CSV files to formatted PDF tables online. Get a printable PDF from your CSV data. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/csv-to-pdf"
  },
  openGraph: {
    title: "CSV to PDF Converter - Convert CSV Files to PDF Online | Filoza",
    description: "Convert CSV files to formatted PDF tables online. Get a printable PDF from your CSV data. Processed in your browser.",
    url: "https://filoza.vercel.app/csv-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to PDF Converter - Convert CSV Files to PDF Online | Filoza",
    description: "Convert CSV files to formatted PDF tables online. Get a printable PDF from your CSV data. Processed in your browser.",
  }
};

export default function CsvToPdfPage() {
  const faq = [
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('csv-to-pdf', 'CSV to PDF', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CsvToPdfClient />
    </>
  );
}
