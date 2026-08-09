import { Metadata } from 'next';
import CsvToPdfClient from './CsvToPdfClient';

export const metadata: Metadata = {
  title: "CSV to PDF Online – Free | Filoza",
  description: "Convert CSV files to PDF format.",
  alternates: {
    canonical: "https://filoza.vercel.app/csv-to-pdf"
  },
  openGraph: {
    title: "CSV to PDF Online – Free | Filoza",
    description: "Convert CSV files to PDF format.",
    url: "https://filoza.vercel.app/csv-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSV to PDF Online – Free | Filoza",
    description: "Convert CSV files to PDF format.",
  }
};

export default function Page() {
  return <CsvToPdfClient />;
}
