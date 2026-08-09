import { Metadata } from 'next';
import FlipImageClient from './FlipImageClient';

export const metadata: Metadata = {
  title: 'Flip Image | Filoza',
  description: 'Flip your images horizontally or vertically.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/flip-image'
  }
};

export default function Page() {
  return <FlipImageClient />;
}
