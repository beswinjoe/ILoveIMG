import { Metadata } from "next";
import PdfPageExtractClient from "./PdfPageExtractClient";

export const metadata: Metadata = {
  title: "Extract PDF Pages Online Free | Filoza",
  description: "Extract specific pages from your PDF into a new document easily and securely directly in your browser. No uploads required.",
};

export default function PdfPageExtractPage() {
  return <PdfPageExtractClient />;
}
