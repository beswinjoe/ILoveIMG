import { Metadata } from 'next';
import HtmlToPdfClient from './HtmlToPdfClient';

export const metadata: Metadata = {
  title: "HTML to PDF Converter - Convert HTML to PDF Online | Filoza",
  description: "Convert HTML files or code to PDF format online. Render web content as a downloadable PDF document. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/html-to-pdf"
  },
  openGraph: {
    title: "HTML to PDF Converter - Convert HTML to PDF Online | Filoza",
    description: "Convert HTML files or code to PDF format online. Render web content as a downloadable PDF document. Processed in your browser.",
    url: "https://filoza.vercel.app/html-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTML to PDF Converter - Convert HTML to PDF Online | Filoza",
    description: "Convert HTML files or code to PDF format online. Render web content as a downloadable PDF document. Processed in your browser.",
  }
};

export default function Page() {
  return <HtmlToPdfClient />;
}
