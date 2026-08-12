import { Metadata } from "next";
import PdfWatermarkClient from "./PdfWatermarkClient";

export const metadata: Metadata = {
  title: "Watermark PDF - Add Watermarks to PDF Pages Online | Filoza",
  description: "Add text watermarks to PDF pages online. Customize font, size, color, opacity, and position. Free and processed in your browser.",
  alternates: {
    canonical: "https://filoza.vercel.app/pdf-watermark"
  },
  openGraph: {
    title: "Watermark PDF - Add Watermarks to PDF Pages Online | Filoza",
    description: "Add text watermarks to PDF pages online. Customize font, size, color, opacity, and position. Free and processed in your browser.",
    url: "https://filoza.vercel.app/pdf-watermark",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watermark PDF - Add Watermarks to PDF Pages Online | Filoza",
    description: "Add text watermarks to PDF pages online. Customize font, size, color, opacity, and position. Free and processed in your browser.",
  }
};

export default function PdfWatermarkPage() {
  return <PdfWatermarkClient />;
}
