import { Metadata } from 'next';
import WordToImagesClient from './WordToImagesClient';

export const metadata: Metadata = {
  title: "Word to Images Online – Free | Filoza",
  description: "Convert a Word document into high-quality images.",
  alternates: {
    canonical: "https://filoza.vercel.app/word-to-images"
  },
  openGraph: {
    title: "Word to Images Online – Free | Filoza",
    description: "Convert a Word document into high-quality images.",
    url: "https://filoza.vercel.app/word-to-images",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word to Images Online – Free | Filoza",
    description: "Convert a Word document into high-quality images.",
  }
};

export default function Page() {
  return <WordToImagesClient />;
}
