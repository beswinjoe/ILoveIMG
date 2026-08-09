import { Metadata } from 'next';
import TxtToDocxClient from './TxtToDocxClient';

export const metadata: Metadata = {
  title: "TXT to DOCX Online – Free | Filoza",
  description: "Convert plain text files into editable Word documents.",
  alternates: {
    canonical: "https://filoza.vercel.app/txt-to-docx"
  },
  openGraph: {
    title: "TXT to DOCX Online – Free | Filoza",
    description: "Convert plain text files into editable Word documents.",
    url: "https://filoza.vercel.app/txt-to-docx",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TXT to DOCX Online – Free | Filoza",
    description: "Convert plain text files into editable Word documents.",
  }
};

export default function Page() {
  return <TxtToDocxClient />;
}
