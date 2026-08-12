import { Metadata } from 'next';
import JsonToCsvClient from './JsonToCsvClient';

export const metadata: Metadata = {
  title: "JSON to CSV Converter - Convert JSON Data to CSV Online | Filoza",
  description: "Convert JSON arrays and objects into CSV format online. Useful for data export and spreadsheet import. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/json-to-csv"
  },
  openGraph: {
    title: "JSON to CSV Converter - Convert JSON Data to CSV Online | Filoza",
    description: "Convert JSON arrays and objects into CSV format online. Useful for data export and spreadsheet import. Processed in your browser.",
    url: "https://filoza.vercel.app/json-to-csv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to CSV Converter - Convert JSON Data to CSV Online | Filoza",
    description: "Convert JSON arrays and objects into CSV format online. Useful for data export and spreadsheet import. Processed in your browser.",
  }
};

export default function Page() {
  return <JsonToCsvClient />;
}
