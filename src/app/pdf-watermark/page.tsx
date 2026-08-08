import { Metadata } from "next";
import PdfWatermarkClient from "./PdfWatermarkClient";

export const metadata: Metadata = {
  title: "Watermark PDF Online Free | FileFlow",
  description: "Stamp text over your PDF in seconds to protect your documents. 100% free and secure PDF watermarking directly in your browser.",
};

export default function PdfWatermarkPage() {
  return <PdfWatermarkClient />;
}
