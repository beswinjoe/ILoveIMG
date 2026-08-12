import { Metadata } from "next";
import ZipExtractorClient from "./ZipExtractorClient";

export const metadata: Metadata = {
  title: "ZIP Extractor - Extract ZIP Files Online | Filoza",
  description: "Extract and browse the contents of ZIP archives online. View files and download individually or all at once. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/zip-extractor"
  },
  openGraph: {
    title: "ZIP Extractor - Extract ZIP Files Online | Filoza",
    description: "Extract and browse the contents of ZIP archives online. View files and download individually or all at once. Processed locally in your browser.",
    url: "https://filoza.vercel.app/zip-extractor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZIP Extractor - Extract ZIP Files Online | Filoza",
    description: "Extract and browse the contents of ZIP archives online. View files and download individually or all at once. Processed locally in your browser.",
  }
};

export default function ZipExtractorPage() {
  return <ZipExtractorClient />;
}
