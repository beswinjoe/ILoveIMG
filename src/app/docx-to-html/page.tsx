import { Metadata } from 'next';
import DocxToHtmlClient from './DocxToHtmlClient';

export const metadata: Metadata = {
  title: "DOCX to HTML Online – Free | Filoza",
  description: "Convert Word documents to clean HTML code.",
  alternates: {
    canonical: "https://filoza.vercel.app/docx-to-html"
  },
  openGraph: {
    title: "DOCX to HTML Online – Free | Filoza",
    description: "Convert Word documents to clean HTML code.",
    url: "https://filoza.vercel.app/docx-to-html",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOCX to HTML Online – Free | Filoza",
    description: "Convert Word documents to clean HTML code.",
  }
};

export default function Page() {
  return <DocxToHtmlClient />;
}
