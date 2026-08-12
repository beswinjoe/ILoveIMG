import { Metadata } from "next";
import PdfSplitClient from "./PdfSplitClient";

export const metadata: Metadata = {
  title: "Split PDF Online - Extract Pages from PDFs for Free | Filoza",
  description: "Split PDF files by selecting specific pages or page ranges. Extract individual pages into separate PDF documents. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-split"
  },
  openGraph: {
    title: "Split PDF Online - Extract Pages from PDFs for Free | Filoza",
    description: "Split PDF files by selecting specific pages or page ranges. Extract individual pages into separate PDF documents. Processed in your browser.",
    url: "https://filoza.vercel.app/pdf-split",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Online - Extract Pages from PDFs for Free | Filoza",
    description: "Split PDF files by selecting specific pages or page ranges. Extract individual pages into separate PDF documents. Processed in your browser.",
  }
};

export default function PdfSplitPage() {
  return <PdfSplitClient />;
}
