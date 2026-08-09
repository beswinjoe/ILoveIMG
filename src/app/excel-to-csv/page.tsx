import { Metadata } from 'next';
import ExcelToCsvClient from './ExcelToCsvClient';

export const metadata: Metadata = {
  title: 'Excel to CSV Converter - Free Online | Filoza',
  description: 'Convert Excel files (.xlsx) to CSV format easily.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/excel-to-csv'
  }
};

export default function Page() {
  return <ExcelToCsvClient />;
}
