import { Metadata } from "next";
import PdfSplitClient from "./PdfSplitClient";

export const metadata: Metadata = {
  title: "Split PDF Online – Free | Filoza",
  description: "Split PDF pages into separate files",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-split"
  },
  openGraph: {
    title: "Split PDF Online – Free | Filoza",
    description: "Split PDF pages into separate files",
    url: "https://filoza.vercel.app/pdf-split",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Online – Free | Filoza",
    description: "Split PDF pages into separate files",
  }
};

export default function PdfSplitPage() {
  return <PdfSplitClient />;
}
