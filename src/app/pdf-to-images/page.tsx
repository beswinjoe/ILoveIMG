import { Metadata } from "next";
import PdfToImagesClient from "./PdfToImagesClient";

export const metadata: Metadata = {
  title: "PDF to Images - Extract PDF pages as JPG/PNG | FileFlow",
  description: "Convert every page of a PDF document into high-quality JPG or PNG images instantly in your browser.",
};

export default function PdfToImagesPage() {
  return <PdfToImagesClient />;
}
