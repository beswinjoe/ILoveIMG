import { Metadata } from 'next';
import MarkdownToHtmlClient from './MarkdownToHtmlClient';

export const metadata: Metadata = {
  title: "Markdown to HTML Online – Free | Filoza",
  description: "Convert Markdown documents to clean HTML code.",
  alternates: {
    canonical: "https://filoza.vercel.app/markdown-to-html"
  },
  openGraph: {
    title: "Markdown to HTML Online – Free | Filoza",
    description: "Convert Markdown documents to clean HTML code.",
    url: "https://filoza.vercel.app/markdown-to-html",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown to HTML Online – Free | Filoza",
    description: "Convert Markdown documents to clean HTML code.",
  }
};

export default function Page() {
  return <MarkdownToHtmlClient />;
}
