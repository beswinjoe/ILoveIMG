import { Metadata } from "next";
import ConverterClient from "./ConverterClient";

export const metadata: Metadata = {
  title: "Image Converter Online – Free | Filoza",
  description: "Universal image format converter. Reduce file size and process directly in your browser with Filoza's free tools.",
  alternates: {
    canonical: "https://filoza.vercel.app/image-converter"
  },
  openGraph: {
    title: "Image Converter Online – Free | Filoza",
    description: "Universal image format converter. Reduce file size and process directly in your browser with Filoza's free tools.",
    url: "https://filoza.vercel.app/image-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Converter Online – Free | Filoza",
    description: "Universal image format converter. Reduce file size and process directly in your browser with Filoza's free tools.",
  }
};

export default function ImageConverterPage() {
  return <ConverterClient />;
}
