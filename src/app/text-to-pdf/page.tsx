import { Metadata } from 'next';
import TextToPdfClient from './TextToPdfClient';

export const metadata: Metadata = {
  title: "Text to PDF Converter - Convert Text to PDF Online | Filoza",
  description: "Convert plain text into a formatted PDF document online. Type or paste text and generate a clean PDF file. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/text-to-pdf"
  },
  openGraph: {
    title: "Text to PDF Converter - Convert Text to PDF Online | Filoza",
    description: "Convert plain text into a formatted PDF document online. Type or paste text and generate a clean PDF file. Processed in your browser.",
    url: "https://filoza.vercel.app/text-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to PDF Converter - Convert Text to PDF Online | Filoza",
    description: "Convert plain text into a formatted PDF document online. Type or paste text and generate a clean PDF file. Processed in your browser.",
  }
};

export default function Page() {
  return <TextToPdfClient />;
}
