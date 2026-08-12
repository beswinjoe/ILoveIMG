import { Metadata } from 'next';
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

export default function Page() {
  return <CsvToExcelClient />;
}
