import { Metadata } from 'next';
import MarkdownToPdfClient from './MarkdownToPdfClient';

export const metadata: Metadata = {
  title: 'Markdown to PDF Converter - Free Online | Filoza',
  description: 'Convert Markdown documents into beautiful PDF files.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/markdown-to-pdf'
  }
};

export default function Page() {
  return <MarkdownToPdfClient />;
}
