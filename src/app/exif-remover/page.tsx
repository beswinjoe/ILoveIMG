import { Metadata } from 'next';
import ExifRemoverClient from './ExifRemoverClient';

export const metadata: Metadata = {
  title: "EXIF Remover Online – Free | Filoza",
  description: "Remove hidden metadata from images",
  alternates: {
    canonical: "https://filoza.vercel.app/exif-remover"
  },
  openGraph: {
    title: "EXIF Remover Online – Free | Filoza",
    description: "Remove hidden metadata from images",
    url: "https://filoza.vercel.app/exif-remover",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EXIF Remover Online – Free | Filoza",
    description: "Remove hidden metadata from images",
  }
};

export default function Page() {
  return <ExifRemoverClient />;
}
