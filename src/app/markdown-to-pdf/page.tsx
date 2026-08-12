import { Metadata } from 'next';
import { generateToolJsonLd } from "@/lib/seo";
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

export default function MarkdownToPdfPage() {
  const faq = [
        { question: "Is my file uploaded anywhere?", answer: "No. Filoza processes your files entirely within your browser for 100% privacy." }
      ];
  const jsonLd = generateToolJsonLd('markdown-to-pdf', 'Markdown to PDF', faq);

  return (
    <>
      {jsonLd.map((schema, idx) => (
        <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <MarkdownToPdfClient />
    </>
  );
}
