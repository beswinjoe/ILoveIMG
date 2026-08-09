import { Metadata } from 'next';
import ExifRemoverClient from './ExifRemoverClient';

export const metadata: Metadata = {
  title: 'EXIF Metadata Remover | Filoza',
  description: 'Remove GPS location, camera details, and all hidden EXIF metadata from your images for privacy.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/exif-remover'
  }
};

export default function Page() {
  return <ExifRemoverClient />;
}
