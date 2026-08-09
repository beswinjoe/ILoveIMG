import { Metadata } from 'next';
import FaviconGeneratorClient from './FaviconGeneratorClient';

export const metadata: Metadata = {
  title: 'Favicon Generator | Filoza',
  description: 'Generate 32x32 favicons from your images instantly.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/favicon-generator'
  }
};

export default function Page() {
  return <FaviconGeneratorClient />;
}
