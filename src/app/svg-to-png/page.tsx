import { Metadata } from 'next';
import SvgToPngClient from './SvgToPngClient';

export const metadata: Metadata = {
  title: 'SVG to PNG Tool - Free Online | Filoza',
  description: 'Convert scalable vector graphics (SVG) into standard PNG images.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/svg-to-png'
  }
};

export default function Page() {
  return <SvgToPngClient />;
}
