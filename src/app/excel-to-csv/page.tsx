import { Metadata } from 'next';
import ExcelToCsvClient from './ExcelToCsvClient';

export const metadata: Metadata = {
  title: "Excel to CSV Converter - Convert XLSX to CSV Online | Filoza",
  description: "Convert Excel spreadsheets (XLSX) to CSV format online. Export your spreadsheet data as a comma-separated file. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/excel-to-csv"
  },
  openGraph: {
    title: "Excel to CSV Converter - Convert XLSX to CSV Online | Filoza",
    description: "Convert Excel spreadsheets (XLSX) to CSV format online. Export your spreadsheet data as a comma-separated file. Processed in your browser.",
    url: "https://filoza.vercel.app/excel-to-csv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel to CSV Converter - Convert XLSX to CSV Online | Filoza",
    description: "Convert Excel spreadsheets (XLSX) to CSV format online. Export your spreadsheet data as a comma-separated file. Processed in your browser.",
  }
};

export default function Page() {
  return <ExcelToCsvClient />;
}
