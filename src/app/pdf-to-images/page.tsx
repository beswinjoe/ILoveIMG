import { Metadata } from "next";
import PdfToImagesClient from "./PdfToImagesClient";

export const metadata: Metadata = {
  title: "PDF to Images Online – Free | Filoza",
  description: "Extract PDF pages as images",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-to-images"
  },
  openGraph: {
    title: "PDF to Images Online – Free | Filoza",
    description: "Extract PDF pages as images",
    url: "https://filoza.vercel.app/pdf-to-images",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Images Online – Free | Filoza",
    description: "Extract PDF pages as images",
  }
};

export default function PdfToImagesPage() {
  return <PdfToImagesClient />;
}
