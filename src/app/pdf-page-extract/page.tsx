import { Metadata } from "next";
import PdfPageExtractClient from "./PdfPageExtractClient";

export const metadata: Metadata = {
  title: "Extract PDF Pages Online – Free | Filoza",
  description: "Pull specific pages out of a PDF",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-page-extract"
  },
  openGraph: {
    title: "Extract PDF Pages Online – Free | Filoza",
    description: "Pull specific pages out of a PDF",
    url: "https://filoza.vercel.app/pdf-page-extract",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Extract PDF Pages Online – Free | Filoza",
    description: "Pull specific pages out of a PDF",
  }
};

export default function PdfPageExtractPage() {
  return <PdfPageExtractClient />;
}
