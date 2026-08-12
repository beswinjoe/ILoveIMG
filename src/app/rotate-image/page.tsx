import { Metadata } from 'next';
import RotateImageClient from './RotateImageClient';

export const metadata: Metadata = {
  title: "Rotate Image Online - Rotate JPG, PNG & WebP | Filoza",
  description: "Rotate images 90°, 180°, or 270° online. Supports JPG, PNG, and WebP. Free tool that processes images locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/rotate-image"
  },
  openGraph: {
    title: "Rotate Image Online - Rotate JPG, PNG & WebP | Filoza",
    description: "Rotate images 90°, 180°, or 270° online. Supports JPG, PNG, and WebP. Free tool that processes images locally in your browser.",
    url: "https://filoza.vercel.app/rotate-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate Image Online - Rotate JPG, PNG & WebP | Filoza",
    description: "Rotate images 90°, 180°, or 270° online. Supports JPG, PNG, and WebP. Free tool that processes images locally in your browser.",
  }
};

export default function Page() {
  return <RotateImageClient />;
}
