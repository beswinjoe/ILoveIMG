import { Metadata } from "next";
import PdfCompressClient from "./PdfCompressClient";

export const metadata: Metadata = {
  title: "Compress PDF Online – Free | Filoza",
  description: "Reduce file size of your PDFs",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-compress"
  },
  openGraph: {
    title: "Compress PDF Online – Free | Filoza",
    description: "Reduce file size of your PDFs",
    url: "https://filoza.vercel.app/pdf-compress",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Online – Free | Filoza",
    description: "Reduce file size of your PDFs",
  }
};

export default function PdfCompressPage() {
  return <PdfCompressClient />;
}
