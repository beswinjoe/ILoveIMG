import { Metadata } from "next";
import WebpClient from "./WebpClient";

export const metadata: Metadata = {
  title: "WebP Converter - Convert WebP to JPG, PNG & Back | Filoza",
  description: "Convert WebP images to JPG or PNG, or convert other image formats to WebP. Free online converter that works entirely in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/webp-converter"
  },
  openGraph: {
    title: "WebP Converter - Convert WebP to JPG, PNG & Back | Filoza",
    description: "Convert WebP images to JPG or PNG, or convert other image formats to WebP. Free online converter that works entirely in your browser.",
    url: "https://filoza.vercel.app/webp-converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebP Converter - Convert WebP to JPG, PNG & Back | Filoza",
    description: "Convert WebP images to JPG or PNG, or convert other image formats to WebP. Free online converter that works entirely in your browser.",
  }
};

export default function WebpConverterPage() {
  return <WebpClient />;
}
