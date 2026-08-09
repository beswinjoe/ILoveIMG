import { Metadata } from 'next';
import JsonToCsvClient from './JsonToCsvClient';

export const metadata: Metadata = {
  title: 'JSON to CSV Converter - Free Online | Filoza',
  description: 'Convert JSON data into CSV format.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/json-to-csv'
  }
};

export default function Page() {
  return <JsonToCsvClient />;
}
