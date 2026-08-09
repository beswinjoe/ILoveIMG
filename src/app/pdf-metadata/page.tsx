import { Metadata } from 'next';
import PdfMetadataClient from './PdfMetadataClient';

export const metadata: Metadata = {
  title: "PDF Metadata Online – Free | Filoza",
  description: "View or remove metadata from PDFs",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-metadata"
  },
  openGraph: {
    title: "PDF Metadata Online – Free | Filoza",
    description: "View or remove metadata from PDFs",
    url: "https://filoza.vercel.app/pdf-metadata",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Metadata Online – Free | Filoza",
    description: "View or remove metadata from PDFs",
  }
};

export default function Page() {
  return <PdfMetadataClient />;
}
