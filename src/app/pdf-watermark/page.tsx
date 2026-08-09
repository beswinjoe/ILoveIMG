import { Metadata } from "next";
import PdfWatermarkClient from "./PdfWatermarkClient";

export const metadata: Metadata = {
  title: "Watermark PDF Online – Free | Filoza",
  description: "Add a watermark to your PDF",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-watermark"
  },
  openGraph: {
    title: "Watermark PDF Online – Free | Filoza",
    description: "Add a watermark to your PDF",
    url: "https://filoza.vercel.app/pdf-watermark",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watermark PDF Online – Free | Filoza",
    description: "Add a watermark to your PDF",
  }
};

export default function PdfWatermarkPage() {
  return <PdfWatermarkClient />;
}
