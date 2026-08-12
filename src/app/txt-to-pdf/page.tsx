import { Metadata } from 'next';
import TxtToPdfClient from './TxtToPdfClient';

export const metadata: Metadata = {
  title: "TXT to PDF Converter - Convert Text Files to PDF Online | Filoza",
  description: "Convert plain text (.txt) files to formatted PDF documents online. Upload a text file and download a clean PDF. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/txt-to-pdf"
  },
  openGraph: {
    title: "TXT to PDF Converter - Convert Text Files to PDF Online | Filoza",
    description: "Convert plain text (.txt) files to formatted PDF documents online. Upload a text file and download a clean PDF. Processed in your browser.",
    url: "https://filoza.vercel.app/txt-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TXT to PDF Converter - Convert Text Files to PDF Online | Filoza",
    description: "Convert plain text (.txt) files to formatted PDF documents online. Upload a text file and download a clean PDF. Processed in your browser.",
  }
};

export default function Page() {
  return <TxtToPdfClient />;
}
