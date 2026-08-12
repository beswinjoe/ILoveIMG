import { Metadata } from "next";
import ImageToPdfClient from "./ImageToPdfClient";

export const metadata: Metadata = {
  title: "Image to PDF Converter - Convert Images to PDF Online | Filoza",
  description: "Convert JPG, PNG, and WebP images into a PDF document online. Combine multiple images into a single PDF file. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-to-pdf"
  },
  openGraph: {
    title: "Image to PDF Converter - Convert Images to PDF Online | Filoza",
    description: "Convert JPG, PNG, and WebP images into a PDF document online. Combine multiple images into a single PDF file. Processed in your browser.",
    url: "https://filoza.vercel.app/image-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to PDF Converter - Convert Images to PDF Online | Filoza",
    description: "Convert JPG, PNG, and WebP images into a PDF document online. Combine multiple images into a single PDF file. Processed in your browser.",
  }
};

export default function ImageToPdfPage() {
  return <ImageToPdfClient />;
}
