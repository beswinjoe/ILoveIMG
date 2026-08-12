import { Metadata } from 'next';
import ImageWatermarkClient from './ImageWatermarkClient';

export const metadata: Metadata = {
  title: "Image Watermark - Add Text Watermarks to Images Online | Filoza",
  description: "Add custom text watermarks to images online to protect your copyright. Adjust position, size, opacity, and color. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-watermark"
  },
  openGraph: {
    title: "Image Watermark - Add Text Watermarks to Images Online | Filoza",
    description: "Add custom text watermarks to images online to protect your copyright. Adjust position, size, opacity, and color. Processed in your browser.",
    url: "https://filoza.vercel.app/image-watermark",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Watermark - Add Text Watermarks to Images Online | Filoza",
    description: "Add custom text watermarks to images online to protect your copyright. Adjust position, size, opacity, and color. Processed in your browser.",
  }
};

export default function Page() {
  return <ImageWatermarkClient />;
}
