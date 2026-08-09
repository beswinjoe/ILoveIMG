import { Metadata } from 'next';
import WordToPdfClient from './WordToPdfClient';

export const metadata: Metadata = {
  title: "Word to PDF Online – Free | Filoza",
  description: "Convert Word documents (DOCX) to PDF format instantly.",
  alternates: {
    canonical: "https://filoza.vercel.app/word-to-pdf"
  },
  openGraph: {
    title: "Word to PDF Online – Free | Filoza",
    description: "Convert Word documents (DOCX) to PDF format instantly.",
    url: "https://filoza.vercel.app/word-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to PDF Online – Free | Filoza",
    description: "Convert Word documents (DOCX) to PDF format instantly.",
  }
};

export default function Page() {
  return <WordToPdfClient />;
}
