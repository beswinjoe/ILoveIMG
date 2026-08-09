import { Metadata } from 'next';
import SpreadsheetToJsonClient from './SpreadsheetToJsonClient';

export const metadata: Metadata = {
  title: "Spreadsheet to JSON Online – Free | Filoza",
  description: "Convert Excel or CSV data into JSON format.",
  alternates: {
    canonical: "https://filoza.vercel.app/spreadsheet-to-json"
  },
  openGraph: {
    title: "Spreadsheet to JSON Online – Free | Filoza",
    description: "Convert Excel or CSV data into JSON format.",
    url: "https://filoza.vercel.app/spreadsheet-to-json",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spreadsheet to JSON Online – Free | Filoza",
    description: "Convert Excel or CSV data into JSON format.",
  }
};

export default function Page() {
  return <SpreadsheetToJsonClient />;
}
