import { Metadata } from 'next';
import PdfMetadataClient from './PdfMetadataClient';

export const metadata: Metadata = {
  title: 'PDF Metadata Viewer | Filoza',
  description: 'View or remove metadata from your PDF files.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/pdf-metadata'
  }
};

export default function Page() {
  return <PdfMetadataClient />;
}
