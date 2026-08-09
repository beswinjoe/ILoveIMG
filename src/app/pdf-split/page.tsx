import { Metadata } from "next";
import PdfSplitClient from "./PdfSplitClient";

export const metadata: Metadata = {
  title: "Split PDF Files Online Free | Filoza",
  description: "Separate one page or a whole set for easy conversion into independent PDF files. 100% free and secure.",
};

export default function PdfSplitPage() {
  return <PdfSplitClient />;
}
