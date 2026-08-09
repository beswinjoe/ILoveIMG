import { Metadata } from 'next';
import TxtToPdfClient from './TxtToPdfClient';

export const metadata: Metadata = {
  title: 'TXT to PDF Converter - Free Online | Filoza',
  description: 'Convert plain text files to PDF documents.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/txt-to-pdf'
  }
};

export default function Page() {
  return <TxtToPdfClient />;
}
