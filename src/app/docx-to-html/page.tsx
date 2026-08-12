import { Metadata } from 'next';
import DocxToHtmlClient from './DocxToHtmlClient';

export const metadata: Metadata = {
  title: "DOCX to HTML Converter - Convert Word to HTML Online | Filoza",
  description: "Convert Word documents (DOCX) to clean HTML code online. Get web-ready HTML from your Word files. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/docx-to-html"
  },
  openGraph: {
    title: "DOCX to HTML Converter - Convert Word to HTML Online | Filoza",
    description: "Convert Word documents (DOCX) to clean HTML code online. Get web-ready HTML from your Word files. Processed in your browser.",
    url: "https://filoza.vercel.app/docx-to-html",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOCX to HTML Converter - Convert Word to HTML Online | Filoza",
    description: "Convert Word documents (DOCX) to clean HTML code online. Get web-ready HTML from your Word files. Processed in your browser.",
  }
};

export default function Page() {
  return <DocxToHtmlClient />;
}
