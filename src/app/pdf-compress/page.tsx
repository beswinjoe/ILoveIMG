import { Metadata } from "next";
import PdfCompressClient from "./PdfCompressClient";

export const metadata: Metadata = {
  title: "Compress PDF Online Free | Filoza",
  description: "Reduce file size while optimizing for maximal PDF quality. 100% free and secure PDF compression directly in your browser.",
};

export default function PdfCompressPage() {
  return <PdfCompressClient />;
}
