import { Metadata } from "next";
import ImageToPdfClient from "./ImageToPdfClient";

export const metadata: Metadata = {
  title: "Image to PDF Online – Free | Filoza",
  description: "Convert images to PDF format",
  alternates: {
    canonical: "https://filoza.vercel.app/image-to-pdf"
  },
  openGraph: {
    title: "Image to PDF Online – Free | Filoza",
    description: "Convert images to PDF format",
    url: "https://filoza.vercel.app/image-to-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to PDF Online – Free | Filoza",
    description: "Convert images to PDF format",
  }
};

export default function ImageToPdfPage() {
  return <ImageToPdfClient />;
}
