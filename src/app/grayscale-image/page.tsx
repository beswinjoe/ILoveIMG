import { Metadata } from 'next';
import GrayscaleImageClient from './GrayscaleImageClient';

export const metadata: Metadata = {
  title: 'Grayscale Image | Filoza',
  description: 'Convert your images to black and white instantly.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/grayscale-image'
  }
};

export default function Page() {
  return <GrayscaleImageClient />;
}
