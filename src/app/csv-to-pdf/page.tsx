import { Metadata } from 'next';
import CsvToPdfClient from './CsvToPdfClient';

export const metadata: Metadata = {
  title: 'CSV to PDF Converter - Free Online | Filoza',
  description: 'Convert CSV files to PDF format.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/csv-to-pdf'
  }
};

export default function Page() {
  return <CsvToPdfClient />;
}
