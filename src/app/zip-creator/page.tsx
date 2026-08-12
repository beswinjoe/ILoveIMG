import { Metadata } from "next";
import ZipCreatorClient from "./ZipCreatorClient";

export const metadata: Metadata = {
  title: "ZIP Creator - Create ZIP Archives Online | Filoza",
  description: "Create ZIP archives from multiple files online. Combine files into a single .zip download. All processing happens locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/zip-creator"
  },
  openGraph: {
    title: "ZIP Creator - Create ZIP Archives Online | Filoza",
    description: "Create ZIP archives from multiple files online. Combine files into a single .zip download. All processing happens locally in your browser.",
    url: "https://filoza.vercel.app/zip-creator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZIP Creator - Create ZIP Archives Online | Filoza",
    description: "Create ZIP archives from multiple files online. Combine files into a single .zip download. All processing happens locally in your browser.",
  }
};

export default function ZipCreatorPage() {
  return <ZipCreatorClient />;
}
