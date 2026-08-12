import { Metadata } from 'next';
import GrayscaleImageClient from './GrayscaleImageClient';

export const metadata: Metadata = {
  title: "Grayscale Image Converter - Convert Images to Black & White | Filoza",
  description: "Convert color images to grayscale (black and white) online. Supports JPG, PNG, and WebP. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/grayscale-image"
  },
  openGraph: {
    title: "Grayscale Image Converter - Convert Images to Black & White | Filoza",
    description: "Convert color images to grayscale (black and white) online. Supports JPG, PNG, and WebP. Processed locally in your browser.",
    url: "https://filoza.vercel.app/grayscale-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grayscale Image Converter - Convert Images to Black & White | Filoza",
    description: "Convert color images to grayscale (black and white) online. Supports JPG, PNG, and WebP. Processed locally in your browser.",
  }
};

export default function Page() {
  return <GrayscaleImageClient />;
}
