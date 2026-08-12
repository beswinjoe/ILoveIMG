import { Metadata } from "next";
import ConverterClient from "./ConverterClient";

export const metadata: Metadata = {
  title: "Image Converter - Convert Between JPG, PNG, WebP & More | Filoza",
  description: "Convert images between JPG, PNG, WebP, and other formats online. Universal image format converter that processes files locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-converter"
  },
  openGraph: {
    title: "Image Converter - Convert Between JPG, PNG, WebP & More | Filoza",
    description: "Convert images between JPG, PNG, WebP, and other formats online. Universal image format converter that processes files locally in your browser.",
    url: "https://filoza.vercel.app/image-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Converter - Convert Between JPG, PNG, WebP & More | Filoza",
    description: "Convert images between JPG, PNG, WebP, and other formats online. Universal image format converter that processes files locally in your browser.",
  }
};

export default function ImageConverterPage() {
  return <ConverterClient />;
}
