import { Metadata } from 'next';
import PdfPageNumbersClient from './PdfPageNumbersClient';

export const metadata: Metadata = {
  title: 'PDF Page Numbers | Filoza',
  description: 'Add page numbers to your PDF documents easily.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/pdf-page-numbers'
  }
};

export default function Page() {
  return <PdfPageNumbersClient />;
}
