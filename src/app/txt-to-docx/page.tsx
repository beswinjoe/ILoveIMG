import { Metadata } from 'next';
import TxtToDocxClient from './TxtToDocxClient';

export const metadata: Metadata = {
  title: "TXT to DOCX Converter - Convert Text to Word Online | Filoza",
  description: "Convert plain text (.txt) files to editable Word (DOCX) documents online. Processed in your browser with no file uploads.",
  alternates: {
    canonical: "https://filoza.vercel.app/txt-to-docx"
  },
  openGraph: {
    title: "TXT to DOCX Converter - Convert Text to Word Online | Filoza",
    description: "Convert plain text (.txt) files to editable Word (DOCX) documents online. Processed in your browser with no file uploads.",
    url: "https://filoza.vercel.app/txt-to-docx",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TXT to DOCX Converter - Convert Text to Word Online | Filoza",
    description: "Convert plain text (.txt) files to editable Word (DOCX) documents online. Processed in your browser with no file uploads.",
  }
};

export default function Page() {
  return <TxtToDocxClient />;
}
