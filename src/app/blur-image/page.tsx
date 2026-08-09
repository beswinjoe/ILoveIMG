import { Metadata } from 'next';
import BlurImageClient from './BlurImageClient';

export const metadata: Metadata = {
  title: 'Blur Image | Filoza',
  description: 'Apply a gaussian blur effect to your image.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/blur-image'
  }
};

export default function Page() {
  return <BlurImageClient />;
}
