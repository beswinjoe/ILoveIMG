import { Metadata } from 'next';
import RotateImageClient from './RotateImageClient';

export const metadata: Metadata = {
  title: 'Rotate Image | Filoza',
  description: 'Rotate your images clockwise or counter-clockwise instantly in your browser.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/rotate-image'
  }
};

export default function Page() {
  return <RotateImageClient />;
}
