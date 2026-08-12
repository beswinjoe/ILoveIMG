import { Metadata } from 'next';
import ExifRemoverClient from './ExifRemoverClient';

export const metadata: Metadata = {
  title: "EXIF Remover - Remove Metadata from Images Online | Filoza",
  description: "Remove hidden EXIF metadata from images online. Strip location data, camera info, and other metadata for privacy. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/exif-remover"
  },
  openGraph: {
    title: "EXIF Remover - Remove Metadata from Images Online | Filoza",
    description: "Remove hidden EXIF metadata from images online. Strip location data, camera info, and other metadata for privacy. Processed in your browser.",
    url: "https://filoza.vercel.app/exif-remover",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EXIF Remover - Remove Metadata from Images Online | Filoza",
    description: "Remove hidden EXIF metadata from images online. Strip location data, camera info, and other metadata for privacy. Processed in your browser.",
  }
};

export default function Page() {
  return <ExifRemoverClient />;
}
