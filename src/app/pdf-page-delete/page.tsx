import { Metadata } from "next";
import PdfPageDeleteClient from "./PdfPageDeleteClient";

export const metadata: Metadata = {
  title: "Delete PDF Pages Online Free | FileFlow",
  description: "Remove unwanted pages from your PDF document easily and securely directly in your browser. No uploads required.",
};

export default function PdfPageDeletePage() {
  return <PdfPageDeleteClient />;
}
