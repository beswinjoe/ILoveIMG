import { Metadata } from "next";
import RarExtractorClient from "./RarExtractorClient";

export const metadata: Metadata = {
  title: "RAR Extractor Online – Extract RAR Files Free | Filoza",
  description: "Extract and view contents of RAR archives directly in your browser. 100% private, secure, and fast with no file uploads.",
  alternates: {
    canonical: "https://filoza.vercel.app/rar-extractor"
  },
  openGraph: {
    title: "RAR Extractor Online – Extract RAR Files Free | Filoza",
    description: "Extract and view contents of RAR archives directly in your browser. 100% private, secure, and fast with no file uploads.",
    url: "https://filoza.vercel.app/rar-extractor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RAR Extractor Online – Extract RAR Files Free | Filoza",
    description: "Extract and view contents of RAR archives directly in your browser. 100% private, secure, and fast with no file uploads.",
  }
};

export default function RarExtractorPage() {
  return <RarExtractorClient />;
}
