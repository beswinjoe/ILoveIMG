import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
import CsvToExcelClient from './CsvToExcelClient';

export const metadata: Metadata = {
  title: "CSV to Excel Converter - Convert CSV to XLSX Online | Filoza",
  description: "Convert CSV files to Excel (XLSX) format online. Open CSV data in Excel with proper columns. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/csv-to-excel"
  },
  openGraph: {
    title: "CSV to Excel Converter - Convert CSV to XLSX Online | Filoza",
    description: "Convert CSV files to Excel (XLSX) format online. Open CSV data in Excel with proper columns. Processed in your browser.",
    url: "https://filoza.vercel.app/csv-to-excel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to Excel Converter - Convert CSV to XLSX Online | Filoza",
    description: "Convert CSV files to Excel (XLSX) format online. Open CSV data in Excel with proper columns. Processed in your browser.",
  }
};

export default function CsvToExcelPage() {
  const faq = [
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('csv-to-excel', 'CSV to Excel', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <CsvToExcelClient />
    </>
  );
}
