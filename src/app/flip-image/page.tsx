import { Metadata } from 'next';
import FlipImageClient from './FlipImageClient';

export const metadata: Metadata = {
  title: "Flip Image Online – Free | Filoza",
  description: "Flip images horizontally or vertically. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/flip-image"
  },
  openGraph: {
    title: "Flip Image Online – Free | Filoza",
    description: "Flip images horizontally or vertically. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/flip-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flip Image Online – Free | Filoza",
    description: "Flip images horizontally or vertically. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function Page() {
  return <FlipImageClient />;
}
