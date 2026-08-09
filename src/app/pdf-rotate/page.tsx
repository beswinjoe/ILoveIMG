import { Metadata } from "next";
import PdfRotateClient from "./PdfRotateClient";

export const metadata: Metadata = {
  title: "Rotate PDF Online Free | Filoza",
  description: "Rotate your PDFs the way you need them. Apply rotation to all pages instantly and securely in your browser.",
};

export default function PdfRotatePage() {
  return <PdfRotateClient />;
}
