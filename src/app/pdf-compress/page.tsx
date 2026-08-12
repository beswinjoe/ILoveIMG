import { Metadata } from "next";
import PdfCompressClient from "./PdfCompressClient";

export const metadata: Metadata = {
  title: "Compress PDF - Reduce PDF File Size Online | Filoza",
  description: "Compress PDF files to reduce their size online. Optimizes embedded images while keeping text sharp. Free and processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-compress"
  },
  openGraph: {
    title: "Compress PDF - Reduce PDF File Size Online | Filoza",
    description: "Compress PDF files to reduce their size online. Optimizes embedded images while keeping text sharp. Free and processed in your browser.",
    url: "https://filoza.vercel.app/pdf-compress",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF - Reduce PDF File Size Online | Filoza",
    description: "Compress PDF files to reduce their size online. Optimizes embedded images while keeping text sharp. Free and processed in your browser.",
  }
};

export default function PdfCompressPage() {
  return <PdfCompressClient />;
}
