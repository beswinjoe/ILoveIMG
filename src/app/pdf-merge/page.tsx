import { Metadata } from "next";
import PdfMergeClient from "./PdfMergeClient";

export const metadata: Metadata = {
  title: "Merge PDF Files Online - Combine PDFs for Free | Filoza",
  description: "Merge multiple PDF files into one document online. Drag to reorder pages before combining. Free and processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-merge"
  },
  openGraph: {
    title: "Merge PDF Files Online - Combine PDFs for Free | Filoza",
    description: "Merge multiple PDF files into one document online. Drag to reorder pages before combining. Free and processed locally in your browser.",
    url: "https://filoza.vercel.app/pdf-merge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merge PDF Files Online - Combine PDFs for Free | Filoza",
    description: "Merge multiple PDF files into one document online. Drag to reorder pages before combining. Free and processed locally in your browser.",
  }
};

export default function PdfMergePage() {
  return <PdfMergeClient />;
}
