import { Metadata } from 'next';
import FaviconGeneratorClient from './FaviconGeneratorClient';

export const metadata: Metadata = {
  title: "Favicon Generator - Create Favicons from Images Online | Filoza",
  description: "Generate 32×32 favicon.ico files from any image online. Upload a JPG, PNG, or WebP image and download a ready-to-use favicon.",
  alternates: {
    canonical: "https://filoza.vercel.app/favicon-generator"
  },
  openGraph: {
    title: "Favicon Generator - Create Favicons from Images Online | Filoza",
    description: "Generate 32×32 favicon.ico files from any image online. Upload a JPG, PNG, or WebP image and download a ready-to-use favicon.",
    url: "https://filoza.vercel.app/favicon-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favicon Generator - Create Favicons from Images Online | Filoza",
    description: "Generate 32×32 favicon.ico files from any image online. Upload a JPG, PNG, or WebP image and download a ready-to-use favicon.",
  }
};

export default function Page() {
  return <FaviconGeneratorClient />;
}
