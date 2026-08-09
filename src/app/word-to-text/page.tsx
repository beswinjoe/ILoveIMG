import { Metadata } from 'next';
import WordToTextClient from './WordToTextClient';

export const metadata: Metadata = {
  title: "Word to Text Online – Free | Filoza",
  description: "Extract raw text from Word documents easily.",
  alternates: {
    canonical: "https://filoza.vercel.app/word-to-text"
  },
  openGraph: {
    title: "Word to Text Online – Free | Filoza",
    description: "Extract raw text from Word documents easily.",
    url: "https://filoza.vercel.app/word-to-text",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to Text Online – Free | Filoza",
    description: "Extract raw text from Word documents easily.",
  }
};

export default function Page() {
  return <WordToTextClient />;
}
