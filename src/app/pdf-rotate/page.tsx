import { Metadata } from "next";
import PdfRotateClient from "./PdfRotateClient";

export const metadata: Metadata = {
  title: "Rotate PDF Pages Online - Free PDF Page Rotation | Filoza",
  description: "Rotate individual PDF pages 90°, 180°, or 270° online. Fix page orientation issues in your PDF documents. Processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-rotate"
  },
  openGraph: {
    title: "Rotate PDF Pages Online - Free PDF Page Rotation | Filoza",
    description: "Rotate individual PDF pages 90°, 180°, or 270° online. Fix page orientation issues in your PDF documents. Processed in your browser.",
    url: "https://filoza.vercel.app/pdf-rotate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate PDF Pages Online - Free PDF Page Rotation | Filoza",
    description: "Rotate individual PDF pages 90°, 180°, or 270° online. Fix page orientation issues in your PDF documents. Processed in your browser.",
  }
};

export default function PdfRotatePage() {
  return <PdfRotateClient />;
}
