import { Metadata } from 'next';
import BlurImageClient from './BlurImageClient';

export const metadata: Metadata = {
  title: "Blur Image Online – Free | Filoza",
  description: "Apply a gaussian blur effect. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/blur-image"
  },
  openGraph: {
    title: "Blur Image Online – Free | Filoza",
    description: "Apply a gaussian blur effect. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/blur-image",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blur Image Online – Free | Filoza",
    description: "Apply a gaussian blur effect. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function Page() {
  return <BlurImageClient />;
}
