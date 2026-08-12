import { Metadata } from "next";
import PdfToImagesClient from "./PdfToImagesClient";

export const metadata: Metadata = {
  title: "PDF to Images - Convert PDF Pages to JPG or PNG | Filoza",
  description: "Convert PDF pages to JPG or PNG images online. Extract each page as a separate image file. Free and processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-to-images"
  },
  openGraph: {
    title: "PDF to Images - Convert PDF Pages to JPG or PNG | Filoza",
    description: "Convert PDF pages to JPG or PNG images online. Extract each page as a separate image file. Free and processed in your browser.",
    url: "https://filoza.vercel.app/pdf-to-images",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Images - Convert PDF Pages to JPG or PNG | Filoza",
    description: "Convert PDF pages to JPG or PNG images online. Extract each page as a separate image file. Free and processed in your browser.",
  }
};

export default function PdfToImagesPage() {
  return <PdfToImagesClient />;
}
