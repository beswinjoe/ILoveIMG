import { Metadata } from 'next';
import RotateImageClient from './RotateImageClient';

export const metadata: Metadata = {
  title: "Rotate Image Online – Free | Filoza",
  description: "Rotate your images instantly. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/rotate-image"
  },
  openGraph: {
    title: "Rotate Image Online – Free | Filoza",
    description: "Rotate your images instantly. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/rotate-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate Image Online – Free | Filoza",
    description: "Rotate your images instantly. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function Page() {
  return <RotateImageClient />;
}
