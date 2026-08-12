import { Metadata } from 'next';
import BlurImageClient from './BlurImageClient';

export const metadata: Metadata = {
  title: "Blur Image Online - Apply Gaussian Blur Effect | Filoza",
  description: "Apply a gaussian blur effect to images online. Adjust blur intensity for JPG, PNG, and WebP images. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/blur-image"
  },
  openGraph: {
    title: "Blur Image Online - Apply Gaussian Blur Effect | Filoza",
    description: "Apply a gaussian blur effect to images online. Adjust blur intensity for JPG, PNG, and WebP images. Processed locally in your browser.",
    url: "https://filoza.vercel.app/blur-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blur Image Online - Apply Gaussian Blur Effect | Filoza",
    description: "Apply a gaussian blur effect to images online. Adjust blur intensity for JPG, PNG, and WebP images. Processed locally in your browser.",
  }
};

export default function Page() {
  return <BlurImageClient />;
}
