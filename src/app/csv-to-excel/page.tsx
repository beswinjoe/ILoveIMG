import { Metadata } from 'next';
import CsvToExcelClient from './CsvToExcelClient';

export const metadata: Metadata = {
  title: "CSV to Excel Online – Free | Filoza",
  description: "Convert CSV files to Excel (.xlsx) format.",
  alternates: {
    canonical: "https://filoza.vercel.app/csv-to-excel"
  },
  openGraph: {
    title: "CSV to Excel Online – Free | Filoza",
    description: "Convert CSV files to Excel (.xlsx) format.",
    url: "https://filoza.vercel.app/csv-to-excel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to Excel Online – Free | Filoza",
    description: "Convert CSV files to Excel (.xlsx) format.",
  }
};

export default function Page() {
  return <CsvToExcelClient />;
}
