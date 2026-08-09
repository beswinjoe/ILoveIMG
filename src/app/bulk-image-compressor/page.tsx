import { Metadata } from "next";
import BulkCompressorClient from "./BulkCompressorClient";

export const metadata: Metadata = {
  title: "Bulk Image Compressor Online – Free | Filoza",
  description: "Compress multiple images at once. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/bulk-image-compressor"
  },
  openGraph: {
    title: "Bulk Image Compressor Online – Free | Filoza",
    description: "Compress multiple images at once. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/bulk-image-compressor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Image Compressor Online – Free | Filoza",
    description: "Compress multiple images at once. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function BulkImageCompressorPage() {
  return <BulkCompressorClient />;
}
