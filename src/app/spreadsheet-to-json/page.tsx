import { Metadata } from 'next';
import SpreadsheetToJsonClient from './SpreadsheetToJsonClient';

export const metadata: Metadata = {
  title: "Spreadsheet to JSON Converter - Convert Excel/CSV to JSON | Filoza",
  description: "Convert Excel or CSV spreadsheet data into JSON format online. Useful for developers working with data APIs. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/spreadsheet-to-json"
  },
  openGraph: {
    title: "Spreadsheet to JSON Converter - Convert Excel/CSV to JSON | Filoza",
    description: "Convert Excel or CSV spreadsheet data into JSON format online. Useful for developers working with data APIs. Processed in your browser.",
    url: "https://filoza.vercel.app/spreadsheet-to-json",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spreadsheet to JSON Converter - Convert Excel/CSV to JSON | Filoza",
    description: "Convert Excel or CSV spreadsheet data into JSON format online. Useful for developers working with data APIs. Processed in your browser.",
  }
};

export default function Page() {
  return <SpreadsheetToJsonClient />;
}
