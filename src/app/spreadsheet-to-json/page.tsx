import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import SpreadsheetToJsonClient from './SpreadsheetToJsonClient';

export const metadata: Metadata = {
  title: "Spreadsheet to JSON Converter - Convert Excel/CSV to JSON | Filoza",
  description: "Convert Excel or CSV spreadsheet data into JSON format online. Useful for developers working with data APIs. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/spreadsheet-to-json"
  },
  openGraph: {
    title: "Spreadsheet to JSON Converter - Convert Excel/CSV to JSON | Filoza",
    description: "Convert Excel or CSV spreadsheet data into JSON format online. Useful for developers working with data APIs. Processed in your browser.",
    url: "https://filoza.vercel.app/spreadsheet-to-json",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spreadsheet to JSON Converter - Convert Excel/CSV to JSON | Filoza",
    description: "Convert Excel or CSV spreadsheet data into JSON format online. Useful for developers working with data APIs. Processed in your browser.",
  }
};

export default function SpreadsheetToJsonPage() {
  const faq = [
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('spreadsheet-to-json', 'Spreadsheet to JSON', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <SpreadsheetToJsonClient />
    </>
  );
}
