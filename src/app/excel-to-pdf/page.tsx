import { Metadata } from 'next';
import ExcelToPdfClient from './ExcelToPdfClient';

export const metadata: Metadata = {
  title: "Excel to PDF Online – Free | Filoza",
  description: "Convert Excel files (.xlsx) to PDF format.",
  alternates: {
    canonical: "https://filoza.vercel.app/excel-to-pdf"
  },
  openGraph: {
    title: "Excel to PDF Online – Free | Filoza",
    description: "Convert Excel files (.xlsx) to PDF format.",
    url: "https://filoza.vercel.app/excel-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel to PDF Online – Free | Filoza",
    description: "Convert Excel files (.xlsx) to PDF format.",
  }
};

export default function Page() {
  return <ExcelToPdfClient />;
}
