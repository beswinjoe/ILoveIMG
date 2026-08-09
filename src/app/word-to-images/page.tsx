import { Metadata } from 'next';
import WordToImagesClient from './WordToImagesClient';

export const metadata: Metadata = {
  title: 'Word to Images Converter - Free Online | Filoza',
  description: 'Convert a Word document into high-quality images (PNG).',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/word-to-images'
  }
};

export default function Page() {
  return <WordToImagesClient />;
}
