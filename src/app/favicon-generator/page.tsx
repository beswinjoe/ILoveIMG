import { Metadata } from 'next';
import FaviconGeneratorClient from './FaviconGeneratorClient';

export const metadata: Metadata = {
  title: "Favicon Generator Online – Free | Filoza",
  description: "Generate 32x32 favicons from images. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/favicon-generator"
  },
  openGraph: {
    title: "Favicon Generator Online – Free | Filoza",
    description: "Generate 32x32 favicons from images. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/favicon-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favicon Generator Online – Free | Filoza",
    description: "Generate 32x32 favicons from images. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function Page() {
  return <FaviconGeneratorClient />;
}
