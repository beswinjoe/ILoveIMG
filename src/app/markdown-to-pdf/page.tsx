import { Metadata } from 'next';
import MarkdownToPdfClient from './MarkdownToPdfClient';

export const metadata: Metadata = {
  title: "Markdown to PDF Online – Free | Filoza",
  description: "Convert Markdown documents into beautiful PDF files.",
  alternates: {
    canonical: "https://filoza.vercel.app/markdown-to-pdf"
  },
  openGraph: {
    title: "Markdown to PDF Online – Free | Filoza",
    description: "Convert Markdown documents into beautiful PDF files.",
    url: "https://filoza.vercel.app/markdown-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown to PDF Online – Free | Filoza",
    description: "Convert Markdown documents into beautiful PDF files.",
  }
};

export default function Page() {
  return <MarkdownToPdfClient />;
}
