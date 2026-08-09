import { Metadata } from 'next';
import PdfPageNumbersClient from './PdfPageNumbersClient';

export const metadata: Metadata = {
  title: "PDF Page Numbers Online – Free | Filoza",
  description: "Add page numbers to your PDFs",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-page-numbers"
  },
  openGraph: {
    title: "PDF Page Numbers Online – Free | Filoza",
    description: "Add page numbers to your PDFs",
    url: "https://filoza.vercel.app/pdf-page-numbers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Page Numbers Online – Free | Filoza",
    description: "Add page numbers to your PDFs",
  }
};

export default function Page() {
  return <PdfPageNumbersClient />;
}
