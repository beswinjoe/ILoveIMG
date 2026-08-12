import { Metadata } from 'next';
import ExcelToPdfClient from './ExcelToPdfClient';

export const metadata: Metadata = {
  title: "Excel to PDF Converter - Convert XLSX to PDF Online | Filoza",
  description: "Convert Excel spreadsheets (XLSX) to PDF format online. Preserve table structure in a printable PDF. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/excel-to-pdf"
  },
  openGraph: {
    title: "Excel to PDF Converter - Convert XLSX to PDF Online | Filoza",
    description: "Convert Excel spreadsheets (XLSX) to PDF format online. Preserve table structure in a printable PDF. Processed in your browser.",
    url: "https://filoza.vercel.app/excel-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel to PDF Converter - Convert XLSX to PDF Online | Filoza",
    description: "Convert Excel spreadsheets (XLSX) to PDF format online. Preserve table structure in a printable PDF. Processed in your browser.",
  }
};

export default function Page() {
  return <ExcelToPdfClient />;
}
