import { Metadata } from "next";
import RarExtractorClient from "./RarExtractorClient";

export const metadata: Metadata = {
  title: "RAR Extractor - Extract RAR Files Online | Filoza",
  description: "Extract files from RAR archives online. Browse and download contents without installing software. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/rar-extractor"
  },
  openGraph: {
    title: "RAR Extractor - Extract RAR Files Online | Filoza",
    description: "Extract files from RAR archives online. Browse and download contents without installing software. Processed locally in your browser.",
    url: "https://filoza.vercel.app/rar-extractor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RAR Extractor - Extract RAR Files Online | Filoza",
    description: "Extract files from RAR archives online. Browse and download contents without installing software. Processed locally in your browser.",
  }
};

export default function RarExtractorPage() {
  return <RarExtractorClient />;
}
