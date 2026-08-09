import { Metadata } from 'next';
import WordToTextClient from './WordToTextClient';

export const metadata: Metadata = {
  title: 'Word to Text Converter - Free Online | Filoza',
  description: 'Extract raw text from Word documents easily.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/word-to-text'
  }
};

export default function Page() {
  return <WordToTextClient />;
}
