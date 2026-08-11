import { Metadata } from "next";
import ZipExtractorClient from "./ZipExtractorClient";

export const metadata: Metadata = {
  title: "ZIP Extractor Online – Extract ZIP Files Free | Filoza",
  description: "Extract and view contents of ZIP archives directly in your browser. 100% private, secure, and fast with no file uploads.",
  alternates: {
    canonical: "https://filoza.vercel.app/zip-extractor"
  },
  openGraph: {
    title: "ZIP Extractor Online – Extract ZIP Files Free | Filoza",
    description: "Extract and view contents of ZIP archives directly in your browser. 100% private, secure, and fast with no file uploads.",
    url: "https://filoza.vercel.app/zip-extractor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZIP Extractor Online – Extract ZIP Files Free | Filoza",
    description: "Extract and view contents of ZIP archives directly in your browser. 100% private, secure, and fast with no file uploads.",
  }
};

export default function ZipExtractorPage() {
  return <ZipExtractorClient />;
}
