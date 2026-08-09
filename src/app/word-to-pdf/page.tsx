import { Metadata } from 'next';
import WordToPdfClient from './WordToPdfClient';

export const metadata: Metadata = {
  title: 'Word to PDF Converter - Free Online | Filoza',
  description: 'Convert Word documents (DOCX) to PDF format instantly in your browser.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/word-to-pdf'
  }
};

export default function Page() {
  return <WordToPdfClient />;
}
