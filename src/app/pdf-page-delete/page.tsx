import { Metadata } from "next";
import PdfPageDeleteClient from "./PdfPageDeleteClient";

export const metadata: Metadata = {
  title: "Delete PDF Pages - Remove Pages from PDFs Online | Filoza",
  description: "Remove unwanted pages from PDF files online. Select pages to delete and download the updated PDF. Processed locally in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-page-delete"
  },
  openGraph: {
    title: "Delete PDF Pages - Remove Pages from PDFs Online | Filoza",
    description: "Remove unwanted pages from PDF files online. Select pages to delete and download the updated PDF. Processed locally in your browser.",
    url: "https://filoza.vercel.app/pdf-page-delete",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delete PDF Pages - Remove Pages from PDFs Online | Filoza",
    description: "Remove unwanted pages from PDF files online. Select pages to delete and download the updated PDF. Processed locally in your browser.",
  }
};

export default function PdfPageDeletePage() {
  return <PdfPageDeleteClient />;
}
