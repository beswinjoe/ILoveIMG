import { Metadata } from "next";
import ImageToPdfClient from "./ImageToPdfClient";

export const metadata: Metadata = {
  title: "Image to PDF Converter - Convert JPG, PNG to PDF | Filoza",
  description: "Convert images to a PDF document online for free. Support for JPG, PNG, WebP to PDF conversion directly in your browser.",
};

export default function ImageToPdfPage() {
  return <ImageToPdfClient />;
}
