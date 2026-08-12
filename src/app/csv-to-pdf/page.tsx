import { Metadata } from 'next';
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

export default function Page() {
  return <CsvToPdfClient />;
}
