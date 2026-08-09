import { Metadata } from 'next';
import TxtToDocxClient from './TxtToDocxClient';

export const metadata: Metadata = {
  title: 'TXT to DOCX Converter - Free Online | Filoza',
  description: 'Convert plain text files into editable Word documents.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/txt-to-docx'
  }
};

export default function Page() {
  return <TxtToDocxClient />;
}
