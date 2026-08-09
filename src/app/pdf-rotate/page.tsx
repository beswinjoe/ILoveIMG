import { Metadata } from "next";
import PdfRotateClient from "./PdfRotateClient";

export const metadata: Metadata = {
  title: "Rotate PDF Online – Free | Filoza",
  description: "Rotate individual PDF pages",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-rotate"
  },
  openGraph: {
    title: "Rotate PDF Online – Free | Filoza",
    description: "Rotate individual PDF pages",
    url: "https://filoza.vercel.app/pdf-rotate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate PDF Online – Free | Filoza",
    description: "Rotate individual PDF pages",
  }
};

export default function PdfRotatePage() {
  return <PdfRotateClient />;
}
