import { Metadata } from 'next';
import MarkdownToHtmlClient from './MarkdownToHtmlClient';

export const metadata: Metadata = {
  title: "Markdown to HTML Converter - Convert MD to HTML Online | Filoza",
  description: "Convert Markdown documents to clean HTML code online. Supports headings, lists, code blocks, and more. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/markdown-to-html"
  },
  openGraph: {
    title: "Markdown to HTML Converter - Convert MD to HTML Online | Filoza",
    description: "Convert Markdown documents to clean HTML code online. Supports headings, lists, code blocks, and more. Processed in your browser.",
    url: "https://filoza.vercel.app/markdown-to-html",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown to HTML Converter - Convert MD to HTML Online | Filoza",
    description: "Convert Markdown documents to clean HTML code online. Supports headings, lists, code blocks, and more. Processed in your browser.",
  }
};

export default function Page() {
  return <MarkdownToHtmlClient />;
}
