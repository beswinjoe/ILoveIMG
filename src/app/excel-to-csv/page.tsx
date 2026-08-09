import { Metadata } from 'next';
import ExcelToCsvClient from './ExcelToCsvClient';

export const metadata: Metadata = {
  title: "Excel to CSV Online – Free | Filoza",
  description: "Convert Excel files (.xlsx) to CSV format easily.",
  alternates: {
    canonical: "https://filoza.vercel.app/excel-to-csv"
  },
  openGraph: {
    title: "Excel to CSV Online – Free | Filoza",
    description: "Convert Excel files (.xlsx) to CSV format easily.",
    url: "https://filoza.vercel.app/excel-to-csv",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel to CSV Online – Free | Filoza",
    description: "Convert Excel files (.xlsx) to CSV format easily.",
  }
};

export default function Page() {
  return <ExcelToCsvClient />;
}
