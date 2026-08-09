import { Metadata } from 'next';
import PdfToWordClient from './PdfToWordClient';

export const metadata: Metadata = {
  title: 'PDF to Word Converter - Free Online | Filoza',
  description: 'Convert PDF documents into editable Word (DOCX) files.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/pdf-to-word'
  }
};

export default function Page() {
  return <PdfToWordClient />;
}
