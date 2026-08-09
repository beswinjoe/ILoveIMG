import { Metadata } from 'next';
import TextToPdfClient from './TextToPdfClient';

export const metadata: Metadata = {
  title: 'Text to PDF | Filoza',
  description: 'Instantly convert your raw text into a neat PDF document.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/text-to-pdf'
  }
};

export default function Page() {
  return <TextToPdfClient />;
}
