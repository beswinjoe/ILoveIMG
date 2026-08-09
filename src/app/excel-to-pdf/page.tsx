import { Metadata } from 'next';
import ExcelToPdfClient from './ExcelToPdfClient';

export const metadata: Metadata = {
  title: 'Excel to PDF Converter - Free Online | Filoza',
  description: 'Convert Excel files (.xlsx) to PDF format.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/excel-to-pdf'
  }
};

export default function Page() {
  return <ExcelToPdfClient />;
}
