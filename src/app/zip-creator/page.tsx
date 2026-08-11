import { Metadata } from "next";
import ZipCreatorClient from "./ZipCreatorClient";

export const metadata: Metadata = {
  title: "ZIP Creator Online – Create ZIP Files Free | Filoza",
  description: "Combine multiple files into a single ZIP archive instantly. Files are processed securely in your browser and never uploaded to our servers.",
  alternates: {
    canonical: "https://filoza.vercel.app/zip-creator"
  },
  openGraph: {
    title: "ZIP Creator Online – Create ZIP Files Free | Filoza",
    description: "Combine multiple files into a single ZIP archive instantly. Files are processed securely in your browser and never uploaded to our servers.",
    url: "https://filoza.vercel.app/zip-creator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZIP Creator Online – Create ZIP Files Free | Filoza",
    description: "Combine multiple files into a single ZIP archive instantly. Files are processed securely in your browser and never uploaded to our servers.",
  }
};

export default function ZipCreatorPage() {
  return <ZipCreatorClient />;
}
