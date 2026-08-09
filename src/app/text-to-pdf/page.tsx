import { Metadata } from 'next';
import TextToPdfClient from './TextToPdfClient';

export const metadata: Metadata = {
  title: "Text to PDF Online – Free | Filoza",
  description: "Convert text to a neat PDF document",
  alternates: {
    canonical: "https://filoza.vercel.app/text-to-pdf"
  },
  openGraph: {
    title: "Text to PDF Online – Free | Filoza",
    description: "Convert text to a neat PDF document",
    url: "https://filoza.vercel.app/text-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to PDF Online – Free | Filoza",
    description: "Convert text to a neat PDF document",
  }
};

export default function Page() {
  return <TextToPdfClient />;
}
