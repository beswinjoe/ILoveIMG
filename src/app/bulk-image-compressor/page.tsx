import { Metadata } from "next";
import BulkCompressorClient from "./BulkCompressorClient";

export const metadata: Metadata = {
  title: "Bulk Image Compressor - Compress Multiple Images at Once | Filoza",
  description: "Compress multiple JPG, PNG, and WebP images in one batch. Reduce file sizes without uploading — all processing happens in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/bulk-image-compressor"
  },
  openGraph: {
    title: "Bulk Image Compressor - Compress Multiple Images at Once | Filoza",
    description: "Compress multiple JPG, PNG, and WebP images in one batch. Reduce file sizes without uploading — all processing happens in your browser.",
    url: "https://filoza.vercel.app/bulk-image-compressor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Image Compressor - Compress Multiple Images at Once | Filoza",
    description: "Compress multiple JPG, PNG, and WebP images in one batch. Reduce file sizes without uploading — all processing happens in your browser.",
  }
};

export default function BulkImageCompressorPage() {
  return <BulkCompressorClient />;
}
