import { Metadata } from 'next';
import ImageWatermarkClient from './ImageWatermarkClient';

export const metadata: Metadata = {
  title: 'Image Watermark Tool - Free Online | Filoza',
  description: 'Add a text watermark to your images to protect your copyright.',
  alternates: {
    canonical: 'https://fileefloww.vercel.app/image-watermark'
  }
};

export default function Page() {
  return <ImageWatermarkClient />;
}
