import { Metadata } from 'next';
import MarkdownToPdfClient from './MarkdownToPdfClient';

export const metadata: Metadata = {
  title: "Markdown to PDF Converter - Convert MD to PDF Online | Filoza",
  description: "Convert Markdown documents into formatted PDF files online. Supports headings, lists, code blocks, and more. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/markdown-to-pdf"
  },
  openGraph: {
    title: "Markdown to PDF Converter - Convert MD to PDF Online | Filoza",
    description: "Convert Markdown documents into formatted PDF files online. Supports headings, lists, code blocks, and more. Processed in your browser.",
    url: "https://filoza.vercel.app/markdown-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown to PDF Converter - Convert MD to PDF Online | Filoza",
    description: "Convert Markdown documents into formatted PDF files online. Supports headings, lists, code blocks, and more. Processed in your browser.",
  }
};

export default function Page() {
  return <MarkdownToPdfClient />;
}
