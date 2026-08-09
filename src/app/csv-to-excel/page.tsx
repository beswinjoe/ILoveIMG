import { Metadata } from 'next';
import CsvToExcelClient from './CsvToExcelClient';

export const metadata: Metadata = {
  title: 'CSV to Excel Converter - Free Online | Filoza',
  description: 'Convert CSV files to Excel (.xlsx) format.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/csv-to-excel'
  }
};

export default function Page() {
  return <CsvToExcelClient />;
}
