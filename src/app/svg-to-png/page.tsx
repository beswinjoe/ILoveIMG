import { Metadata } from 'next';
import SvgToPngClient from './SvgToPngClient';

export const metadata: Metadata = {
  title: "SVG to PNG Online – Free | Filoza",
  description: "Convert scalable vector graphics (SVG) into PNG.. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/svg-to-png"
  },
  openGraph: {
    title: "SVG to PNG Online – Free | Filoza",
    description: "Convert scalable vector graphics (SVG) into PNG.. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/svg-to-png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG to PNG Online – Free | Filoza",
    description: "Convert scalable vector graphics (SVG) into PNG.. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function Page() {
  return <SvgToPngClient />;
}
