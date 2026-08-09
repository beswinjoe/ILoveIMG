import { Metadata } from 'next';
import HtmlToPdfClient from './HtmlToPdfClient';

export const metadata: Metadata = {
  title: "HTML to PDF Online – Free | Filoza",
  description: "Convert HTML files to PDF format.",
  alternates: {
    canonical: "https://filoza.vercel.app/html-to-pdf"
  },
  openGraph: {
    title: "HTML to PDF Online – Free | Filoza",
    description: "Convert HTML files to PDF format.",
    url: "https://filoza.vercel.app/html-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML to PDF Online – Free | Filoza",
    description: "Convert HTML files to PDF format.",
  }
};

export default function Page() {
  return <HtmlToPdfClient />;
}
