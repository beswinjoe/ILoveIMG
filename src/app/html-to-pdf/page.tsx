import { Metadata } from 'next';
import HtmlToPdfClient from './HtmlToPdfClient';

export const metadata: Metadata = {
  title: 'HTML to PDF Converter - Free Online | Filoza',
  description: 'Convert HTML files to PDF format.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/html-to-pdf'
  }
};

export default function Page() {
  return <HtmlToPdfClient />;
}
