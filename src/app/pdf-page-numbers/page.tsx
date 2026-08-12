import { Metadata } from 'next';
import PdfPageNumbersClient from './PdfPageNumbersClient';

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF - Number PDF Pages Online | Filoza",
  description: "Add page numbers to your PDF documents online. Choose position and starting number. Free and processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-page-numbers"
  },
  openGraph: {
    title: "Add Page Numbers to PDF - Number PDF Pages Online | Filoza",
    description: "Add page numbers to your PDF documents online. Choose position and starting number. Free and processed in your browser.",
    url: "https://filoza.vercel.app/pdf-page-numbers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Page Numbers to PDF - Number PDF Pages Online | Filoza",
    description: "Add page numbers to your PDF documents online. Choose position and starting number. Free and processed in your browser.",
  }
};

export default function Page() {
  return <PdfPageNumbersClient />;
}
