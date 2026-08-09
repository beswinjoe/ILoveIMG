import { Metadata } from "next";
import PdfMergeClient from "./PdfMergeClient";

export const metadata: Metadata = {
  title: "Merge PDF Files Online Free | Filoza",
  description: "Combine multiple PDF files into one single document. Fast, secure, and easy PDF merging directly in your browser.",
};

export default function PdfMergePage() {
  return <PdfMergeClient />;
}
