import { Metadata } from 'next';
import TxtToPdfClient from './TxtToPdfClient';

export const metadata: Metadata = {
  title: "TXT to PDF Online – Free | Filoza",
  description: "Convert plain text files to PDF documents.",
  alternates: {
    canonical: "https://filoza.vercel.app/txt-to-pdf"
  },
  openGraph: {
    title: "TXT to PDF Online – Free | Filoza",
    description: "Convert plain text files to PDF documents.",
    url: "https://filoza.vercel.app/txt-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TXT to PDF Online – Free | Filoza",
    description: "Convert plain text files to PDF documents.",
  }
};

export default function Page() {
  return <TxtToPdfClient />;
}
