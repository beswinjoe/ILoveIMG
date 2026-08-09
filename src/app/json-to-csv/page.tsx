import { Metadata } from 'next';
import JsonToCsvClient from './JsonToCsvClient';

export const metadata: Metadata = {
  title: "JSON to CSV Online – Free | Filoza",
  description: "Convert JSON data into CSV format.",
  alternates: {
    canonical: "https://filoza.vercel.app/json-to-csv"
  },
  openGraph: {
    title: "JSON to CSV Online – Free | Filoza",
    description: "Convert JSON data into CSV format.",
    url: "https://filoza.vercel.app/json-to-csv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JSON to CSV Online – Free | Filoza",
    description: "Convert JSON data into CSV format.",
  }
};

export default function Page() {
  return <JsonToCsvClient />;
}
