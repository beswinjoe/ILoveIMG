import { Metadata } from 'next';
import MarkdownToHtmlClient from './MarkdownToHtmlClient';

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter - Free Online | Filoza',
  description: 'Convert Markdown documents to clean HTML code.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/markdown-to-html'
  }
};

export default function Page() {
  return <MarkdownToHtmlClient />;
}
