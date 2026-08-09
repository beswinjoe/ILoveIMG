import { Metadata } from 'next';
import SpreadsheetToJsonClient from './SpreadsheetToJsonClient';

export const metadata: Metadata = {
  title: 'Spreadsheet to JSON Converter - Free Online | Filoza',
  description: 'Convert Excel or CSV data into JSON format.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/spreadsheet-to-json'
  }
};

export default function Page() {
  return <SpreadsheetToJsonClient />;
}
