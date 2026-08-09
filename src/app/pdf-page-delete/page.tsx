import { Metadata } from "next";
import PdfPageDeleteClient from "./PdfPageDeleteClient";

export const metadata: Metadata = {
  title: "Delete PDF Pages Online – Free | Filoza",
  description: "Remove unwanted pages from a PDF",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-page-delete"
  },
  openGraph: {
    title: "Delete PDF Pages Online – Free | Filoza",
    description: "Remove unwanted pages from a PDF",
    url: "https://filoza.vercel.app/pdf-page-delete",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete PDF Pages Online – Free | Filoza",
    description: "Remove unwanted pages from a PDF",
  }
};

export default function PdfPageDeletePage() {
  return <PdfPageDeleteClient />;
}
