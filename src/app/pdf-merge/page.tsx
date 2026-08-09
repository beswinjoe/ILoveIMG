import { Metadata } from "next";
import PdfMergeClient from "./PdfMergeClient";

export const metadata: Metadata = {
  title: "Merge PDF Online – Free | Filoza",
  description: "Combine multiple PDF files",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-merge"
  },
  openGraph: {
    title: "Merge PDF Online – Free | Filoza",
    description: "Combine multiple PDF files",
    url: "https://filoza.vercel.app/pdf-merge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Online – Free | Filoza",
    description: "Combine multiple PDF files",
  }
};

export default function PdfMergePage() {
  return <PdfMergeClient />;
}
