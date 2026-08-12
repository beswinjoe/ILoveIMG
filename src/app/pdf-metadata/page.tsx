import { Metadata } from 'next';
import PdfMetadataClient from './PdfMetadataClient';

export const metadata: Metadata = {
  title: "PDF Metadata Editor - View & Remove PDF Metadata | Filoza",
  description: "View or remove metadata from PDF files online. Clean author, title, and other hidden information from your PDFs. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-metadata"
  },
  openGraph: {
    title: "PDF Metadata Editor - View & Remove PDF Metadata | Filoza",
    description: "View or remove metadata from PDF files online. Clean author, title, and other hidden information from your PDFs. Processed in your browser.",
    url: "https://filoza.vercel.app/pdf-metadata",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Metadata Editor - View & Remove PDF Metadata | Filoza",
    description: "View or remove metadata from PDF files online. Clean author, title, and other hidden information from your PDFs. Processed in your browser.",
  }
};

export default function Page() {
  return <PdfMetadataClient />;
}
