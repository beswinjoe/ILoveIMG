import { Metadata } from "next";
import CompressorClient from "./CompressorClient";

export const metadata: Metadata = {
  title: "Image Compressor Online – Free & Private | Filoza",
  description: "Compress JPG, PNG and WebP images. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-compressor"
  },
  openGraph: {
    title: "Image Compressor Online – Free & Private | Filoza",
    description: "Compress JPG, PNG and WebP images. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/image-compressor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Compressor Online – Free & Private | Filoza",
    description: "Compress JPG, PNG and WebP images. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function ImageCompressorPage() {
  return <CompressorClient />;
}
