import { Metadata } from 'next';
import ImageWatermarkClient from './ImageWatermarkClient';

export const metadata: Metadata = {
  title: "Image Watermark Online – Free | Filoza",
  description: "Add a text watermark to protect your copyright.. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-watermark"
  },
  openGraph: {
    title: "Image Watermark Online – Free | Filoza",
    description: "Add a text watermark to protect your copyright.. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/image-watermark",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Watermark Online – Free | Filoza",
    description: "Add a text watermark to protect your copyright.. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function Page() {
  return <ImageWatermarkClient />;
}
