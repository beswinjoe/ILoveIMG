import { Metadata } from 'next';
import GrayscaleImageClient from './GrayscaleImageClient';

export const metadata: Metadata = {
  title: "Grayscale Image Online – Free | Filoza",
  description: "Convert images to black and white. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/grayscale-image"
  },
  openGraph: {
    title: "Grayscale Image Online – Free | Filoza",
    description: "Convert images to black and white. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/grayscale-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grayscale Image Online – Free | Filoza",
    description: "Convert images to black and white. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function Page() {
  return <GrayscaleImageClient />;
}
