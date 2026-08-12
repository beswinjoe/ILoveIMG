import { Metadata } from "next";
import PdfPageExtractClient from "./PdfPageExtractClient";

export const metadata: Metadata = {
  title: "Extract PDF Pages - Pull Specific Pages from PDFs | Filoza",
  description: "Extract specific pages from a PDF document online. Select the pages you need and download them as a new PDF file. Free and browser-based.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-page-extract"
  },
  openGraph: {
    title: "Extract PDF Pages - Pull Specific Pages from PDFs | Filoza",
    description: "Extract specific pages from a PDF document online. Select the pages you need and download them as a new PDF file. Free and browser-based.",
    url: "https://filoza.vercel.app/pdf-page-extract",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract PDF Pages - Pull Specific Pages from PDFs | Filoza",
    description: "Extract specific pages from a PDF document online. Select the pages you need and download them as a new PDF file. Free and browser-based.",
  }
};

export default function PdfPageExtractPage() {
  return <PdfPageExtractClient />;
}
