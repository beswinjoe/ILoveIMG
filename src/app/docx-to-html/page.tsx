import { Metadata } from 'next';
import DocxToHtmlClient from './DocxToHtmlClient';

export const metadata: Metadata = {
  title: 'DOCX to HTML Converter - Free Online | Filoza',
  description: 'Convert Word documents to clean HTML code.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/docx-to-html'
  }
};

export default function Page() {
  return <DocxToHtmlClient />;
}
